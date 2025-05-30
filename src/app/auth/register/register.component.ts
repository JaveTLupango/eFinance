import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RegisterServiceService } from 'src/app/shared/Services/register-service.service';
import { BaseURL } from 'src/app/shared/model/base/base-url.model';
import { RegisterModel } from 'src/app/shared/model/register/register-model.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, private http: HttpClient){}
  appC : AppComponent = new AppComponent(this.router, this.http);
  registerModel : RegisterModel = new RegisterModel();
  RegisterSS : RegisterServiceService = new  RegisterServiceService(this.http);
  baseurl : BaseURL = new BaseURL()

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
    console.log(this.registerModel);
    if(this.registerModel.acceptTerms)
    {
      this.RegisterSS.register(this.registerModel, this.baseurl).subscribe(
        {
          next : (data) =>
            {
              console.log(data);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successfully registered!. Please verify your email!',
                showConfirmButton: true,               
              })
            },
            error(e:any)
            {
              console.log(e);
            }
        }
      );
    }
    else
    {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Please read and accept the terms and conditions!',
        showConfirmButton: false,
        timer: 2000
      })
    }

  }
}
