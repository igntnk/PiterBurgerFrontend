import { AfterContentChecked, AfterContentInit, AfterRenderOptions, AfterRenderRef, AfterViewChecked, AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, afterRender } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { CustomerService } from 'src/app/services/customer-service.service';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ["./order.component.css"]
})
export class OrderComponent{

  @Input() order: Order;
  @Input() idString: string;

  constructor(
  ){

  }


}
