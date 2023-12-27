import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from '../model/createUser';
import { Observable } from 'rxjs';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminUrl="/api/admin/";

  constructor(
    private http: HttpClient,
    private ws: WebSocketService
  ) { }

  createuser(user: CreateUser):Observable<any>{
    return this.http.post(this.adminUrl+"create",user).pipe();
  }

  getAllWorkers():Observable<any>{
    return this.http.get(this.adminUrl+"workers").pipe();
  }

  messageToDeleteUser(id:number){
    this.ws.publish({destination:"/delete",body:id.toString()});
  }

  subscribeToChanges():Observable<any>{
    return this.ws.watch("/order/admin").pipe();
  }

}
