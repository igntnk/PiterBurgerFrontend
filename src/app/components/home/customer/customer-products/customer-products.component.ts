import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html'
})
export class CustomerProductsComponent {
  @Input() products: Product[] = [];

  @Output() addButtonPressed = new EventEmitter();

  onAddButtonPressed(data: Product){
    this.addButtonPressed.emit(data);
  }
}
