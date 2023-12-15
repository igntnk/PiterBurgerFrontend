import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  @Output() groupSelected = new EventEmitter();

  onGroupSelectd(data: any){
    this.groupSelected.emit(data);
  }

}
