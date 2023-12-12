import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Input() amountOfProducts:number;

  @Output() bucketClicked = new EventEmitter();

  onBucketClick(){
    this.bucketClicked.emit(8);
  }
}
