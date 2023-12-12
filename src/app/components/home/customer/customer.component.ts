import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';
import { BucketComponent } from '../../bucket/bucket.component';

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

  bucketPressed = new EventEmitter();

  constructor(
    private titleService:Title,
    private http: HttpClient
    ){
    this.titleService.setTitle("PiterBurger");
  }

  groupSelected(data: Product[]){
    this.products = data;
  }

  onAddProductPressed(data:Product){
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

}
