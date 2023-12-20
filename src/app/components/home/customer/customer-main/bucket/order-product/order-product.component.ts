import { Component, Input } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent {

  @Input() item: OrderItem;
}
