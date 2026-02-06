import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IParcelRepository } from '@/modules/parcel/domain/parcel.repository.interface';
import { ParcelEntity } from '@/modules/parcel/domain/parcel.entity';
import { IParcelModel } from './models/parcel.model';

@Injectable()
export class ParcelRepository implements IParcelRepository {
  constructor(
    @InjectModel('Parcel')
    private parcelModel: Model<IParcelModel>,
  ) {}

  private toDomain(doc: any): ParcelEntity | null {
    if (!doc) return null;
    const obj = doc.toObject ? doc.toObject() : doc;
    const {
      _id,
      sender,
      receiver,
      deliveryAddress,
      status,
      creatorId,
      creatorRole,
      riderId,
      createdAt,
      updatedAt,
    } = obj;
    return {
      id: _id ? _id.toString() : undefined,
      sender,
      receiver,
      deliveryAddress,
      status,
      creatorId,
      creatorRole,
      riderId,
      createdAt,
      updatedAt,
    };
  }

  async create(parcel: ParcelEntity): Promise<ParcelEntity> {
    const createdDoc = await this.parcelModel.create(parcel);
    return this.toDomain(createdDoc as IParcelModel) as ParcelEntity;
  }

  async findById(id: string): Promise<ParcelEntity | null> {
    const doc = await this.parcelModel.findById(id).lean();
    return this.toDomain(doc);
  }

  async findAll(): Promise<ParcelEntity[]> {
    const docs = await this.parcelModel.find().lean();
    return (docs as any[]).map((doc) => this.toDomain(doc)) as ParcelEntity[];
  }

  async findAllByCreatorId(creatorId: string): Promise<ParcelEntity[]> {
    const docs = await this.parcelModel.find({ creatorId }).lean();
    return docs.map((doc) => this.toDomain(doc)) as ParcelEntity[];
  }

  async findByIdAndCreatorId(id: string, creatorId: string): Promise<ParcelEntity | null> {
    const doc = await this.parcelModel.findOne({ _id: id, creatorId }).lean();
    return this.toDomain(doc);
  }

  async findAllByRiderId(riderId: string): Promise<ParcelEntity[]> {
    const docs = await this.parcelModel.find({ riderId }).lean();
    return docs.map((doc) => this.toDomain(doc)) as ParcelEntity[];
  }

  async findByIdAndRiderId(id: string, riderId: string): Promise<ParcelEntity | null> {
    const doc = await this.parcelModel.findOne({ _id: id, riderId }).lean();
    return this.toDomain(doc);
  }

  async update(id: string, updates: Partial<ParcelEntity>): Promise<ParcelEntity | null> {
    const updatedDoc = await this.parcelModel.findByIdAndUpdate(id, updates, { new: true }).lean();
    return this.toDomain(updatedDoc);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.parcelModel.findByIdAndDelete(id);
    return !!result;
  }
}
