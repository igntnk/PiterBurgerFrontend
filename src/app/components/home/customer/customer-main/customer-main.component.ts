import { SharedService } from './../../../../services/local/shared.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html'
})
export class CustomerMainComponent {

  @Output() addButtonClicked = new EventEmitter();

  constructor(private sharedService: SharedService){}

  products: Product[] = [];
  items: OrderItem[]=[];

  groupSelected(data: Product[]){
    this.products = data;
  }

  onAddProductPressed(data:Product){
    this.sharedService.emitChange(data);
  }

}
