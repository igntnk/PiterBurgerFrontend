import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/model/order';
import { CustomerService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent {

  @Input() orders: Order[];

}
