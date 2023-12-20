import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectGroup = new Subject<any>();
  groupSelected = this.selectGroup.asObservable();

  private openGroupMenu = new Subject<any>();
  openGroupMenuPressed = this.openGroupMenu.asObservable();

  private productSelected = new Subject<any>();
  productSelectedEvent = this.productSelected.asObservable();

  private addItemToBucket = new Subject<any>;
  productAddedEvent = this.addItemToBucket.asObservable();

  emitGroupChange(change: any) {
    this.selectGroup.next(change);
  }

  emitGroupsShowing(change: any) {
    this.openGroupMenu.next(change);
  }

  emitProductCard(change: any) {
    this.productSelected.next(change);
  }

  emitAddingItem(change:any){
    this.addItemToBucket.next(change);
  }
}
