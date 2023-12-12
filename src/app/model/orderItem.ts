import { Product } from "./product";

export class OrderItem{
  count: number;
  product: Product;

  constructor(product: Product){
    this.count = 1;
    this.product = product;
  }
}
