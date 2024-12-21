import { MenuResponse } from "./menu";

export interface itemCart {
  menuItem: MenuResponse;
  quantity: number;
  totalPrice: number;
  size?: string;
}
