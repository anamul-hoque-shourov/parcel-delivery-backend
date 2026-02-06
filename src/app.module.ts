import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getDatabaseConfig } from '@/config/database.config';
import { UserModule } from '@/modules/user/user.module';
import { ParcelModule } from '@/modules/parcel/parcel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    UserModule,
    ParcelModule,
  ],
})
export class AppModule {}
