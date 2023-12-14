import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Input() amountOfProducts:number;

  @Output() bucketClicked = new EventEmitter();
  @Output() logoClicked = new EventEmitter();
  @Output() profileClicked = new EventEmitter();

  profileView: boolean = false;

  constructor(
    private sharedService: SharedService
  ){
    this.sharedService.orderEmmited.subscribe(unused => {
      this.amountOfProducts = 0;
    })
  }

  onBucketClick(){
    this.bucketClicked.emit(8);
  }

  onProfileClicked(){
    this.profileView = true;
    this.profileClicked.emit(this.profileView);
  }

  onLogoClicked(){
    this.profileView = false;
    this.logoClicked.emit(this.profileView);
  }
}
