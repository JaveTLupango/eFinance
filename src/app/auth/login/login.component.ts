import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/shared/model/login.model';
import { BaseURL } from 'src/app/shared/model/base/base-url.model';
import { LoginServiceService } from 'src/app/shared/Services/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private router: Router, private http: HttpClient){}

  appC : AppComponent = new AppComponent(this.router);
  loginService : LoginServiceService = new LoginServiceService(this.http);
  formValueLogin : Login = new Login;
  baseURL : BaseURL = new BaseURL;
  email: string = '';
  password: string = '';

  ngOnInit()
  {    
    var isLogin = this.appC.isLogin;        
    console.log(isLogin);
    if(isLogin)
    {
      this.router.navigate(['/home']);
    }
  }

  onSubmit()
  {
    console.log(this.email);
    console.log(this.password);
    this.formValueLogin.email = this.email;
    this.formValueLogin.password = this.password;
    
    this.loginService.login(this.formValueLogin, this.baseURL).subscribe(
      data =>
      {
        console.log(data);
      }
    );
    
  }

}
