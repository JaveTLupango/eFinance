import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../Services/logout.service';
import { BaseURL } from '../model/base/base-url.model';
import { AppComponent } from 'src/app/app.component';
import { Users } from '../model/user/users.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  baseurl : BaseURL = new BaseURL();
  constructor(private router: Router, private http: HttpClient){

  } 

  UserModel : Users = new Users();
  appC : AppComponent = new AppComponent(this.router, this.http);
  logoutSS: LogoutService = new LogoutService(this.http, this.router);
  sideBarHS : boolean = true;

  ngOnInit()
  {
    this.UserModel = this.appC.UserModel;
  }

  logout()
  {
    this.logoutSS.logout(this.baseurl)
    .then(response => response.text())
    .then(result => {
      console.log(result);        
      localStorage.clear(); 
        Swal.fire(
              'User Logout!',
              "Users successfully logout",
              'success'
            );            
            window.location.reload();
    }  
    )
    .catch(error => {
      console.log('error', error);
      Swal.fire(
              'Login Failed!',
              error.message,
              'warning'
            )
    }); ;
    
  }
}
