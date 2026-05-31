import { Request, Response } from "express";
import axios from "axios";
import { Order } from "../orders/order.model";
import Payment from "./payment.model";

const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY || "";
const WOMPI_PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY || "";
const WOMPI_INTEGRITY_SECRET = process.env.WOMPI_INTEGRITY_SECRET || "";
const FRONT_URL = process.env.FRONT_URL || "http://localhost:5173";

export const createWompiPayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: "Orden no encontrada"
      });
    }

    const reference = `RVMIA-${order._id}-${Date.now()}`;

    const payment = await Payment.create({
      order: order._id,
      provider: "wompi",
      status: "pending",
      reference
    });

    return res.json({
      ok: true,
      data: {
        publicKey: WOMPI_PUBLIC_KEY,
        integritySecret: WOMPI_INTEGRITY_SECRET,
        reference,
        amountInCents: Math.round(Number(order.total) * 100),
        currency: "COP",
        redirectUrl: `${FRONT_URL}/orders`,
        paymentId: payment._id
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

export const confirmWompiPayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { transactionId, reference } = req.body;

    const { data } = await axios.get(
      `https://production.wompi.co/v1/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${WOMPI_PRIVATE_KEY}`
        }
      }
    );

    const transaction = data.data;

    if (
      transaction.status === "APPROVED" &&
      transaction.reference === reference
    ) {
      const payment = await Payment.findOne({ reference });

      if (!payment) {
        return res.status(404).json({
          ok: false,
          message: "Pago no encontrado"
        });
      }

      payment.status = "approved";
      await payment.save();

      await Order.findByIdAndUpdate(payment.order, {
        status: "paid",
        paymentId: transaction.id
      });

      return res.json({
        ok: true
      });
    }

    return res.status(400).json({
      ok: false,
      message: "Pago no aprobado"
    });
  } catch (error: any) {
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

export const wompiWebhook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const event = req.body;

    const transaction =
      event?.data?.transaction;

    if (!transaction) {
      return res.status(400).json({
        ok: false,
        message: "Invalid payload",
      });
    }

    const payment =
      await Payment.findOne({
        reference: transaction.reference,
      });

    if (!payment) {
      return res.status(404).json({
        ok: false,
        message: "Payment not found",
      });
    }

    if (
      payment.status === "approved" &&
      payment.transactionId ===
        transaction.id
    ) {
      return res.status(200).json({
        ok: true,
      });
    }

    payment.transactionId =
      transaction.id;

    payment.raw = event;

    payment.webhookValidated = true;

    if (
      transaction.status ===
      "APPROVED"
    ) {
      payment.status =
        "approved";

      payment.processedAt =
        new Date();

      await payment.save();

      await Order.findByIdAndUpdate(
        payment.order,
        {
          status: "paid",
          paymentId:
            transaction.id,
        }
      );

      return res.status(200).json({
        ok: true,
      });
    }

    if (
      transaction.status ===
      "DECLINED"
    ) {
      payment.status =
        "declined";

      payment.processedAt =
        new Date();

      await payment.save();

      return res.status(200).json({
        ok: true,
      });
    }

    payment.status = "error";

    payment.processedAt =
      new Date();

    await payment.save();

    return res.status(200).json({
      ok: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};