import { SharedService } from 'src/app/services/local/shared.service';
import { CustomerService } from 'src/app/services/customer-service.service';
import { CustomerComponent } from './../../customer.component';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: Product[];

  constructor(
    private customerService: CustomerService,
    private sharedService: SharedService
  ){
    sharedService.groupSelected.subscribe(data=>{
      this.changeParams("80%","0%");
      setTimeout(()=>this.customerService.getProductsFromGroups(data).subscribe(data=>{
        this.products = data;
        setTimeout(()=>this.changeParams("100%","100%"),300);
      }),400);
    })
  }

  ngOnInit(): void {
    this.customerService.getProductsFromGroups(9).subscribe(data=> {
      this.products = data;
    });
  }

  changeParams(scale:string,opacity:string){
    document.documentElement.style.setProperty('--scale',scale);
    document.documentElement.style.setProperty('--opacity', opacity);
  }

  onProductClicked(product: Product){
    this.sharedService.emitProductCard(product);
  }

}
