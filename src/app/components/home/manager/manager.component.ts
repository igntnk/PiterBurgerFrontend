import { WebSocketService } from './../../../services/web-socket.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { Subscription, map, share } from 'rxjs';
import { Notify } from 'src/app/model/notify';
import { Order } from 'src/app/model/order';
import { SharedService } from 'src/app/services/local/shared.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls:['./manager.components.css']
})
export class ManagerComponent implements OnInit{

  activeOrders: Order[]=[];
  cookingOrders: Order[]=[];
  cookedOrders: Order[]=[];
  servingOrders: Order[]=[];
  servedOrders: Order[]=[];
  freezedOrders: Order[]=[];

  private topicSubscription: Subscription;

  showNotice:boolean;

  constructor(
    private orderService: OrderService,
    private sharedService: SharedService
  ){
    orderService.getManagerOrders().subscribe(data=>{
      this.mapToDrag(this.orderService.mapOrders(data));
    })

    sharedService.userDeletedEvent.subscribe(()=>{
      this.activeOrders=[];
      this.cookingOrders=[];
      this.cookedOrders=[];
      this.servingOrders=[];
      this.servedOrders=[];
      this.freezedOrders=[];
      orderService.getManagerOrders().subscribe(data=>{
        this.mapToDrag(this.orderService.mapOrders(data));
      })
    })

  }

  mapToDrag(orders: Order[]){
    for(let order of orders){
      switch(order.status){
        case 'Поступил':
          order.nextStatus = "Начать готовить";
          this.activeOrders.push(order);
          this.setDraggable(order,"active"+this.activeOrders.indexOf(order),this.orderService);
          this.showNotice?this.sharedService.emitAddingNotify(new Notify("Внимание","Появился новый заказ","#403955")):null;
          this.showNotice = false;
          break;
        case 'В готовке':
          this.cookingOrders.push(order);
          this.setDraggable(order,"cooking"+this.cookingOrders.indexOf(order),this.orderService);
          this.showNotice?this.sharedService.emitAddingNotify(new Notify("Успешно","Заказ в статусе готовки","#5e5043")):null;
          this.showNotice = false;
          break;
        case 'Ждет сборки':
          this.cookedOrders.push(order);
          this.setDraggable(order,"cooked"+this.cookedOrders.indexOf(order),this.orderService);
          this.showNotice?this.sharedService.emitAddingNotify(new Notify("Успешно","Заказ ждет сборки","#435e57")):null;
          this.showNotice = false;
          break;
        case 'В сборке':
          this.servingOrders.push(order);
          this.setDraggable(order,"serving"+this.servingOrders.indexOf(order),this.orderService);
          this.showNotice?this.sharedService.emitAddingNotify(new Notify("Успешно","Заказ в сборке","#5c8261")):null;
          this.showNotice = false;
          break;
        case 'Готов к выдаче':
          this.servedOrders.push(order);
          this.setDraggable(order,"served"+this.servedOrders.indexOf(order),this.orderService);
          this.showNotice?this.sharedService.emitAddingNotify(new Notify("Успешно","Заказ готов к выдаче","#76ab6f")):null;
          this.showNotice = false;
          break;
        case 'Заморожен':
          this.freezedOrders.push(order);
          this.setDraggable(order,"freeze"+this.freezedOrders.indexOf(order),this.orderService);
          this.showNotice?this.sharedService.emitAddingNotify(new Notify("Успешно","Заказ заморожен","#78b0bf")):null;
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
        panelClone.style.width= panel.scrollWidth.toString() + "px";
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
          elem.style.scale = "102%";
          elem.style.background='#FFE3CA';
        }

        function setCurrentPos(){
          panelClone.style.left = panel.getBoundingClientRect().left + 1 +'px';
          panelClone.style.top = panel.getBoundingClientRect().top + 1 +'px';
        }

        function setDefaultDropable(){
          currentDroppable.append(panel);
          currentDroppable.style.scale = "100%";
          currentDroppable.style.background = "";
        }

        function hideCloneShowMain(){
          setTimeout(()=>{
            panelClone.remove();
            panel.style.opacity = "";
          },800);
        }

        document.addEventListener('mousemove', onMouseMove);

        panelClone.onmouseup = function() {
          orderService.subscribeToManagerOrders().subscribe(()=>{
            setTimeout(()=>{
              panelClone.remove();
              panel.remove();
            },800);
          })

          let statusPanel = panelClone.querySelector('.status') as HTMLElement;

          if (currentDroppable != panelParent && currentDroppable) {
            setDefaultDropable();
            statusPanel.style.scale = "70%";
            statusPanel.style.opacity = "0";
            if(currentDroppable == freezed){
              orderService.messageToFreeze(data.id);
            }
            else if(currentDroppable == active){
              orderService.messageToActive(data.id);
            }
            else{
              orderService.messageToNext(data.id);
            }
          }
          else if(currentDroppable == panelParent){
            setDefaultDropable();
            currentDroppable.style.scale = "";
            hideCloneShowMain();
          }
          else{
            hideCloneShowMain();
          }

          setCurrentPos();
          document.removeEventListener('mousemove', onMouseMove);
        };

      };
    },100);
  }

  ngOnInit(): void {
    this.topicSubscription = this.orderService.subscribeToManagerOrders().subscribe(data=>{
      let order = (JSON.parse(data.body)) as Order;
      setTimeout(()=>{
        this.showNotice = true;
        this.mapToDrag(this.orderService.mapOrders([order]));
      },800);
    })
  }




}
