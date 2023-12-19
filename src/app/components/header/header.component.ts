import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent {

  groupBtnStatus = false;

  constructor(
    private routes: Router,
    private sharedService: SharedService
  ){}


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
}
