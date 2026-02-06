import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParcelService } from './application/parcel.service';
import { ParcelController } from './api/parcel.controller';
import { ParcelRepository } from './infrastructure/parcel.repository';
import { ParcelSchema } from './infrastructure/models/parcel.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Parcel', schema: ParcelSchema }])],
  controllers: [ParcelController],
  providers: [
    ParcelService,
    {
      provide: 'IParcelRepository',
      useClass: ParcelRepository,
    },
  ],
  exports: [ParcelService],
})
export class ParcelModule {}
