export interface Parcel {
  id?: string;
  sender: string;
  receiver: string;
  deliveryAddress: string;
  status: "PENDING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
}
