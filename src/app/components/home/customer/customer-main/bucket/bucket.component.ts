import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';
import { CustomerService } from 'src/app/services/customer-service.service';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent{

  items: OrderItem[]=[];
  allPrice = 0;

  constructor(
    private sharedService: SharedService
  ){
    sharedService.productAddedEvent.subscribe((data:Product)=>{
      let found = this.items.find((element)=> element.product == data);
      debugger;
      if(found){
        found.count++;
        this.allPrice += found.product.price;
      }
      else{
      this.allPrice += data.price;
      this.items.push(new OrderItem(data));
      }
    })
  }

}
