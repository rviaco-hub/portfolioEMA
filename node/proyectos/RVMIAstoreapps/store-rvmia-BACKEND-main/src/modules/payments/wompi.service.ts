import axios from "axios";
import crypto from "crypto";
import { env } from "../../config/env";

const WOMPI_URL = "https://sandbox.wompi.co/v1";

export const generateIntegritySignature = (
  reference: string,
  amountInCents: number,
  currency: string
) => {
  return crypto
    .createHash("sha256")
    .update(
      `${reference}${amountInCents}${currency}${process.env.WOMPI_INTEGRITY_KEY}`
    )
    .digest("hex");
};

export const createCheckoutLink = async (
  orderId: string,
  amountInCents: number
) => {
  const reference = `RVMIA-${orderId}`;

  const signature = generateIntegritySignature(
    reference,
    amountInCents,
    "COP"
  );

  return {
    url: "https://checkout.wompi.co/p/",
    publicKey: process.env.WOMPI_PUBLIC_KEY,
    reference,
    signature,
    amountInCents,
    currency: "COP",
    redirectUrl: `${process.env.FRONTEND_URL}/checkout/success`
  };
};

export const getTransaction = async (id: string) => {
  const { data } = await axios.get(
    `${WOMPI_URL}/transactions/${id}`
  );

  return data.data;
};