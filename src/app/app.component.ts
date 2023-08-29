import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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

  constructor(private router: Router)
  {
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
          }
        }
      }
      );
  }

}
