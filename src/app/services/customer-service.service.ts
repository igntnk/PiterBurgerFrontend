import { AuthService } from './../auth/auth.service';
import { CustomerComponent } from './../components/home/customer/customer.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import { Observable, tap } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerUrl = "api/customer/";
  orderUrl = "api/order/"
  headers = new HttpHeaders().set("email", this.authService.LoggedUser.email);

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {
   }

   getGroupsNames():Observable<any>{
      return this.http.get(this.customerUrl+"groups").pipe();
   }

   getProductsFromGroups(id: number):Observable<any>{
    const params = new HttpParams().set("id", id);
    return this.http.get(this.customerUrl+ "grouprod", {params}).pipe();
   }

   getMyName():Observable<any>{
    const params = new HttpParams().set("email",this.authService.LoggedUser.email);
    return this.http.get(this.customerUrl + "name" ,{params}).pipe();
   }

   setMyName(name: string):Observable<any>{
    return this.http.post(this.customerUrl + "name",name).pipe();
   }

   getHistory():Observable<any>{
    return this.http.get(this.customerUrl + "history").pipe();
   }

   getActive():Observable<any>{
    return this.http.get(this.customerUrl + "active").pipe();
   }

   sendOrder(order: Order):Observable<any>{
    return this.http.post(this.orderUrl + "create", order).pipe();
   }
}
