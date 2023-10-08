import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import * as path from 'path';
import { ConfigService } from '@lib/config/config.service';
import { AppConfig } from '@lib/config/app.config';
import { TypeormConfig } from '@lib/config/typeorm.config';
import { PrometheusConfig, SentryConfig, ServiceClientRmqConfig, ServiceTcpConfigProvider } from '@lib/config';
import WinstonConfig from '@lib/config/winston.config';
import { HealthConfig } from '@app/service/src/health.config';
import { makeGaugeProvider } from '@willsoto/nestjs-prometheus';

const providers = [
  ConfigService,
  AppConfig,
  WinstonConfig,
  SentryConfig,
  TypeormConfig,
  HealthConfig,
  PrometheusConfig,
  ServiceClientRmqConfig,
  ServiceTcpConfigProvider(0),
  makeGaugeProvider({ name: 'test', help: 'Http' }),
];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/service/.env.local'), path.resolve('./apps/service/.env')],
    }),
  ],
  providers: [NestConfig.ConfigService, ...providers],
  exports: [...providers],
})
export class ConfigModule {}
