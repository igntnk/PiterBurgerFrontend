import { AfterViewInit, Component } from '@angular/core';
import { Notify } from 'src/app/model/notify';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-notify-container',
  templateUrl: './notify-container.component.html',
  styleUrls: ['./notify-container.component.css']
})
export class NotifyContainerComponent {

  notifies = new Map();

  constructor(
    private sharedService: SharedService
  ){
    sharedService.notifyChangingEvent.subscribe((data:Notify)=>{
      this.notifies.set(data,setTimeout(()=>{
        data.opacity = "0%";
        setTimeout(()=>this.notifies.delete(data),400);
      },10000));
      setTimeout(()=>data.translate = "0%",10);
    })
  }

  onCloseClicked(notify: any){
    clearTimeout(notify.value);
    notify.key.opacity = "0%";
    setTimeout(()=>this.notifies.delete(notify.key),400);
  }
}
