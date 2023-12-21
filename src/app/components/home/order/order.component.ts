import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { CustomerService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements AfterViewInit{

  @Input() order: Order;

  constructor(
    private customerService: CustomerService
  ){}

  ngAfterViewInit(): void {

  }


}
