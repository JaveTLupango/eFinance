import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { SalaryComponent } from './Income/salary/salary.component';
import { BillingComponent } from './Expenses/billing/billing.component';
import { TransfortationComponent } from './Expenses/transfortation/transfortation.component';
import { OtherExpComponent } from './Expenses/other-exp/other-exp.component';
import { InvestPropertyComponent } from './InvestSavings/invest-property/invest-property.component';
import { InvestInsuranceComponent } from './InvestSavings/invest-insurance/invest-insurance.component';
import { EmergencyFundComponent } from './InvestSavings/emergency-fund/emergency-fund.component';

const routes: Routes = [
  // homepage route
 { path: '' , component:HomeComponent},
 { path: 'login' , component:LoginComponent},
 { path: 'register' , component:RegisterComponent},
 { path: 'forgotpassword' , component:ForgotpasswordComponent},
 { path: 'income-salary' , component:SalaryComponent},
 { path: 'expenses-billing' , component:BillingComponent},
 { path: 'expenses-transportation' , component:TransfortationComponent},
 { path: 'others-expenses' , component:OtherExpComponent},
 { path: 'invest-property' , component:InvestPropertyComponent},
 { path: 'invest-insurance' , component:InvestInsuranceComponent},
 { path: 'emergency-fund' , component:EmergencyFundComponent},



//  { path: 'system-settings' , component:},

 { path: '**' , component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//system-settings
