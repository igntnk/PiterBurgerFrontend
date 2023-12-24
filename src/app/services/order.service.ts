import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { Observable, catchError, of } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import { Order } from '../model/order';
import { SharedService } from './local/shared.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl = "api/order/";

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private sharedService: SharedService,
    private ws: WebSocketService,
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
      catchError(this.handleLoginError("manager",[]))
    );
  }

  subscribeToManagerOrders():Observable<any>{
    return this.ws.watch("/order/manager").pipe();
  }

  subscribeToWorkerOrders():Observable<any>{
    return this.ws.watch("/order/worker").pipe();
  }

  messageToNext(id: number){
    this.ws.publish({destination: "/next", body: id.toString()});
  }

  messageToFreeze(id:number){
    this.ws.publish({destination:"/freeze",body:id.toString()});
  }

  messageToActive(id:number){
    this.ws.publish({destination:"/active",body:id.toString()});
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

  mapOrders(orders: Order[]):Order[]{
    for(let order of orders){
      switch(order.status){
        case 'ACTIVE':
          order.status = "Поступил";
          order.statusColor = "#403955";
          order.nextStatus = "Начать готовить";
          break;
        case 'COOKING':
          order.status = "В готовке";
          order.statusColor = "#5e5043";
          order.nextStatus = "Закончить готовку";
          break;
        case 'COOKED':
          order.status = "Ждет сборки";
          order.statusColor = "#435e57";
          order.nextStatus = "Собрать";
          break;
        case 'SERVING':
          order.status = "В сборке";
          order.statusColor = "#5c8261";
          order.nextStatus = "Закончить сборку";
          break;
        case 'SERVED':
          order.status = "Готов к выдаче";
          order.statusColor = "#76ab6f";
          order.nextStatus = "Выдать";
          break;
        case 'FREEZE':
          order.status = "Заморожен";
          order.statusColor = "#78b0bf";
          order.nextStatus = "Разморозить";
          break;
      }
    }
    return orders;
  }

  private handleLoginError<T>(lastUrl = '/cutomer/main', result?: T) {
    return (error: any): Observable<T> => {
      if(error.status === 401) {
        this.sessionStorage.set("lastUrl",lastUrl);
        this.routes.navigateByUrl("/login");
      }
      else if(error.status === 404){
        console.log("404");
      }
      else if(error.status === 500){
        console.log("500");
      }
      return of(result as T);
    };
  }
}
