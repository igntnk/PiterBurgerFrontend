import { CookieService } from 'ngx-cookie-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthGuard } from '../../../auth/auth.guard';
import { AuthService } from '../../../auth/auth.service';
import { Credential } from '../../../model/credential';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import '@angular/compiler';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  credential!: Credential;
  errorAuth!: boolean;

    constructor(private cookie: CookieService, private authService: AuthService) {}

    ngOnInit(){
        this.authService.clearLoginData();
        this.credential = new Credential();
        this.authService.logoutWithoutRedirect();
    }

    login(){
      this.authService.authenticate(this.credential, () => {
          this.errorAuth = true;
      })
    }
}
