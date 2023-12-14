import { Component, Input } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent {

  @Input() order: Order;

  countPrice():number{
    let price = 0;
    for(let item of this.order.items)
      price += item.product.price*item.count;
    return price;
  }
}
