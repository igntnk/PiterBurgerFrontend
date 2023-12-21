import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { eventListeners } from '@popperjs/core';
import { Product } from 'src/app/model/product';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements AfterViewInit{

  product: Product;

  constructor(
    private sharedService: SharedService
  ){
    this.sharedService.productSelectedEvent.subscribe(data =>{
      this.product = data;
    })
  }

  onAddButtonPressed(data:Product){
    this.sharedService.emitAddingItem(data);
  }

  ngAfterViewInit(): void {
    let button = document.getElementById("addBtn");
    button?button.addEventListener("mousedown",function(event){
      event.preventDefault();
    }):null;
  }
}
