import { Component, Input, Output, AfterViewInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';
import { SharedService } from 'src/app/services/local/shared.service';
import { EventEmitter } from 'ws';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent{

  @Input() item: OrderItem;

  managerView:boolean;
  customerView:boolean;
  workerView:boolean;
  adminView: boolean;

  constructor(
    private sharedService: SharedService
  ){
    sharedService.viewSet.subscribe(data=>{
      switch(data){
        case 'customer':
          this.resetViews();
          this.customerView = true;
          break;
        case 'manager':
          this.resetViews();
          this.managerView = true;
          break;
        case 'worker':
          this.resetViews();
          this.managerView = true;
          break;
        case 'admin':
          this.resetViews();
          this.adminView = true;
          break;
        case 'hideAll':
          this.resetViews();
          break;
        default:
          console.log("no such view");
      }
    })

  }

  resetViews(){
    this.customerView = false;
    this.managerView = false;
    this.customerView = false;
    this.adminView = false;
  }

  onDeleteBtnPressed(data: OrderItem){
    this.sharedService.emitDeletePressed(data);
  }

}
