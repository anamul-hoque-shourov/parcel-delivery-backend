import { IParcelRepository } from "@/domain/repositories/i_parcel_repository";
import { Parcel } from "@/domain/entities/parcel_entity";
import { ParcelRepository } from "@/infrastructure/repositories/parcel_repository";

type ParcelStatus = "PENDING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";

const isValidString = (value: string | undefined): boolean =>
  typeof value === "string" && value.trim().length > 0;

export class ParcelService {
  private parcelRepository: IParcelRepository;

  constructor(parcelRepository: IParcelRepository = new ParcelRepository()) {
    this.parcelRepository = parcelRepository;
  }

  async createParcel(
    parcelData: Omit<Parcel, "id" | "status">
  ): Promise<Parcel> {
    if (!isValidString(parcelData.sender)) {
      throw new Error("Sender name is required.");
    }
    if (!isValidString(parcelData.receiver)) {
      throw new Error("Receiver name is required.");
    }
    if (!isValidString(parcelData.deliveryAddress)) {
      throw new Error("Delivery address is required for a new parcel.");
    }

    const newParcel: Parcel = {
      ...parcelData,
      status: "PENDING",
    };

    return this.parcelRepository.create(newParcel);
  }

  async getParcelById(id: string): Promise<Parcel | null> {
    return this.parcelRepository.findById(id);
  }

  async getAllParcels(): Promise<Parcel[]> {
    return this.parcelRepository.findAll();
  }

  async updateParcel(
    id: string,
    updates: Partial<Parcel>
  ): Promise<Parcel | null> {
    const existingParcel = await this.parcelRepository.findById(id);
    if (!existingParcel) {
      return null;
    }

    const isImmutable = existingParcel.status !== "PENDING";
    if (
      isImmutable &&
      (updates.deliveryAddress || updates.sender || updates.receiver)
    ) {
      throw new Error(
        `Cannot change delivery details for a parcel currently ${existingParcel.status}.`
      );
    }

    if (updates.status && updates.status !== existingParcel.status) {
      const allowedTransitions: Record<ParcelStatus, ParcelStatus[]> = {
        PENDING: ["IN_TRANSIT", "CANCELLED"],
        IN_TRANSIT: ["DELIVERED", "CANCELLED"],
        DELIVERED: [],
        CANCELLED: [],
      };

      if (!allowedTransitions[existingParcel.status].includes(updates.status)) {
        throw new Error(
          `Invalid status transition: Cannot move from ${existingParcel.status} to ${updates.status}.`
        );
      }
    }

    delete updates.id;

    return this.parcelRepository.update(id, updates);
  }

  async deleteParcel(id: string): Promise<boolean> {
    const existingParcel = await this.parcelRepository.findById(id);
    if (!existingParcel) {
      return false;
    }

    if (existingParcel.status === "PENDING") {
      return this.parcelRepository.delete(id);
    }

    if (existingParcel.status !== "CANCELLED") {
      const result = await this.parcelRepository.update(id, {
        status: "CANCELLED" as ParcelStatus,
      });
      return !!result;
    }

    return true;
  }
}
