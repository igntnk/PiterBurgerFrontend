import { SharedService } from './../../../../services/local/shared.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls:['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit{

  constructor(
    private sharedService: SharedService
    ){
      sharedService.openGroupMenuPressed.subscribe((data:string) => {
        document.documentElement.style.setProperty('--margin',data+"px");
      });
      sharedService.productSelectedEvent.subscribe((data:string)=>{
        document.documentElement.style.setProperty('--cardOpacity',"100%");
        document.documentElement.style.setProperty('--cardScale',"100%");
        document.documentElement.style.setProperty('--display',"flex");
      })
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--margin',"-400px");
    document.documentElement.style.setProperty('--display',"none");
    document.documentElement.style.setProperty('--cardOpacity',"0%");
    document.documentElement.style.setProperty('--cardScale',"80%");
  }

}
