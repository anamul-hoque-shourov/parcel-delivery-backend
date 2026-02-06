import { ParcelEntity } from './parcel.entity';

export interface IParcelValidator {
  validateCreation(data: Omit<ParcelEntity, 'id' | 'status'>): void;
  validateStatusTransition(currentStatus: string, newStatus: string): void;
  validateImmutableFieldsUpdate(currentStatus: string, updates: Partial<ParcelEntity>): void;
}

export class ParcelValidator implements IParcelValidator {
  private isValidString(value: string | undefined): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }

  validateCreation(data: Omit<ParcelEntity, 'id' | 'status'>): void {
    if (!this.isValidString(data.sender)) {
      throw new Error('Sender name is required.');
    }
    if (!this.isValidString(data.receiver)) {
      throw new Error('Receiver name is required.');
    }
    if (!this.isValidString(data.deliveryAddress)) {
      throw new Error('Delivery address is required for a new parcel.');
    }
  }

  validateStatusTransition(currentStatus: string, newStatus: string): void {
    const allowedTransitions: Record<string, string[]> = {
      pending: ['in_transit', 'cancelled'],
      in_transit: ['delivered', 'cancelled'],
      delivered: [],
      cancelled: [],
    };

    if (!allowedTransitions[currentStatus]?.includes(newStatus)) {
      throw new Error(
        `Invalid status transition: Cannot move from ${currentStatus} to ${newStatus}.`,
      );
    }
  }

  validateImmutableFieldsUpdate(currentStatus: string, updates: Partial<ParcelEntity>): void {
    const isImmutable = currentStatus !== 'pending';
    if (isImmutable && (updates.deliveryAddress || updates.sender || updates.receiver)) {
      throw new Error(`Cannot change delivery details for a parcel currently ${currentStatus}.`);
    }
  }
}
