import { Parcel } from "@/domain/entities/parcel_entity";

export interface IParcelRepository {
  findById(id: string): Promise<Parcel | null>;
  findAll(): Promise<Parcel[]>;
  create(parcel: Parcel): Promise<Parcel>;
  update(id: string, updates: Partial<Parcel>): Promise<Parcel | null>;
  delete(id: string): Promise<boolean>;
}
