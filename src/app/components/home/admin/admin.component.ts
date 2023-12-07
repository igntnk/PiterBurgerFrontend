import { Component } from '@angular/core';
import '@angular/compiler';
import { AuthService } from '../../../auth/auth.service';
import { AuthGuard } from '../../../auth/auth.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private http: HttpClient) {}


}
