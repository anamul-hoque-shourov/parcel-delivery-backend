import { IParcelRepository } from "@/domain/repositories/i_parcel_repository";
import { Parcel } from "@/domain/entities/parcel_entity";
import {
  ParcelModel,
  IParcelModel,
} from "@/infrastructure/models/parcel_model";

export class ParcelRepository implements IParcelRepository {
  private toDomain(doc: IParcelModel | null | any): Parcel | null {
    if (!doc) return null;
    const { _id, sender, receiver, deliveryAddress, status } = doc.toObject
      ? doc.toObject()
      : doc;
    return {
      id: _id.toString(),
      sender,
      receiver,
      deliveryAddress,
      status,
    };
  }

  async findById(id: string): Promise<Parcel | null> {
    const parcelDoc = await ParcelModel.findById(id).lean();
    return this.toDomain(parcelDoc);
  }

  async findAll(): Promise<Parcel[]> {
    const parcelDocs = await ParcelModel.find().lean();
    return parcelDocs.map((doc: any) =>
      this.toDomain(doc as IParcelModel)
    ) as Parcel[];
  }

  async create(parcel: Parcel): Promise<Parcel> {
    const createdDoc = await ParcelModel.create(parcel);
    return this.toDomain(createdDoc) as Parcel;
  }

  async update(id: string, updates: Partial<Parcel>): Promise<Parcel | null> {
    const updatedDoc = await ParcelModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).lean();
    return this.toDomain(updatedDoc);
  }

  async delete(id: string): Promise<boolean> {
    const result = await ParcelModel.findByIdAndDelete(id);
    return !!result;
  }
}
