import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import { IncomingMessage, ServerResponse } from 'http';

const expressApp = express();

async function createApp() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), { logger: ['error', 'warn'] });

  const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map(o => o.trim());

  app.enableCors({
    // origin: allowedOrigins,
    origin: "*",
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
  return expressApp;
}

const appPromise = createApp();

// ── Local development ─────────────────────────────────────────────────────────
if (process.env.VERCEL !== '1') {
  appPromise.then(server => {
    const port = process.env.PORT || 3001;
    server.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  });
}

// ── Vercel serverless handler ─────────────────────────────────────────────────
module.exports = async (req: IncomingMessage, res: ServerResponse) => {
  await appPromise;
  expressApp(req, res);
};
