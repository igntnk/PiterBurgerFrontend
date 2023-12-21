import { SharedService } from 'src/app/services/local/shared.service';
import { CustomerService } from 'src/app/services/customer-service.service';
import { CustomerComponent } from './../../customer.component';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Page } from 'src/app/model/page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: Product[];
  selectedGroupId: number;

  constructor(
    private customerService: CustomerService,
    private sharedService: SharedService,
    private routes: Router
  ){
    sharedService.groupSelected.subscribe(data=>{
      this.changeParams("0%");
      this.selectedGroupId = data;
      setTimeout(()=>this.customerService.getProductsFromGroups(data,0,12).subscribe(data=>{
        this.products = data.content;
        sharedService.emitPaginatorChanging(new Page(data.number,data.size,data.totalElements));
        console.log(data);
        setTimeout(()=>this.changeParams("100%"),300);
      }),400);
    })

    sharedService.changinByPaginatorEvent.subscribe(data=>{
      this.changeParams("0%");
      setTimeout(()=>this.customerService.getProductsFromGroups(this.selectedGroupId,data.page,data.size).subscribe(data=>{
        this.products = data.content;
        sharedService.emitPaginatorChanging(new Page(data.number,data.size,data.totalElements));
        console.log(data);
        setTimeout(()=>this.changeParams("100%"),300);
      }),400);
    })
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--paginatorOpacity',"0%");
    this.sharedService.emitGroupChange(9);
  }

  changeParams(opacity:string){
    document.documentElement.style.setProperty('--opacity', opacity);
  }

  onProductClicked(product: Product){
    this.sharedService.emitProductCard(product);
  }

  onPersonPressed(){
    this.routes.navigateByUrl("customer/person");
  }

}
