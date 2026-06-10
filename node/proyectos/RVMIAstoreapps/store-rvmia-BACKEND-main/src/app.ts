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

import paymentRoutes from "./modules/payments/payment.routes";
import { errorMiddleware } from './middlewares/error.middleware';

const allowedOrigins = [
  "https://bigstore.rvmia.com",
  "https://rvmia.com",
  "https://providers.rvmia.com",
];

const app = express();

app.use(helmet());

app.use(cors({
  origin(origin, callback) {

    // Postman, curl, apps móviles...
    if (!origin) {
      return callback(null, true);
    }

    const allowed =
      origin === "https://rvmia.com" ||
      origin.endsWith(".rvmia.com")

    if (allowed) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },

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