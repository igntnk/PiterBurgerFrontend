import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private emitChangeSource = new Subject<any>();
  private applyPressed = new Subject<any>();
  private nameChanged = new Subject<any>();
  private orderSent = new Subject<any>();
  changeEmitted = this.emitChangeSource.asObservable();
  applyEmitted = this.applyPressed.asObservable();
  nameEmmited = this.nameChanged.asObservable();
  orderEmmited = this.orderSent.asObservable();

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  onApplyPressed(change: any){
    this.applyPressed.next(change);
  }

  onNameChanged(change: any){
    this.nameChanged.next(change);
  }

  onOrderSent(change: any){
    this.orderSent.next(change);
  }
}
