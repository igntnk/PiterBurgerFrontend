import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';

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

}
