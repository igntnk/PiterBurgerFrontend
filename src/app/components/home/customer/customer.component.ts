import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent {

  customerUrl = "/api/customer";

  constructor(
    private titleService:Title,
    private http: HttpClient
    ){
    this.titleService.setTitle("PiterBurger");

  }

}
