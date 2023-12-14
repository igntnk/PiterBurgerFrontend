import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Order } from 'src/app/model/order';
import { CustomerService } from 'src/app/services/customer-service.service';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls:["./customer-profile.component.css"]
})
export class CustomerProfileComponent implements OnInit {

  @Input() myName: string;

  orders: Order[]=[];

  showHistory = false;
  showActive = false;

  constructor(
    private customerService: CustomerService,
    private sharedService: SharedService
    ){

      sharedService.nameEmmited.subscribe(data => {debugger
        this.myName = data.message;
      });
    }

  ngOnInit(){
    this.customerService.getMyName().subscribe(data => {
      this.myName = data.message;
    });
  }

  onApplyClicked(){
    const element = document.getElementById("name") as HTMLInputElement;
    let type = this.myName == element.value || element.value == '' ? false: element.value;
    this.sharedService.onApplyPressed(type);
  }

  onHistoryClicked(){
    this.showHistory = true;
    this.customerService.getHistory().subscribe(data =>{
      this.orders = data;
    })
  }

  historyClose(){
    this.showHistory = false;
  }

  onActiveClicked(){
    this.showActive = true;
    this.customerService.getActive().subscribe(data => {
      this.orders = data;
    })
  }

  activeClose(){
    this.showActive = false;
  }

}


