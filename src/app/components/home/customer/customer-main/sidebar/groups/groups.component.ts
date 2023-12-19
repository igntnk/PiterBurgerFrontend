import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/model/group';
import { CustomerService } from 'src/app/services/customer-service.service';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[]

  constructor(
    private customerService: CustomerService,
    private sharedService: SharedService
  ){}
  ngOnInit(): void {
    this.customerService.getGroupsNames().subscribe(data => this.groups = data);
  }

  groupSelected(id:number){
    this.sharedService.emitGroupChange(id);
  }
}
