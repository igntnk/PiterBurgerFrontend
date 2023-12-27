import { OrderItem } from "./orderItem";

export class Order{
  id: number;
  comment: string;
  creationDate: Date;
  status: string;
  items: OrderItem[];
  statusColor: string;
  nextStatus: string;

  constructor(comment: string, items: OrderItem[]){
    this.comment = comment;
    this.items = items;
  }

}
