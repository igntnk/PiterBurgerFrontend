import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent {

  customerUrl = "/api/customer";

  products: Product[] = [];

  constructor(
    private titleService:Title,
    private http: HttpClient
    ){
    this.titleService.setTitle("PiterBurger");
  }

  groupSelected(data: Product[]){
    this.products = data;
  }

}
