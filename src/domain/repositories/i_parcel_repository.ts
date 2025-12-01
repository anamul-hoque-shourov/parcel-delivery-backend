import { Parcel } from "@/domain/entities/parcel_entity";

export type SafeParcel = Omit<Parcel, "creatorId" | "riderId" | "creatorRole">;

export interface IParcelRepository {
  findById(id: string): Promise<Parcel | null>;
  findAll(): Promise<Parcel[]>;
  create(parcel: Parcel): Promise<Parcel>;
  update(id: string, updates: Partial<Parcel>): Promise<Parcel | null>;
  delete(id: string): Promise<boolean>;

  findAllByCreatorId(creatorId: string): Promise<Parcel[]>;
  findByIdAndCreatorId(id: string, creatorId: string): Promise<Parcel | null>;

  findAllByRiderId(riderId: string): Promise<Parcel[]>;
  findByIdAndRiderId(id: string, riderId: string): Promise<Parcel | null>;
}
