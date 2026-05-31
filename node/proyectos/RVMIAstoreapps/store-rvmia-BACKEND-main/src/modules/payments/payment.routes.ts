import { Router } from "express";
import {
  createWompiPayment,
  confirmWompiPayment,
  wompiWebhook,
} from "./payment.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/wompi", authMiddleware, createWompiPayment);

router.post(
  "/wompi/confirm",
  authMiddleware,
  confirmWompiPayment
);

router.post(
  "/wompi/webhook",
  wompiWebhook
);

export default router;