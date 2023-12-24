import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscribable, Subscriber, Subscription } from 'rxjs';
import { Notify } from 'src/app/model/notify';
import { Order } from 'src/app/model/order';
import { CustomerService } from 'src/app/services/customer-service.service';
import { SharedService } from 'src/app/services/local/shared.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-customer-person',
  templateUrl: './customer-person.component.html',
  styleUrls: ['./customer-person.component.css']
})
export class CustomerPersonComponent implements AfterViewInit,OnInit {

  name: string;
  orders: Order[] =[];

  showActive= false;
  showHistory= false;

  topicSubscription: Subscription;

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private sharedService: SharedService
  ){
    customerService.getMyName().subscribe(data=> this.name = data.name);
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

  ngOnInit(): void {
    this.topicSubscription = this.customerService.subscribeToCustomerOrders().subscribe(data=>{
      let order = (JSON.parse(data.body));
      this.orderService.mapOrders([order]);
      let index = this.orders.findIndex((element)=> element.id == order.id);
      this.orders[index] = order;
    })
  }

  onHistoryClicked(){
    this.customerService.getHistory().subscribe(data => {
      this.orders = this.orderService.mapOrders(data);
      this.showHistory = true;
      let text = document.getElementById("historyTag") as HTMLElement;
      text.style.marginBottom = "10px";
    })
  }

  onActiveClicked(){
    this.customerService.getActive().subscribe(data => {
      this.orders = this.orderService.mapOrders(data);
      this.showActive = true;
      let text = document.getElementById("activeTag") as HTMLElement;
      text.style.marginBottom = "10px";
    })
  }

  hideHistory(){
    setTimeout(()=>{
      this.showHistory = false;
      let text = document.getElementById("historyTag") as HTMLElement;
      text.style.marginBottom = "0p";
    },300);
  }

  hideActive(){
    setTimeout(()=>{
      this.showActive = false;
      let text = document.getElementById("activeTag") as HTMLElement;
      text.style.marginBottom = "0";
    },300);
  }
}
