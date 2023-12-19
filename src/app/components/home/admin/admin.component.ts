import { Component } from '@angular/core';
import '@angular/compiler';
import { AuthService } from '../../../auth/auth.service';
import { AuthGuard } from '../../../auth/auth.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {

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
