import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';
import { BucketComponent } from '../../bucket/bucket.component';
import { Route, Router } from '@angular/router';
import { SharedService } from 'src/app/services/local/shared.service';
import { CustomerService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent {

}
