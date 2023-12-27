import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private setViewType = new Subject<any>();
  viewSet = this.setViewType.asObservable();
  emitChangingView(change: any) {this.setViewType.next(change);}

  private selectGroup = new Subject<any>();
  groupSelected = this.selectGroup.asObservable();
  emitGroupChange(change: any) {this.selectGroup.next(change);}

  private openGroupMenu = new Subject<any>();
  openGroupMenuPressed = this.openGroupMenu.asObservable();
  emitGroupsShowing(change: any) {this.openGroupMenu.next(change);}

  private productSelected = new Subject<any>();
  productSelectedEvent = this.productSelected.asObservable();
  emitProductCard(change: any) {this.productSelected.next(change);}

  private addItemToBucket = new Subject<any>;
  productAddedEvent = this.addItemToBucket.asObservable();
  emitAddingItem(change:any){this.addItemToBucket.next(change); }

  private bucketBtnPressed = new Subject<any>;
  bucketPressEvent = this.bucketBtnPressed.asObservable();
  emitBucketPressed(change:any){this.bucketBtnPressed.next(change);}

  private deleteItemPressed = new Subject<any>;
  deleteItemEvent = this.deleteItemPressed.asObservable();
  emitDeletePressed(change:any){ this.deleteItemPressed.next(change);}

  private clearBucketPressed = new Subject<any>;
  clearBucketEvent = this.clearBucketPressed.asObservable();
  emitClearingBucket(change:any){this.clearBucketPressed.next(change);}

  private changePaginator = new Subject<any>;
  onPaginatorChanging = this.changePaginator.asObservable();
  emitPaginatorChanging(change:any){this.changePaginator.next(change);}

  private changinByPaginator = new Subject<any>;
  changinByPaginatorEvent = this.changinByPaginator.asObservable();
  emitChangingByPaginator(change:any){this.changinByPaginator.next(change);}

  private notifyChanging = new Subject<any>;
  notifyChangingEvent = this.notifyChanging.asObservable();
  emitAddingNotify(change:any){this.notifyChanging.next(change);}

  private filterChanging = new Subject<any>;
  filterChangingEvent = this.filterChanging.asObservable();
  emitFilterChanging(change:any){this.filterChanging.next(change);}

  private personPressed = new Subject<any>;
  personPressedEvent = this.personPressed.asObservable();
  emitPersonPressing(change:any){this.personPressed.next(change);}

  private userDeleted = new Subject<any>;
  userDeletedEvent = this.userDeleted.asObservable();
  emitUserDeleting(change:any){this.userDeleted.next(change);}
}
