import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/home/login/login.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { CustomerComponent } from './components/home/customer/customer.component';
import { ManagerComponent } from './components/home/manager/manager.component';
import { WorkerComponent } from './components/home/worker/worker.component';
import { CustomerMainComponent } from './components/home/customer/customer-main/customer-main.component';
import { CustomerPersonComponent } from './components/home/customer/customer-person/customer-person.component';

const routes: Routes = [{
  path:'',
  redirectTo: 'customer/main',
  pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title:"Вход в PiterBurger"
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[AuthGuard],
    title:"Админ Бургерной"
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate:[AuthGuard],
    title:"Менеджер Бургерной"
  },
  {
    path: 'worker',
    component: WorkerComponent,
    canActivate:[AuthGuard],
    title:"Работник бургерной"
  },
  {
    path:'customer',
    component:CustomerComponent,
    title:"PiterBurger",
    children: [
      {
        path: 'main',
        component: CustomerMainComponent
      },
      {
        path: 'person',
        component: CustomerPersonComponent,
        canActivate:[AuthGuard],
        title:"Личный кабинет"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
