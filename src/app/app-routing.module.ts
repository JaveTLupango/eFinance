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
import { UserSavingsComponent } from './Banking/user-savings/user-savings.component';
import { UsersLoansComponent } from './Banking/users-loans/users-loans.component';
import { UserCreateSavingsRequestComponent } from './Banking/user-create-savings-request/user-create-savings-request.component';
import { UsersCreateLoanRequestComponent } from './Banking/users-create-loan-request/users-create-loan-request.component';
import { UserLoanInfoComponent } from './Banking/user-loan-info/user-loan-info.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { ActiveUsersComponent } from './users/active-users/active-users.component';
import { BlockUsersComponent } from './users/block-users/block-users.component';
import { DeletedUsersComponent } from './users/deleted-users/deleted-users.component';
import { AdminLoanMonitoringComponent } from './Banking/admin-loan-monitoring/admin-loan-monitoring.component';
import { UserLoanTermDetailsComponent } from './Banking/user-loan-term-details/user-loan-term-details.component';
import { FundDashboardComponent } from './Banking/Fund/fund-dashboard/fund-dashboard.component';
import { RulesOfHundredComponent } from './systemAdmin/rules-of-hundred/rules-of-hundred.component';
import { BasePageComponent } from './shared/base-page/base-page.component';
import { PenaltyComponent } from './systemAdmin/penalty/penalty/penalty.component';
import { FundTransactionComponent } from './Banking/Fund/fund-transaction/fund-transaction.component';

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
 { path: 'user-savings' , component:UserSavingsComponent},
 { path: 'user-loans' , component:UsersLoansComponent},
 { path: 'user-create-savings' , component:UserCreateSavingsRequestComponent},
 { path: 'user-create-loans' , component:UsersCreateLoanRequestComponent},
 { path: 'user-loan-info' , component:UserLoanInfoComponent},
 { path: 'user-loan-term-details' , component:UserLoanTermDetailsComponent},
 { path: 'all-users' , component:AllUsersComponent},
 { path: 'users' , component:ActiveUsersComponent},
 { path: 'block-users' , component:BlockUsersComponent},
 { path: 'deleted-users' , component:DeletedUsersComponent},
 { path: 'loan-monitoring' , component:AdminLoanMonitoringComponent},
 { path: 'fund-dashboard' , component:FundDashboardComponent},
 { path: 'rules-hundred' , component:RulesOfHundredComponent},
 { path: 'base-page' , component:BasePageComponent},
 { path: 'penalty' , component:PenaltyComponent},
 { path: 'transaction' , component:FundTransactionComponent},




//  { path: 'system-settings' , component:},

 { path: '**' , component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//system-settings
