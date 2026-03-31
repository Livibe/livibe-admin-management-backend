import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealsModule } from './deals/deals.module';
import { Deal } from './deals/deal.entity';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/client.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL')
        if (url) {
          return {
            type: 'postgres',
            url,
            ssl: { rejectUnauthorized: false },
            entities: [Deal, Client, Task, User],
            synchronize: process.env.NODE_ENV !== 'production',
          }
        }
        return {
          type: 'postgres',
          host: config.get('DATABASE_HOST', 'localhost'),
          port: config.get<number>('DATABASE_PORT', 5432),
          username: config.get('DATABASE_USER', 'livibe'),
          password: config.get('DATABASE_PASSWORD', 'livibe123'),
          database: config.get('DATABASE_NAME', 'livibe'),
          entities: [Deal, Client, Task, User],
          synchronize: true,
        }
      },
      inject: [ConfigService],
    }),
    DealsModule,
    ClientsModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
