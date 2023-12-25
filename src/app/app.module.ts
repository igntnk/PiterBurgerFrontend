import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule} from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule} from '@angular/material/divider';
import { MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotifierModule } from 'angular-notifier';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionStorageService } from 'angular-web-storage';
import { LoginComponent } from './components/home/login/login.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { CookieService } from 'ngx-cookie-service';
import { WorkerComponent } from './components/home/worker/worker.component';
import { CustomerComponent } from './components/home/customer/customer.component';
import { ManagerComponent } from './components/home/manager/manager.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/home/customer/customer-main/sidebar/sidebar.component';
import { BucketComponent } from './components/home/customer/customer-main/bucket/bucket.component';
import { CustomerMainComponent } from './components/home/customer/customer-main/customer-main.component';
import { GroupsComponent } from './components/home/customer/customer-main/sidebar/groups/groups.component';
import { ProductsComponent } from './components/home/customer/customer-main/products/products.component';
import { ProductCardComponent } from './components/home/customer/customer-main/product-card/product-card.component';
import { OrderProductComponent } from './components/home/customer/customer-main/bucket/order-product/order-product.component';
import { PaginatorControllComponent } from './components/home/customer/customer-main/paginator-controll/paginator-controll.component';
import { CustomerPersonComponent } from './components/home/customer/customer-person/customer-person.component';
import { NotifyContainerComponent } from './components/notify-container/notify-container.component';
import { OrderComponent } from './components/home/order/order.component';
import { WebSocketService} from './services/web-socket.service';
import { WebSocketConfig } from './auth/config/web-scoket-config';
import { SearchComponent } from './components/home/customer/customer-main/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    WorkerComponent,
    CustomerComponent,
    ManagerComponent,
    HeaderComponent,
    SidebarComponent,
    BucketComponent,
    CustomerMainComponent,
    GroupsComponent,
    ProductsComponent,
    ProductCardComponent,
    OrderProductComponent,
    PaginatorControllComponent,
    CustomerPersonComponent,
    OrderComponent,
    NotifyContainerComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatBadgeModule,
    MatMenuModule,
    RouterLink,
    MatSidenavModule,
    NotifierModule,
    DragDropModule,
    CdkDrag,
    CdkDropList,
    NgbModule
  ],
  providers: [
    SessionStorageService,
    {
      provide : WebSocketService,
      useFactory: ()=>{
          const service = new WebSocketService();
          service.configure(WebSocketConfig);
          service.activate();
          return service;
      }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
