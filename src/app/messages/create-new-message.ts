import { Order } from "../model/order";

export class CreateOrderMessage{
  email: string;
  order: Order;

  constructor(email:string, order:Order){
    this.email = email;
    this.order = order;
  }
}
