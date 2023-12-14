import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product: Product;

  @Output() addButtonPressed = new EventEmitter();

  onAddButtonPressen(){
    this.addButtonPressed.emit(this.product);
  }
}
