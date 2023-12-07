import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Groups } from 'src/app/model/groups';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements AfterViewInit {

  customerUrl = "/api/customer";

  constructor(
    private titleService:Title,
    private http: HttpClient
    ){
    this.titleService.setTitle("PiterBurger");

  }

  ngAfterViewInit(){
    this.http.get(this.customerUrl+"/groups").subscribe((response:any) =>{
      let divGroups = document.getElementById("groups");
      let innerString = "";
      let styleString =
      "font-family: Lora;"+
      "background-color: #403955;"+
      "color:#FFE3CA;"+
      "width: 220px;"+
      "height: 60px;"+
      "border-radius: 12px;"+
      "border: 0px;"+
      "margin: 0 auto 16px;"+
      "line-height: 60px;"+
      "box-shadow: 0 4px 15px 1px rgba(0,0,0,.25);"+
      "display: grid;"

      response.forEach((element: string) => {
        innerString +=
        "<button type='button' class ='group' style ='"+styleString+"'>"+element+"</button>";
      });
      divGroups? divGroups.innerHTML = innerString:"";
    });

  }

}
