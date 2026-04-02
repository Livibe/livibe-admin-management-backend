"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const express = require("express");
const expressApp = express();
async function createApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp), { logger: ['error', 'warn'] });
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
        .split(',')
        .map(o => o.trim());
    app.enableCors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    return expressApp;
}
const appPromise = createApp();
if (process.env.VERCEL !== '1') {
    appPromise.then(server => {
        const port = process.env.PORT || 3001;
        server.listen(port, () => {
            console.log(`Backend running on http://localhost:${port}`);
        });
    });
}
module.exports = async (req, res) => {
    await appPromise;
    expressApp(req, res);
};
//# sourceMappingURL=main.js.map