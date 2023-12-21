import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Notify } from 'src/app/model/notify';
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
  comment: string;
  allPrice = 0;

  constructor(
    private sharedService: SharedService,
    private customerService: CustomerService
  ){
    sharedService.productAddedEvent.subscribe((data:Product)=>{
      let found = this.items.find((element)=> element.product == data);
      if(found){
        found.count++;
        this.allPrice += found.product.price;
      }
      else{
      this.allPrice += data.price;
      this.items.push(new OrderItem(data));
      }
    })

    sharedService.deleteItemEvent.subscribe((data:OrderItem)=>{
      this.items.splice(this.items.findIndex((element)=> element == data),1);
    })
  }

  onHideBtnPressed(){
    this.sharedService.emitBucketPressed("-400");
  }

  onClearPressed(){
    this.items = [];
    this.sharedService.emitClearingBucket(null);
  }

  onSendOrderPressed(){
    this.customerService.sendOrder(new Order(this.comment,this.items)).subscribe(()=>{
      this.items = [];
      this.sharedService.emitAddingNotify(new Notify("Успешно", "Заказ успешно отправлен","#554339"));
      this.sharedService.emitClearingBucket("");
    });
  }
}
