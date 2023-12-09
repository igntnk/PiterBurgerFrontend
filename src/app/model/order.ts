import { OrderItem } from "./orderItem";

export class Order{
  comment: string;
  status: string;
  items: OrderItem[];
}
