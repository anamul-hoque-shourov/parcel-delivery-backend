import { IParcelRepository } from "@/domain/repositories/i_parcel_repository";
import { Parcel } from "@/domain/entities/parcel_entity";
import { ParcelRepository } from "@/infrastructure/repositories/parcel_repository";

type ParcelStatus = "pending" | "in_transit" | "delivered" | "cancelled";

const isValidString = (value: string | undefined): boolean =>
  typeof value === "string" && value.trim().length > 0;

export class ParcelService {
  private parcelRepository: IParcelRepository;

  constructor(parcelRepository: IParcelRepository = new ParcelRepository()) {
    this.parcelRepository = parcelRepository;
  }

  async createParcel(
    parcelData: Omit<Parcel, "id" | "status"> & {
      creatorId: string;
      creatorRole: "merchant" | "user";
    }
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
      status: "pending",
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
    updates: Partial<Parcel>,
    creatorId: string
  ): Promise<Parcel | null> {
    const existingParcel = await this.parcelRepository.findByIdAndCreatorId(
      id,
      creatorId
    );
    if (!existingParcel) {
      return null;
    }

    const isImmutable = existingParcel.status !== "pending";
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
        pending: ["in_transit", "cancelled"],
        in_transit: ["delivered", "cancelled"],
        delivered: [],
        cancelled: [],
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

    if (existingParcel.status === "pending") {
      return this.parcelRepository.delete(id);
    }

    if (existingParcel.status !== "cancelled") {
      const result = await this.parcelRepository.update(id, {
        status: "cancelled" as ParcelStatus,
      });
      return !!result;
    }

    return true;
  }

  async getParcelsByCreatorId(creatorId: string): Promise<Parcel[]> {
    return this.parcelRepository.findAllByCreatorId(creatorId);
  }

  async getRiderParcels(riderId: string): Promise<Parcel[]> {
    return this.parcelRepository.findAllByRiderId(riderId);
  }

  async updateParcelStatusByRider(
    parcelId: string,
    newStatus: "in_transit" | "delivered",
    riderId: string
  ): Promise<Parcel | null> {
    const existingParcel = await this.parcelRepository.findByIdAndRiderId(
      parcelId,
      riderId
    );
    if (!existingParcel) {
      throw new Error("Parcel not found or not assigned to this Rider.");
    }

    const currentStatus = existingParcel.status;

    if (currentStatus === "pending" && newStatus === "in_transit") {
      return this.parcelRepository.update(parcelId, { status: newStatus });
    } else if (currentStatus === "in_transit" && newStatus === "delivered") {
      return this.parcelRepository.update(parcelId, { status: newStatus });
    } else {
      throw new Error(
        `Rider cannot move parcel from ${currentStatus} to ${newStatus}.`
      );
    }
  }
}
