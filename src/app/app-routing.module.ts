import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { SalaryComponent } from './Income/salary/salary.component';

const routes: Routes = [
  // homepage route
 { path: '' , component:HomeComponent},
 { path: 'login' , component:LoginComponent},
 { path: 'register' , component:RegisterComponent},
 { path: 'forgotpassword' , component:ForgotpasswordComponent},
 { path: 'income-salary' , component:SalaryComponent},
 { path: '**' , component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//income-salary
