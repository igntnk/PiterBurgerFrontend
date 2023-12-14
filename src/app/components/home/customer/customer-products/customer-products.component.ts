import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CustomerService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html'
})
export class CustomerProductsComponent implements OnInit {
  @Input() products: Product[] = [];

  @Output() addButtonPressed = new EventEmitter();

  constructor(
    private customerService: CustomerService
    ){}

  ngOnInit(){
      this.customerService.getProductsFromGroups(9).subscribe(data => {
        this.products = data;
      })
  }

  onAddButtonPressed(data: Product){
    this.addButtonPressed.emit(data);
  }
}
