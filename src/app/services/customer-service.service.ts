import { SessionStorageService } from 'angular-web-storage';
import { AuthService } from './../auth/auth.service';
import { CustomerComponent } from './../components/home/customer/customer.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import { Observable, catchError, of, tap } from 'rxjs';
import { Order } from '../model/order';
import { Router } from '@angular/router';
import { WebSocketService } from './web-socket.service';
import { CreateOrderMessage } from '../messages/create-new-message';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerUrl = "api/customer/";
  orderUrl = "api/order/"
  headers = new HttpHeaders().set("email", this.authService.LoggedUser.email);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sessionStorage: SessionStorageService,
    private ws: WebSocketService,
    private routes: Router
    ) {
   }

   getGroupsNames():Observable<any>{
      return this.http.get(this.customerUrl+"groups").pipe();
   }

   getProductsFromGroups(id: number,page:number,size:number):Observable<any>{
    const params = new HttpParams()
    .set("id", id)
    .set("page",page)
    .set("size",size);
    return this.http.get(this.customerUrl+ "grouprod", {params}).pipe();
   }

   getMyName():Observable<any>{
    const headers = new HttpHeaders({"X-Requested-With": "XMLHttpRequest"});
    return this.http.get(this.customerUrl + "name" , {headers}).pipe(
      catchError(this.handleLoginError("/customer/person",[]))
      );
   }

   subscribeToCustomerOrders():Observable<any>{
    return this.ws.watch("/order/worker").pipe();
  }

  messageToSendOrder(order: Order){
    if (!this.authService.LoggedUser.email){
      this.routes.navigateByUrl("/login");
      return;
    }
    else{
      let message = new CreateOrderMessage(this.authService.LoggedUser.email,order);
      return this.ws.publish({destination:"/create",body:JSON.stringify(message)});
    }
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

   private handleLoginError<T>(lastUrl = '/cutomer/main', result?: T) {
    return (error: any): Observable<T> => {
      if(error.status === 401) {
        this.sessionStorage.set("lastUrl",lastUrl);
        this.routes.navigateByUrl("/login");
      }
      return of(result as T);
    };
  }
}
