import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { share } from 'rxjs';
import { OrderItem } from 'src/app/model/orderItem';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent {

  groupBtnStatus = false;
  bucketBtnStatus = false;
  personPressed = false;

  productsAmount = 0;

  managerView:boolean;
  customerView:boolean;
  workerView:boolean;
  adminView: boolean;

  constructor(
    private routes: Router,
    private sharedService: SharedService
  ){
    sharedService.productAddedEvent.subscribe(()=> this.productsAmount++);

    sharedService.deleteItemEvent.subscribe((data:OrderItem)=>this.productsAmount-=data.count);

    sharedService.clearBucketEvent.subscribe(()=>this.productsAmount = 0)

    sharedService.personPressedEvent.subscribe(()=>{
      if(this.personPressed) this.personPressed = false;
      else this.personPressed = true;
    });

    sharedService.bucketPressEvent.subscribe(()=>{
      if(this.bucketBtnStatus) this.bucketBtnStatus = false;
      else this.bucketBtnStatus = true;
    });

    sharedService.viewSet.subscribe(data=>{
      switch(data){
        case 'customer':
          this.resetViews();
          this.customerView = true;
          break;
        case 'manager':
          this.resetViews();
          this.managerView = true;
          break;
        case 'worker':
          this.resetViews();
          this.managerView = true;
          break;
        case 'admin':
          this.resetViews();
          this.adminView = true;
          break;
        case 'hideAll':
          this.resetViews();
          break;
        default:
          console.log("no such view");
      }

    })
  }

  resetViews(){
    this.customerView = false;
    this.managerView = false;
    this.customerView = false;
    this.adminView = false;
  }

  onLogoPressed(){
    this.routes.navigateByUrl("customer/main");
  }

  onGroupMenyPressed(){
    if(this.groupBtnStatus){
      this.groupBtnStatus = false;
      this.sharedService.emitGroupsShowing("-400");
    }
    else{
      this.groupBtnStatus = true;
      this.sharedService.emitGroupsShowing("0");
    }
  }

  onBucketPressed(){
    if(this.bucketBtnStatus){
      this.sharedService.emitBucketPressed("-400");
    }
    else{
      this.sharedService.emitBucketPressed("0");
    }
  }

  onPersonClicked(){
    if(this.personPressed){
      this.sharedService.emitPersonPressing("-600");
    }
    else{
      this.sharedService.emitPersonPressing("20");
    }
  }
}
