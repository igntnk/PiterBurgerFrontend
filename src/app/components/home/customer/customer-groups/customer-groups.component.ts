import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Group } from 'src/app/model/group';
import { Product } from 'src/app/model/product';
import { CustomerService } from 'src/app/services/customer-service.service';

@Component({
  selector: 'app-customer-groups',
  templateUrl: './customer-groups.component.html'
})
export class CustomerGroupsComponent implements OnInit{
  constructor( private customerService: CustomerService){ }

  groups: Group[] = [];
  products: Product[] = [];

  @Output() groupPressed = new EventEmitter();

  ngOnInit(): void {
    this.customerService.getGroupsNames().subscribe(data => {
      this.groups = data;
    });
  }


  onGroupSelected(group:Group){
    this.customerService.getProductsFromGroups(group.id).subscribe(data =>
      {
        this.groupPressed.emit(data);
      })
  }
}
