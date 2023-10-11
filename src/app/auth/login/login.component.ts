import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login } from 'src/app/shared/model/login.model';
import { BaseURL } from 'src/app/shared/model/base/base-url.model';
import { LoginServiceService } from 'src/app/shared/Services/login-service.service';
import Swal from 'sweetalert2';
import { Users } from 'src/app/shared/model/user/users.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private http: HttpClient){}

  appC : AppComponent = new AppComponent(this.router, this.http);
  loginService : LoginServiceService = new LoginServiceService(this.http);
  formValueLogin : Login = new Login;
  baseURL : BaseURL = new BaseURL;
  email: string = '';
  password: string = '';
  userModel : Users = new Users();

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
        if(data.StatusCode == 200)
        {
          debugger;
          console.log(data);
          localStorage.setItem('Login', data);
          localStorage.setItem('AuthToken', data.token);
          this.userModel = data.data;          
          localStorage.setItem('UserInfo', JSON.stringify(this.userModel));
          localStorage.setItem('UserId', data.data.id);
          localStorage.setItem('UserRole', data.data.user_role);

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You are successfully login!',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['']);
        }
        else{
            localStorage.clear();
            Swal.fire(
              'Login Failed!',
              data.message,
              'warning'
            )
        }
      },
      (error: HttpErrorResponse) => {
        Swal.fire(
          'Login Failed!',
          error.message,
          'warning'
        )
      }
    );

  }

}
