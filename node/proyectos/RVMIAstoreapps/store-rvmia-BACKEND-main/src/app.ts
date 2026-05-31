import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xssClean from 'xss-clean';
import morgan from 'morgan';

import {routes} from './routes';

import {paymentRoutes} from "./modules/payments/payment.routes";
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use("/api/payments", paymentRoutes);

app.use(compression());
app.use(cookieParser());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(xssClean());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests',
});

app.use('/api', limiter);

app.use('/api', routes);

app.use(errorMiddleware);

export default app;