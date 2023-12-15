import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html'
})
export class ManagerComponent implements OnInit {
  orders: Order[];

  constructor(
    private orderService: OrderService
  ){
  }

  ngOnInit(): void {
      this.orderService.getAvtiveOrders().subscribe(data => {
        this.orders = data;
      })
  }

}
