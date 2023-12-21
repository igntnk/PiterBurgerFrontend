import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls:['./manager.components.css']
})
export class ManagerComponent implements AfterViewInit {

  activeOrders: Order[]=[];
  cookingOrders: Order[]=[];
  cookedOrders: Order[]=[];
  servingOrders: Order[]=[];
  servedOrders: Order[]=[];
  freezedOrders: Order[]=[];

  constructor(
    private orderService: OrderService
  ){
    orderService.getManagerOrders().subscribe(data=>{
      this.mapOrders(data);
    })
  }

  mapOrders(orders: Order[]){
    for(let order of orders){
      switch(order.status){
        case 'ACTIVE':
          order.status = "Поступил";
          order.statusColor = "#403955";
          order.nextStatus = "Начать готовить";
          this.activeOrders.push(order);
          break;
        case 'COOKING':
          order.status = "В готовке";
          order.statusColor = "#5e5043";
          order.nextStatus = "Закончить готовку";
          this.cookingOrders.push(order);
          break;
        case 'COOKED':
          order.status = "Ждет сборки";
          order.statusColor = "#435e57";
          order.nextStatus = "Собрать";
          this.cookedOrders.push(order);
          break;
        case 'SERVING':
          order.status = "В сборке";
          order.statusColor = "#5c8261";
          order.nextStatus = "Закончить сборку";
          this.servingOrders.push(order);
          break;
        case 'SERVED':
          order.status = "Готов к выдаче";
          order.statusColor = "#76ab6f";
          order.nextStatus = "Выдать";
          this.servedOrders.push(order);
          break;
        case 'FREEZE':
          order.status = "Заморожен";
          order.statusColor = "#78b0bf";
          order.nextStatus = "Разморозить";
          this.freezedOrders.push(order);
          break;
      }
    }
  }

  ngAfterViewInit(): void {

  }

  drop(event: CdkDragDrop<Order[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
