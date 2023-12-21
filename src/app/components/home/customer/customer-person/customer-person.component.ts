import { AfterViewInit, Component } from '@angular/core';
import { Notify } from 'src/app/model/notify';
import { Order } from 'src/app/model/order';
import { CustomerService } from 'src/app/services/customer-service.service';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-customer-person',
  templateUrl: './customer-person.component.html',
  styleUrls: ['./customer-person.component.css']
})
export class CustomerPersonComponent implements AfterViewInit {

  name: string;
  orders: Order[] =[];

  showActive= false;
  showHistory= false;

  constructor(
    private customerService: CustomerService,
    private sharedService: SharedService
  ){
    customerService.getMyName().subscribe(data=> this.name = data.message);
  }

  onApplyClicked(){
    const element = document.getElementById("nameString") as HTMLInputElement;
    let type = this.name == element.value || element.value == '' ? false: element.value;
    if(type){
      this.customerService.setMyName(type).subscribe(data =>{
        this.sharedService.emitAddingNotify(new Notify("Успешно","Имя успешно сменено","#554339"));
        this.name = data.message;
      });
    }
    else
      this.sharedService.emitAddingNotify(new Notify("Ошибка","У вас уже такое имя","#A36262"));
  }

  ngAfterViewInit(): void {
    this.sharedService.emitChangingView("hideAll");
  }

  onHistoryClicked(){
    this.customerService.getHistory().subscribe(data => {
      this.mapOrders(data);
      this.orders = data;
      this.showHistory = true;
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

  onActiveClicked(){
    this.customerService.getActive().subscribe(data => {
      this.mapOrders(data);
      this.orders = data;
      this.showActive = true;
    })
  }

  hideHistory(){
    setTimeout(()=>this.showHistory = false,300);
  }

  hideActive(){
    setTimeout(()=>this.showActive = false,300);
  }
}
