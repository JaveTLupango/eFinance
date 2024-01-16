import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { MfaVerificationComponent } from './auth/mfa-verification/mfa-verification.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { SystemMaintinanceComponent } from './error/system-maintinance/system-maintinance.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { SalaryComponent } from './Income/salary/salary.component';
import { BillingComponent } from './Expenses/billing/billing.component';
import { TransfortationComponent } from './Expenses/transfortation/transfortation.component';
import { InvestPropertyComponent } from './InvestSavings/invest-property/invest-property.component';
import { InvestInsuranceComponent } from './InvestSavings/invest-insurance/invest-insurance.component';
import { EmergencyFundComponent } from './InvestSavings/emergency-fund/emergency-fund.component';
import { OtherExpComponent } from './Expenses/other-exp/other-exp.component';
import { SystemSettingsComponent } from './systemAdmin/system-settings/system-settings.component';
import { AccessPolicyComponent } from './systemAdmin/access-policy/access-policy.component';
import { ListOfUsersComponent } from './systemAdmin/list-of-users/list-of-users.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserSavingsComponent } from './Banking/user-savings/user-savings.component';
import { UserCreateSavingsRequestComponent } from './Banking/user-create-savings-request/user-create-savings-request.component';
import { UsersLoansComponent } from './Banking/users-loans/users-loans.component';
import { UsersCreateLoanRequestComponent } from './Banking/users-create-loan-request/users-create-loan-request.component';
import { UserDashboardComponent } from './Banking/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { UserLoanInfoComponent } from './Banking/user-loan-info/user-loan-info.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { ActiveUsersComponent } from './users/active-users/active-users.component';
import { DeletedUsersComponent } from './users/deleted-users/deleted-users.component';
import { BlockUsersComponent } from './users/block-users/block-users.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    MfaVerificationComponent,
    PageNotFoundComponent,
    SystemMaintinanceComponent,
    SidebarComponent,
    HeaderComponent,
    SalaryComponent,
    BillingComponent,
    TransfortationComponent,
    InvestPropertyComponent,
    InvestInsuranceComponent,
    EmergencyFundComponent,
    OtherExpComponent,
    SystemSettingsComponent,
    AccessPolicyComponent,
    ListOfUsersComponent,
    UserSavingsComponent,
    UserCreateSavingsRequestComponent,
    UsersLoansComponent,
    UsersCreateLoanRequestComponent,
    UserDashboardComponent,
    DashboardComponent,
    UserLoanInfoComponent,
    AllUsersComponent,
    ActiveUsersComponent,
    DeletedUsersComponent,
    BlockUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
