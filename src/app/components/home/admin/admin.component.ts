import { SharedService } from 'src/app/services/local/shared.service';
import { AfterViewInit, Component } from '@angular/core';
import '@angular/compiler';
import { AuthService } from '../../../auth/auth.service';
import { AuthGuard } from '../../../auth/auth.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls:['./admin.component.css']
})
export class AdminComponent implements AfterViewInit{

  orders: Order[];

  constructor(
    private sharedService:SharedService
  ){

    document.documentElement.style.setProperty("--createUserLeft","-600px");

    this.sharedService.personPressedEvent.subscribe((data:string)=>{
      document.documentElement.style.setProperty("--createUserLeft",data+"px");
    })
  }

  ngAfterViewInit(): void {
    this.sharedService.emitChangingView("admin");
  }

}
