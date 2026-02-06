export type ParcelStatus = 'pending' | 'in_transit' | 'delivered' | 'cancelled';

export interface ParcelEntity {
  id?: string;
  sender: string;
  receiver: string;
  deliveryAddress: string;
  status: ParcelStatus;
  creatorId: string;
  creatorRole: 'merchant' | 'user';
  riderId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
