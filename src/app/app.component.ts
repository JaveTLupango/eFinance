import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Users } from './shared/model/user/users.model';
import { JsonPipe } from '@angular/common';
import { LogoutService } from './shared/Services/logout.service';
import { BaseURL } from './shared/model/base/base-url.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eFinanceUI';
  isLogin : boolean = false;
  isHeaderShow  : boolean = false;
  isNavShow : boolean = false;
  UserModel : Users = new Users();
  baseurl : BaseURL = new BaseURL();
  sideBarHS : boolean = false;

  constructor(private router: Router, private http: HttpClient)
  {
    console.log(localStorage.getItem('AuthToken'));
    console.log(localStorage.getItem('UserInfo'));
    console.log(localStorage.getItem('UserRole'));
    var um  = localStorage.getItem('UserInfo');
    let um2 = JSON.parse(JSON.stringify(um));
    this.UserModel = JSON.parse(um2);

      router.events.subscribe((val)=>
      {
        if(val instanceof NavigationEnd)
        {
          if(val.url == '/login' || val.url == '/register')
          {
            this.isHeaderShow = false;
          }
          else
          {
            this.isHeaderShow = true;
            if(localStorage.getItem('AuthToken') != null)
            {
              this.isLogin = true;
            }
            else
            {
              this.isLogin = false;
            }

            if(localStorage.getItem('AuthToken') === null)
            {
              this.router.navigate(['/login']);
            }
          }


        }
      }
      );
  }

  logoutSS: LogoutService = new LogoutService(this.http, this.router);

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
      Swal.fire(
              'Login Failed!',
              error.message,
              'warning'
            )
    }); ;

  }

  sidebarHideShow()
  {
    if(this.sideBarHS)
    {
      this.sideBarHS = false;
    }
    else
    {
      this.sideBarHS = true;
    }
    console.log(this.sideBarHS);
  }

}
