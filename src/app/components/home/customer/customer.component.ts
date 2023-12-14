import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';
import { BucketComponent } from '../../bucket/bucket.component';
import { Route, Router } from '@angular/router';
import { SharedService } from 'src/app/services/local/shared.service';
import { CustomerService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent {

  customerUrl = "/api/customer";

  products: Product[] = [];
  items: OrderItem[]=[];
  amountOfProducts = 0;
  allPrice = 0;

  rightPar = -420;

  showWarn: boolean = false;
  showMess: boolean = false;

  timerId: any;

  bucketPressed = new EventEmitter();

  constructor(
    private titleService:Title,
    private router: Router,
    private sharedService: SharedService,
    private customerService: CustomerService
    ){
    this.titleService.setTitle("PiterBurger");

    sharedService.changeEmitted.subscribe(data => {
      this.amountOfProducts++;
      let found = this.items.find((element)=> element.product == data);
      if(found){
        found.count++;
        this.allPrice += found.product.price;
      }
      else{
      this.allPrice += data.price;
      this.items.push(new OrderItem(data))
      }
    })

    sharedService.applyEmitted.subscribe( data => {
      data? this.customerService.setMyName(data).subscribe(data => {
        this.showMessage();
        sharedService.onNameChanged(data);
      }) : this.showWarning();
    })

    sharedService.orderEmmited.subscribe(unused => {
      this.rightPar = -420;
      this.items = [];
      this.allPrice = 0;
      this.amountOfProducts = 0;
    })
  }

  showWarning(){
    this.showWarn= true;
    this.timerId = setTimeout(() => this.showWarn = false, 10000);
  }

  showMessage(){
    this.showMess = true;
    this.timerId = setTimeout(() => this.showMess = false, 10000);
  }

  closeNotify(){
    clearTimeout(this.timerId);
    this.showMess = false;
    this.showWarn = false;
  }

  groupSelected(data: Product[]){
    this.products = data;
  }

  onDeletePressed(){
    this.amountOfProducts--;
  }

  onBucketClicked(){
    this.rightPar = 8;
  }

  onBackPressed(){
    this.rightPar = -420;
  }

  onProfileClicked(data: boolean){
    this.router.navigateByUrl('customer/profile');
  }

  onLogoClicked(data: boolean){
    this.router.navigateByUrl('customer/main');
  }

}
