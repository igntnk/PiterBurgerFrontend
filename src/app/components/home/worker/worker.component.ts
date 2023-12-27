import { CustomerService } from 'src/app/services/customer-service.service';
import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { Title } from '@angular/platform-browser';
import { jsDocComment } from '@angular/compiler';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ["./worker.component.css"]
})
export class WorkerComponent{

  orders: Order[]=[];

  constructor(
    private orderService: OrderService
  ){
    orderService.getWorkerOrders().subscribe(data=>{
      this.orders = this.orderService.mapOrders(data);
    })

    orderService.subscribeToWorkerOrders().subscribe(data=>{
      debugger;
      let order = (JSON.parse(data.body));
      this.orderService.mapOrders([order]);
      let index = this.orders.findIndex((element)=> element.id == order.id);
      if(index == -1){this.orders.push(order)}
      else{this.orders[index] = order;}
    })
  }

  changeOrderStatus(data:Order){
    this.orderService.messageToNext(data.id);
  }

}
