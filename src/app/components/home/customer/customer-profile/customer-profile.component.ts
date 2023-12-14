import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CustomerService } from 'src/app/services/customer-service.service';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html'
})
export class CustomerProfileComponent implements OnInit {

  @Input() myName: string;

  constructor(
    private customerService: CustomerService,
    private sharedService: SharedService
    ){

      sharedService.nameEmmited.subscribe(data => {debugger
        this.myName = data.message;
      });
    }

  ngOnInit(){
    this.customerService.getMyName().subscribe(data => {
      this.myName = data.message;
    });
  }

  onApplyClicked(){
    const element = document.getElementById("name") as HTMLInputElement;
    let type = this.myName == element.value || element.value == '' ? false: element.value;
    this.sharedService.onApplyPressed(type);
  }

  onHistoryClicked(){
    this.customerService.getHistory().subscribe(data =>{
      console.log(data);
    })
  }

}


