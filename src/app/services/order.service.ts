import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl = "api/order/";

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private routes: Router
  ) { }

  getWorkerOrders():Observable<any>{
    const headers = new HttpHeaders({"X-Requested-With": "XMLHttpRequest"});
    return this.http.get(this.orderUrl + "worker",{headers}).pipe(
      catchError(this.handleLoginError("worker",[]))
    );
  }

  getManagerOrders():Observable<any>{
    const headers = new HttpHeaders({"X-Requested-With": "XMLHttpRequest"});
    return this.http.get(this.orderUrl + "manager",{headers}).pipe(
      catchError(this.handleLoginError("worker",[]))
    );
  }

  setNextStatus(id:number):Observable<any>{
    return this.http.put(this.orderUrl + "next?id="+id,"").pipe();
  }

  setFreezedStatus(id:number):Observable<any>{
    return this.http.put(this.orderUrl + "freeze", id).pipe();
  }

  setActiveStatus(id:number):Observable<any>{
    return this.http.put(this.orderUrl + "active", id).pipe();
  }

  deleteOrder(id:number):Observable<any>{
    const params = new HttpParams()
    .set("id",id.toString());
    return this.http.delete(this.orderUrl + "delete", {params}).pipe();
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
