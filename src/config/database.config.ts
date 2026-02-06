import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): MongooseModuleOptions => ({
  uri: configService.get<string>('MONGO_URI'),
  dbName: configService.get<string>('DB_NAME', 'parcel-delivery-management-system'),
});
