import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { Env, validate } from '@/config/env';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => ({
        uri: configService.get('MONGO_URL'),
      }),
    }),
    AuthModule,
    UserModule,
    ItemModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
