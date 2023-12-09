import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/model/group';
import { CustomerService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-customer-groups',
  templateUrl: './customer-groups.component.html'
})
export class CustomerGroupsComponent implements OnInit{
  constructor( private customerService: CustomerService){}

  groups: Group[] = [];

  ngOnInit(): void {
    this.customerService.getGroupsNames().subscribe(data => {
      this.groups = data;
    });
  }

  clicked(group:Group){
  }
}
