import { SharedService } from './../../../../services/local/shared.service';
import { Component, EventEmitter, Output, OnInit, AfterViewInit } from '@angular/core';
import { OrderItem } from 'src/app/model/orderItem';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls:['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit,AfterViewInit{

  constructor(
    private sharedService: SharedService
    ){
      sharedService.openGroupMenuPressed.subscribe((data:string) => {
        document.documentElement.style.setProperty('--margin',data+"px");
      });

      sharedService.productSelectedEvent.subscribe((data:string)=>{
        setTimeout(()=>{
          document.documentElement.style.setProperty('--display',"flex");
          document.getElementById("card")?.focus();
        },200);
        setTimeout(()=>{
          document.documentElement.style.setProperty('--cardOpacity',"100%");
          document.documentElement.style.setProperty('--cardScale',"100%");
        },210)
      });

      sharedService.bucketPressEvent.subscribe((data:string)=>{
        document.documentElement.style.setProperty('--bucketMargin',data+"px");
      })
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--display',"none");
    document.documentElement.style.setProperty('--margin',"-400px");
    document.documentElement.style.setProperty('--bucketMargin',"-400px");
    document.documentElement.style.setProperty('--cardOpacity',"0%");
    document.documentElement.style.setProperty('--cardScale',"80%");
  }

  closeCard(){
    setTimeout(()=>document.documentElement.style.setProperty('--display',"none"),200);
    document.documentElement.style.setProperty('--cardOpacity',"0%");
    document.documentElement.style.setProperty('--cardScale',"80%");
  }

  ngAfterViewInit(): void {
    this.sharedService.emitChangingView("customer");
  }

}
