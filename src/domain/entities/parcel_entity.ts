export interface Parcel {
  id?: string;
  sender: string;
  receiver: string;
  deliveryAddress: string;
  status: "pending" | "in_transit" | "delivered" | "cancelled";
  creatorId: string;
  creatorRole: "merchant" | "user";
  riderId?: string;
}
