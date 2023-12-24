import { WebSocketService } from './../../../services/web-socket.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { Subscription, map, share } from 'rxjs';
import { Order } from 'src/app/model/order';
import { SharedService } from 'src/app/services/local/shared.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls:['./manager.components.css']
})
export class ManagerComponent implements AfterViewInit,OnInit,OnDestroy{

  activeOrders: Order[]=[];
  cookingOrders: Order[]=[];
  cookedOrders: Order[]=[];
  servingOrders: Order[]=[];
  servedOrders: Order[]=[];
  freezedOrders: Order[]=[];

  private topicSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private sharedService: SharedService
  ){
    orderService.getManagerOrders().subscribe(data=>{
      this.maptToDrag(this.orderService.mapOrders(data));
    })

  }

  maptToDrag(orders: Order[]){
    for(let order of orders){
      switch(order.status){
        case 'Поступил':
          order.nextStatus = "Начать готовить";
          this.activeOrders.push(order);
          this.setDraggable(order,"active"+this.activeOrders.indexOf(order),this.orderService);
          break;
        case 'В готовке':
          this.cookingOrders.push(order);
          this.setDraggable(order,"cooking"+this.cookingOrders.indexOf(order),this.orderService);
          break;
        case 'Ждет сборки':
          this.cookedOrders.push(order);
          this.setDraggable(order,"cooked"+this.cookedOrders.indexOf(order),this.orderService);
          break;
        case 'В сборке':
          this.servingOrders.push(order);
          this.setDraggable(order,"serving"+this.servingOrders.indexOf(order),this.orderService);
          break;
        case 'Готов к выдаче':
          this.servedOrders.push(order);
          this.setDraggable(order,"served"+this.servedOrders.indexOf(order),this.orderService);
          break;
        case 'Заморожен':
          this.freezedOrders.push(order);
          this.setDraggable(order,"freeze"+this.freezedOrders.indexOf(order),this.orderService);
          break;
      }
    }
  }

  setDraggable(data:Order,name:string,orderService: OrderService): void {
    setTimeout(()=>{
      let panel = document.getElementById(name) as HTMLElement;
      let freezed = document.getElementById("freezedId");
      let active = document.getElementById("activeId");
      panel.onmousedown = function(event){

        let panelParent = panel.parentElement as HTMLElement;

        let panelClone = panel.cloneNode(true) as HTMLElement;
        panelClone.style.width="280px";
        panel.style.opacity = "0%";

        panelClone.style.position = 'absolute';
        panelClone.style.zIndex = '100';
        document.body.append(panelClone);

        let shiftX = event.clientX - panel.getBoundingClientRect().left;
        let shiftY = event.clientY - panel.getBoundingClientRect().top;


        moveAt(event.pageX, event.pageY);

        function moveAt(pageX: number, pageY: number) {
          panelClone.style.left = pageX - shiftX + 'px';
          panelClone.style.top = pageY - shiftY + 'px';
        }

        let currentDroppable:HTMLElement;
        let elemBelow:HTMLElement;

        function onMouseMove(event:MouseEvent) {
          moveAt(event.pageX, event.pageY);

          panelClone.hidden = true;
          elemBelow = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
          panelClone.hidden = false

          if (!elemBelow) return;
          let droppableBelow = elemBelow.closest('.'+name.slice(0,-1)) as HTMLElement;

          if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
              enterDroppable(currentDroppable);
            }
          }
        }

        function leaveDroppable(elem:HTMLElement){
          elem.style.scale = "100%";
          elem.style.background='';
        }

        function enterDroppable(elem:HTMLElement){
          elem.style.background='#FFE3CA';
        }

        document.addEventListener('mousemove', onMouseMove);

        panelClone.onmouseup = function() {
          if (currentDroppable != panelParent && currentDroppable) {
            if(currentDroppable == freezed){
              orderService.messageToFreeze(data.id);
            }
            else if(currentDroppable == active){
              orderService.messageToActive(data.id);
            }
            else{
              orderService.messageToNext(data.id);
            }
            currentDroppable.style.height = currentDroppable.scrollHeight + 'px';
            panelParent.style.height = panelParent.scrollHeight + 'px';
            if(currentDroppable.scrollHeight < 700){
              if(currentDroppable.scrollHeight == 200){
                currentDroppable.style.height = panel.scrollHeight + 20 + 'px';
              }
              else{
                currentDroppable.style.height = currentDroppable.scrollHeight +
                panel.scrollHeight + 'px';
              }
            }


            if(panelParent.scrollHeight > 200 && panelParent.scrollHeight<700){
              if(panelParent.scrollHeight - panel.scrollHeight < 200){
                panelParent.style.height = "200px";
              }
              else{
                panelParent.style.height = panelParent.scrollHeight -
              panel.scrollHeight + 'px';
              }
            }
            else{
              panelParent.style.height = panelParent.scrollHeight -
              panel.scrollHeight + 'px';
            }

            currentDroppable.append(panel);
            currentDroppable.style.scale = "100%";
            currentDroppable.style.background = "";
            panelClone.style.left = panel.getBoundingClientRect().left.toString() +'px';
            panelClone.style.top = panel.getBoundingClientRect().top.toString()+'px';
            setTimeout(()=>{
              panelClone.remove();
              panel.remove();
            },800);
          }
          else{
            panelClone.style.left = panel.getBoundingClientRect().left.toString() +'px';
            panelClone.style.top = panel.getBoundingClientRect().top.toString()+'px';
          }
          setTimeout(()=>{
            panelClone.remove();
            panel.style.opacity = "100%";
          },800);


          document.removeEventListener('mousemove', onMouseMove);
          currentDroppable.style.background = '';
        };

      };
    },100);
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.topicSubscription = this.orderService.subscribeToManagerOrders().subscribe(data=>{
      let order = (JSON.parse(data.body)) as Order;
      setTimeout(()=>this.maptToDrag(this.orderService.mapOrders([order])),500);
    })
  }

  ngOnDestroy() {

  }


}
