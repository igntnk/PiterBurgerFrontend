import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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
