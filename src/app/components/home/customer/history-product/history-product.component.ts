import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-history-product',
  templateUrl: './history-product.component.html'
})
export class HistoryProductComponent {
  @Input() product: Product;
  @Input() amount: number = 1;
}
