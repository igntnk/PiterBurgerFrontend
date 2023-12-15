import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  @Input() order: Order;

  @Input() managerView: boolean;
  @Input() workerView: boolean;
  @Input() customerView: boolean;

  orderStatus: string;
  nextStageText: string;
  statusColor: string;
  showOrder:boolean = true;

  constructor(
    private orderService: OrderService
  ){}

  ngOnInit(): void {
    switch(this.order.status){
      case 'ACTIVE':
        this.orderStatus = "Поступил";
        this.nextStageText = "Начать готовить!";
        this.statusColor = "#403955";
        break;
      case 'COOKING':
        this.orderStatus = "В готовке";
        this.nextStageText = "Закончить готовку!";
        this.statusColor = "#5e5043";
        break;
      case 'COOKED':
        this.orderStatus = "Ждет сборки";
        this.nextStageText = "Собрать!";
        this.statusColor = "#435e57";
        break;
      case 'SERVING':
        this.orderStatus = "В сборке";
        this.nextStageText = "Закончить сборку!";
        this.statusColor = "#5c8261";
        break;
      case 'SERVED':
        this.orderStatus = "Готов к выдаче";
        this.nextStageText = "Выдать!";
        this.statusColor = "#76ab6f";
        (!this.managerView)? this.showOrder = false: this.showOrder = true;
        break;
      case 'FREEZE':
        this.orderStatus = "Заморожен";
        this.nextStageText = "Разморозить!";
        this.statusColor = "#78b0bf";
        (!this.managerView)? this.showOrder = false: this.showOrder = true;
        break;
    }
  }

  changeStatus(){
    switch(this.order.status){
      case 'ACTIVE':
        this.orderService.setCookingStatus(this.order.id).subscribe(data=>
          console.log(data)
        );
        break;
      case 'COOKING':
        this.orderService.setCookedStatus(this.order.id).subscribe(data=>
          console.log(data)
        );
        break;
      case 'COOKED':
        this.orderService.setServingStatus(this.order.id).subscribe(data=>
          console.log(data)
        );
        break;
      case 'SERVING':
        this.orderService.setServedStatus(this.order.id).subscribe(data=>
          console.log(data)
        );
        break;
      case 'SERVED':
        this.orderService.setDoneStatus(this.order.id).subscribe(data=>
          console.log(data)
        );
        break;
      case 'FREEZE':
        this.orderService.setActiveStatus(this.order.id).subscribe(data=>
          console.log(data)
        );
        break;
    }
  }

  deleteOrder(){
    this.orderService.deleteOrder(this.order.id).subscribe(data => {
      console.log(data);
    })
  }

  countPrice():number{
    let price = 0;
    for(let item of this.order.items)
      price += item.product.price*item.count;
    return price;
  }
}
