import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls:['./manager.components.css']
})
export class ManagerComponent implements AfterViewInit{

  activeOrders: Order[]=[];
  cookingOrders: Order[]=[];
  cookedOrders: Order[]=[];
  servingOrders: Order[]=[];
  servedOrders: Order[]=[];
  freezedOrders: Order[]=[];

  constructor(
    private orderService: OrderService
  ){
    orderService.getManagerOrders().subscribe(data=>{
      this.mapOrders(data);
    })
  }

  mapOrders(orders: Order[]){
    for(let order of orders){
      switch(order.status){
        case 'ACTIVE':
          order.status = "Поступил";
          order.statusColor = "#403955";
          order.nextStatus = "Начать готовить";
          this.activeOrders.push(order);
          break;
        case 'COOKING':
          order.status = "В готовке";
          order.statusColor = "#5e5043";
          order.nextStatus = "Закончить готовку";
          this.cookingOrders.push(order);
          break;
        case 'COOKED':
          order.status = "Ждет сборки";
          order.statusColor = "#435e57";
          order.nextStatus = "Собрать";
          this.cookedOrders.push(order);
          break;
        case 'SERVING':
          order.status = "В сборке";
          order.statusColor = "#5c8261";
          order.nextStatus = "Закончить сборку";
          this.servingOrders.push(order);
          break;
        case 'SERVED':
          order.status = "Готов";
          order.statusColor = "#76ab6f";
          order.nextStatus = "Выдать";
          this.servedOrders.push(order);
          break;
        case 'FREEZE':
          order.status = "Заморожен";
          order.statusColor = "#78b0bf";
          order.nextStatus = "Разморозить";
          this.freezedOrders.push(order);
          break;
      }
    }
  }

  setDraggable(data:Order[],name:string): void {
    let index = 0;
    for(let order of data){
      let panel = document.getElementById(name+index) as HTMLElement;
      panel.onmousedown = function(event){
        let panelParent = panel.parentElement as HTMLElement;

        let panelClone = panel.cloneNode(true) as HTMLElement;
        panelClone.style.width="180px";
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

        function copyPos(shiftX: number, shiftY: number) {
          panelClone.style.left =  shiftX + 'px';
          panelClone.style.top = shiftY + 'px';
        }

        let currentDroppable:HTMLElement;
        let elemBelow:HTMLElement;

        function onMouseMove(event:MouseEvent) {
          moveAt(event.pageX, event.pageY);

          panelClone.hidden = true;
          elemBelow = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
          panelClone.hidden = false

          if (!elemBelow) return;

          let droppableBelow = elemBelow.closest('.container') as HTMLElement;

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
          elem.style.scale = "105%";
          elem.style.background='#FFE3CA';
        }

        document.addEventListener('mousemove', onMouseMove);

        panelClone.onmouseup = function() {
          if (currentDroppable != panelParent) {
            panel.style.position='';
            currentDroppable.style.height = currentDroppable.scrollHeight + 'px';
            panelParent.style.height = panelParent.scrollHeight + 'px';
            debugger;
            if(currentDroppable.scrollHeight < 700){
              if(currentDroppable.scrollHeight < panel.scrollHeight){
                currentDroppable.style.height = panel.scrollHeight + 20 + 'px';
              }
              else{
                currentDroppable.style.height = currentDroppable.scrollHeight +
                panel.scrollHeight + 'px';
              }
            }

            if(panelParent.scrollHeight > 200){
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
              panel.style.opacity = "100%";
            },400);
          }
          else{
            panelClone.style.left = panel.getBoundingClientRect().left.toString() +'px';
            panelClone.style.top = panel.getBoundingClientRect().top.toString()+'px';
            setTimeout(()=>{
              panelClone.remove();
              panel.style.opacity = "100%";
            },400);
          }
          document.removeEventListener('mousemove', onMouseMove);
          panel.onmouseup = null;
        };
      }
      index++;
    }
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.setDraggable(this.activeOrders,"active");
      this.setDraggable(this.cookingOrders,"cooking");
      this.setDraggable(this.cookedOrders,"cooked");
      this.setDraggable(this.servingOrders,"serving");
      this.setDraggable(this.servedOrders,"served");
      this.setDraggable(this.freezedOrders,"freezed");
    },100);
  }

}
