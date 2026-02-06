import { IsString, IsEnum, IsOptional, MinLength, IsNotEmpty } from 'class-validator';
import { ParcelStatus } from '@/modules/parcel/domain/parcel.entity';

export class CreateParcelDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  sender!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  receiver!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  deliveryAddress!: string;
}

export class UpdateParcelDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  sender?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  receiver?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  deliveryAddress?: string;

  @IsOptional()
  @IsEnum(['pending', 'in_transit', 'delivered', 'cancelled'])
  status?: ParcelStatus;

  @IsOptional()
  @IsString()
  riderId?: string;
}
