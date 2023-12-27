import { SharedService } from 'src/app/services/local/shared.service';
import { AfterViewInit, Component } from '@angular/core';
import { CreateUser } from 'src/app/model/createUser';
import { AdminService } from 'src/app/services/admin.service';
import { Notify } from 'src/app/model/notify';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements AfterViewInit {

  users: User[];

  name: string;
  email: string;
  password: string;
  role:string;

  headerText: string;

  constructor(
    private adminService: AdminService,
    private sharedService:SharedService
  ){
    adminService.getAllWorkers().subscribe((data:User[])=>{
      this.users = data;
    })

    this.headerText = "Создание пользователя";

    this.adminService.subscribeToChanges().subscribe(data=> this.userDeleted(data.body));

  }

  createUser(){
    this.adminService.createuser(new CreateUser(this.name,this.email,this.password,this.role)).subscribe((data)=>{
      console.log();
      this.sharedService.emitPersonPressing("-600");
      this.sharedService.emitAddingNotify(new Notify("Успешно","Пользователь создан","#554339"))
    })
  }

  hidePanel(){
    this.sharedService.emitPersonPressing("-600");
  }

  makeBigger(){
    let panel = document.getElementById("mainCard") as HTMLElement;
    let buttons = document.getElementsByClassName("allBtn")as HTMLCollectionOf<HTMLElement>;
    for(let c=0;c<buttons.length;c++){
       buttons.item(c)!.style.opacity = "0%";
       setTimeout(()=>buttons.item(c)!.style.display = "none",800)
    }

    panel.style.width = "80vw";
    panel.style.height = "800px"

    this.headerText = "Все пользователи";

    let mainPanel = document.getElementById("inputs") as HTMLElement;
    let backBtn = document.getElementById("backBtn") as HTMLElement;
    mainPanel.style.opacity = "0%";
    setTimeout(()=>{
      mainPanel.style.display = "none";
      backBtn.style.display = "inherit";
      setTimeout(()=>backBtn.style.opacity = "100%",10);

      let userPanel = document.getElementById("allWorkers") as HTMLElement;
      userPanel.style.height="";
      userPanel.style.display = "flex";
      setTimeout(()=>userPanel.style.opacity = "100%",10);
    },800)
  }

  mainView(){
    this.headerText = "Создание пользователя";

    let backBtn = document.getElementById("backBtn") as HTMLElement;
    let userPanel = document.getElementById("allWorkers") as HTMLElement;
    let panel = document.getElementById("mainCard") as HTMLElement;

    let buttons = document.getElementsByClassName("allBtn")as HTMLCollectionOf<HTMLElement>;
    let mainPanel = document.getElementById("inputs") as HTMLElement;

    backBtn.style.opacity = "";
    userPanel.style.opacity = "";
    userPanel.style.height="300px";
    setTimeout(()=>{
      backBtn.style.display = "";
      userPanel.style.display = "";
      for(let c=0;c<buttons.length;c++){
        buttons.item(c)!.style.display = "";
        setTimeout(()=>buttons.item(c)!.style.opacity = "",10);
      }
      mainPanel.style.display = "";
      setTimeout(()=>mainPanel.style.opacity = "",10);
    },800);

    panel.style.width = "";
    panel.style.height = "";
  }

  ngAfterViewInit(): void {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown=>{
      const select = dropdown.querySelector(".select") as HTMLElement;
      const caret = dropdown.querySelector(".caret");
      const menu = dropdown.querySelector(".menu") as HTMLElement;
      const options = dropdown.querySelectorAll(".menu li") as NodeListOf<HTMLElement>
      const selected = dropdown.querySelector(".selected") as HTMLElement;

      select?.addEventListener("click",()=>{
      select.classList.toggle('select-clicked');
      caret?.classList.toggle('caret-rotate');
      menu?.classList.toggle('menu-open');

      options.forEach(option=>{
        option.addEventListener('click',()=>{
          selected.innerText = option.innerText;
          this.roleMapper(selected.innerText);
          select.classList.remove('select-clicked');
          caret?.classList.remove('caret-rotate');
          menu.classList.remove('menu-open');
          options.forEach(option=>{
            option.classList.remove('active');
          });
          option.classList.add('active');
        })
      })
    })
    })
  }

  roleMapper(role:string){
    switch(role){
      case 'Мэнеджер':
        this.role = "MANAGER";
        break;
      case 'Работник':
        this.role = "WORKER";
        break;
      case 'Покупатель':
        this.role = "CUSTOMER";
        break;
    }
  }

  deleteUser(id:number){
    this.adminService.messageToDeleteUser(id);
  }

  userDeleted(id:number){
    debugger;
    this.users.splice(this.users.findIndex(element=> element.id == id),1);
    this.sharedService.emitUserDeleting("");
  }
}
