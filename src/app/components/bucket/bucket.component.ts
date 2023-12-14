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
export class BucketComponent implements OnChanges{

  @Input() items: OrderItem[] =[];
  @Input() allPrice: number;

  @Output() deletePressed = new EventEmitter();
  @Output() backPressed = new EventEmitter();

  @Input() rightPar = -420;

  constructor(
    private sharedService: SharedService,
    private customerService: CustomerService
  ){}

  onDeletePressed(index: number){
    let found = this.items[index];
    this.allPrice -= found.product.price;
    found.count>1?found.count--:this.items.splice(index,1);
    this.deletePressed.emit();
  }

  onBackPressed(){
    this.backPressed.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    let elementToMove = document.getElementById("bucket");
    this.rightPar = changes['rightPar']?changes['rightPar'].currentValue : this.rightPar;
    elementToMove? elementToMove.style.right = this.rightPar +'px': null;
  }

  onCreateClicked(){
    this.customerService.sendOrder(new Order("", this.items)).subscribe(data =>{
      console.log(data);
    });
    this.sharedService.onOrderSent(null);
    this.allPrice = 0;
    this.items = [];
  }

}
