import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../Services/logout.service';
import { BaseURL } from '../model/base/base-url.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  baseurl : BaseURL = new BaseURL();
  constructor(private router: Router, private http: HttpClient){}
  logoutSS: LogoutService = new LogoutService(this.http, this.router);
  logout()
  {
    this.logoutSS.logout(this.baseurl);
  }
}
