import { ParcelEntity, ParcelStatus } from './parcel.entity';

export interface IParcelRepository {
  create(parcel: ParcelEntity): Promise<ParcelEntity>;
  findById(id: string): Promise<ParcelEntity | null>;
  findAll(): Promise<ParcelEntity[]>;
  findAllByCreatorId(creatorId: string): Promise<ParcelEntity[]>;
  findByIdAndCreatorId(id: string, creatorId: string): Promise<ParcelEntity | null>;
  findAllByRiderId(riderId: string): Promise<ParcelEntity[]>;
  findByIdAndRiderId(id: string, riderId: string): Promise<ParcelEntity | null>;
  update(id: string, updates: Partial<ParcelEntity>): Promise<ParcelEntity | null>;
  delete(id: string): Promise<boolean>;
}

export const IParcelRepository = Symbol('IParcelRepository');
