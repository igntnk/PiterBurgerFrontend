import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/home/login/login.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { CustomerComponent } from './components/home/customer/customer.component';
import { ManagerComponent } from './components/home/manager/manager.component';
import { WorkerComponent } from './components/home/worker/worker.component';
import { CustomerProfileComponent } from './components/home/customer/customer-profile/customer-profile.component';
import { CustomerMainComponent } from './components/home/customer/customer-main/customer-main.component';

const routes: Routes = [{
  path:'',
  component: CustomerComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'worker',
    component: WorkerComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'customer',
    component:CustomerComponent,
    children: [
      {
        path: 'profile',
        component: CustomerProfileComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'main',
        component: CustomerMainComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
