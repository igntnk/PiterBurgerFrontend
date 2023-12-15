import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl = "api/order/";

  constructor(
    private http: HttpClient
  ) { }

  getAvtiveOrders():Observable<any>{
    return this.http.get(this.orderUrl + "active").pipe();
  }

  setCookingStatus(id:number):Observable<any>{
    return this.http.put(this.orderUrl + "cooking", id).pipe();
  }

  setCookedStatus(id:number):Observable<any>{
    return this.http.put(this.orderUrl + "cooked", id).pipe();
  }

  setServingStatus(id:number):Observable<any>{
    return this.http.put(this.orderUrl + "serving", id).pipe();
  }

  setServedStatus(id:number):Observable<any>{
    return this.http.put(this.orderUrl + "served", id).pipe();
  }

  setDoneStatus(id:number):Observable<any>{
    return this.http.put(this.orderUrl + "done", id).pipe();
  }

  setFreezedStatus(id:number):Observable<any>{
    return this.http.put(this.orderUrl + "freeze", id).pipe();
  }

  setActiveStatus(id:number):Observable<any>{
    return this.http.put(this.orderUrl + "active", id).pipe();
  }

  deleteOrder(id:number):Observable<any>{
    const headers = new HttpHeaders().set("id", id.toString())
    return this.http.delete(this.orderUrl + "delete", {headers}).pipe();
  }
}
