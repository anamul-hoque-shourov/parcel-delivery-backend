import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { IParcelRepository } from '@/modules/parcel/domain/parcel.repository.interface';
import { ParcelEntity } from '@/modules/parcel/domain/parcel.entity';
import { ParcelValidator } from '@/modules/parcel/domain/parcel.validator';
import { CreateParcelDto, UpdateParcelDto } from './dtos/parcel.dto';

@Injectable()
export class ParcelService {
  private validator = new ParcelValidator();

  constructor(
    @Inject('IParcelRepository')
    private readonly parcelRepository: IParcelRepository,
  ) {}

  async createParcel(
    createParcelDto: CreateParcelDto,
    creatorId: string,
    creatorRole: 'merchant' | 'user',
  ): Promise<ParcelEntity> {
    const parcelData = { ...createParcelDto, creatorId, creatorRole };
    this.validator.validateCreation(parcelData);

    const newParcel: ParcelEntity = {
      ...parcelData,
      status: 'pending',
    };

    return this.parcelRepository.create(newParcel);
  }

  async getParcelById(id: string): Promise<ParcelEntity> {
    const parcel = await this.parcelRepository.findById(id);
    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    return parcel;
  }

  async getAllParcels(): Promise<ParcelEntity[]> {
    return this.parcelRepository.findAll();
  }

  async getParcelsByCreatorId(creatorId: string): Promise<ParcelEntity[]> {
    return this.parcelRepository.findAllByCreatorId(creatorId);
  }

  async getParcelsByRiderId(riderId: string): Promise<ParcelEntity[]> {
    return this.parcelRepository.findAllByRiderId(riderId);
  }

  async updateParcel(
    id: string,
    updateParcelDto: UpdateParcelDto,
    creatorId: string,
  ): Promise<ParcelEntity> {
    const existingParcel = await this.parcelRepository.findByIdAndCreatorId(id, creatorId);
    if (!existingParcel) {
      throw new NotFoundException('Parcel not found or unauthorized');
    }

    if (updateParcelDto.status && updateParcelDto.status !== existingParcel.status) {
      this.validator.validateStatusTransition(existingParcel.status, updateParcelDto.status);
    }

    this.validator.validateImmutableFieldsUpdate(existingParcel.status, updateParcelDto);

    const updated = await this.parcelRepository.update(id, updateParcelDto);
    if (!updated) {
      throw new NotFoundException('Failed to update parcel');
    }

    return updated;
  }

  async deleteParcel(id: string): Promise<boolean> {
    const existingParcel = await this.parcelRepository.findById(id);
    if (!existingParcel) {
      throw new NotFoundException('Parcel not found');
    }

    if (existingParcel.status !== 'pending') {
      throw new BadRequestException(`Cannot delete a parcel with status: ${existingParcel.status}`);
    }

    return this.parcelRepository.delete(id);
  }
}
