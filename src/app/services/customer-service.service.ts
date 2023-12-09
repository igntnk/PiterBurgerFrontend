import { CustomerComponent } from './../components/home/customer/customer.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
   }

   getGroupsNames():Observable<any>{
      return this.http.get("api/customer/groups").pipe();
   }
}
