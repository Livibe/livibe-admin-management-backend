"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const deals_module_1 = require("./deals/deals.module");
const deal_entity_1 = require("./deals/deal.entity");
const clients_module_1 = require("./clients/clients.module");
const client_entity_1 = require("./clients/client.entity");
const tasks_module_1 = require("./tasks/tasks.module");
const task_entity_1 = require("./tasks/task.entity");
const auth_module_1 = require("./auth/auth.module");
const user_entity_1 = require("./auth/user.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => {
                    const url = config.get('DATABASE_URL');
                    if (url) {
                        return {
                            type: 'postgres',
                            url,
                            ssl: { rejectUnauthorized: false },
                            entities: [deal_entity_1.Deal, client_entity_1.Client, task_entity_1.Task, user_entity_1.User],
                            synchronize: process.env.NODE_ENV !== 'production',
                        };
                    }
                    return {
                        type: 'postgres',
                        host: config.get('DATABASE_HOST', 'localhost'),
                        port: config.get('DATABASE_PORT', 5432),
                        username: config.get('DATABASE_USER', 'livibe'),
                        password: config.get('DATABASE_PASSWORD', 'livibe123'),
                        database: config.get('DATABASE_NAME', 'livibe'),
                        entities: [deal_entity_1.Deal, client_entity_1.Client, task_entity_1.Task, user_entity_1.User],
                        synchronize: true,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            deals_module_1.DealsModule,
            clients_module_1.ClientsModule,
            tasks_module_1.TasksModule,
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map