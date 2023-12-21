import { CustomerService } from 'src/app/services/customer-service.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ["./worker.component.css"]
})
export class WorkerComponent {

  orders: Order[]=[];

  constructor(
    private orderService: OrderService
  ){
    orderService.getWorkerOrders().subscribe(data=>{
      this.mapOrders(data);
      this.orders = data;
    })
  }

  mapOrders(orders: Order[]){
    for(let order of orders){
      switch(order.status){
        case 'ACTIVE':
          order.status = "Поступил";
          order.statusColor = "#403955";
          order.nextStatus = "Начать готовить";
          break;
        case 'COOKING':
          order.status = "В готовке";
          order.statusColor = "#5e5043";
          order.nextStatus = "Закончить готовку";
          break;
        case 'COOKED':
          order.status = "Ждет сборки";
          order.statusColor = "#435e57";
          order.nextStatus = "Собрать";
          break;
        case 'SERVING':
          order.status = "В сборке";
          order.statusColor = "#5c8261";
          order.nextStatus = "Закончить сборку";
          break;
        case 'SERVED':
          order.status = "Готов к выдаче";
          order.statusColor = "#76ab6f";
          order.nextStatus = "Выдать";
          break;
        case 'FREEZE':
          order.status = "Заморожен";
          order.statusColor = "#78b0bf";
          order.nextStatus = "Разморозить";
          break;
      }
    }
  }

  changeOrderStatus(data:Order){
    this.orderService.setNextStatus(data.id).subscribe(data=>{
      console.log(data);
    });
  }

}
