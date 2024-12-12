import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoanRequestService } from 'src/app/shared/Services/bank/loan/loan-request.service';
import { AccountLoansRequest } from 'src/app/shared/model/AcountLoansRequest/account-loans-request.model';
import { LoanContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
import { LoanDetails } from 'src/app/shared/model/bank/loan/LoanDetails/loan-details.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  constructor (public datepipe: DatePipe, private router: Router, private http: HttpClient) {}

  loanDetails : LoanDetails = new LoanDetails();
  listLoanAccount : AccountLoansRequest[] = [];
  loanInfo : AccountLoansRequest = new AccountLoansRequest();
  loanContributionBreakDown : LoanContributionBreakDown[] = [];
  service : LoanRequestService = new LoanRequestService(this.http);
  role : any = localStorage.getItem('UserRole');
  userRole : boolean= false;
  totalAmountDue : number = 0;
  totalAmountPaid : number = 0;
  dateNow : Date = new Date();
  monthNow: string = '';


  ngOnInit()
  {
    this.userRole = this.role == 1 ? true : false; // true admin, false user
    this.monthNow = this.dateNow.toLocaleString('default', { month: 'long' });

    this.service.getLoanAccountByUser().subscribe({
      next: (data) =>
        {
          if(data.status_code == 200)
          {
            this.loanDetails.list_of_account = data.list_of_account;
            this.loanDetails.loan_count = data.loan_count;
            this.loanDetails.total_loan_amount = data.total_loan_amount;
            this.listLoanAccount = data.list_of_account;
          }
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
            console.log('complete');
            this.getDueAmountForThisMonth();
            this.getPaidAmountForThisMonth();
        }
    });
  }

  getDueAmountForThisMonth()
  {
    var a = new Date();
    var monthNow = a.getMonth();

    this.listLoanAccount.forEach(e => {
        e.loan_logs.forEach( i =>
          {
            var month = new Date(i.due_date).getMonth();
            if(!Boolean(i.is_paid) && month == monthNow)
            {
              this.totalAmountDue =  Number( this.totalAmountDue) + Number(i.amount)
            }
          });
    });
  }

  getPaidAmountForThisMonth()
  {
    var a = new Date();
    var monthNow = a.getMonth();

    this.listLoanAccount.forEach(e => {
        e.loan_logs.forEach( i =>
          {
            var month = new Date(i.due_date).getMonth();
            if(Boolean(i.is_paid) && month == monthNow)
            {
              this.totalAmountPaid =  Number( this.totalAmountPaid) + Number(i.amount)
            }
          });
    });
  }

  viewBreakDown(model : AccountLoansRequest)
  {
    this.loanInfo = new AccountLoansRequest();
    this.loanInfo = model;
    // console.log(model);
    // console.log(this.loanInfo);
    this.router.navigateByUrl('/user-loan-info', { state : model});
  }

}
