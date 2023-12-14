import { Component, Input } from '@angular/core';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html'
})
export class ActiveOrdersComponent {
  @Input() orders: Order[];
}
