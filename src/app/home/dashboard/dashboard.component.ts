import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoanRequestService } from 'src/app/shared/Services/bank/loan/loan-request.service';
import { AccountLoansRequest } from 'src/app/shared/model/AcountLoansRequest/account-loans-request.model';
import { LoanContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
import { Users } from 'src/app/shared/model/user/users.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent
{
  constructor (public datepipe: DatePipe, private router: Router, private http: HttpClient) {}

  listUserModel : Users[] = [];
  listActiveLoanAccount : AccountLoansRequest[] = [];
  listRequestLoanAccount : AccountLoansRequest[] = [];
  service : LoanRequestService = new LoanRequestService(this.http);
  listLoanBreakdown : LoanContributionBreakDown[] = [];
  list_reject_loan_request : AccountLoansRequest[] = [];

  totalActiveLoanAccount : number = 0;  // active loan
  totalRequestLoanAccount : number = 0; // request loan
  totalActiveUser : number = 0;  //active user with active loan
  totalOverDueAmount : number = 0; // over due amount as of this month
  totalDueAmount : number = 0;  // due amount as of this month
  totalPaidLoanAmount : number = 0; // paid amount as of this month
  totalLoanedAmount : number = 0; // total active loaned amount.

  ngOnInit()
  {
      this.service.getuserwithloans().subscribe({
        next:(data) =>
        {
          this.listUserModel = data.users;
          this.listActiveLoanAccount = data.active_loan_account;
          this.listRequestLoanAccount = data.request_loan_account;
          this.list_reject_loan_request = data.reject_loan_request;

        },
        error: (error)=>
        {
        },
        complete : () =>
        {
            this.totalActiveLoanAccount = this.listActiveLoanAccount.length;
            this.totalRequestLoanAccount = this.listRequestLoanAccount.length;
            this.totalActiveUser = this.listUserModel.length;
            var e_date = new Date();
            var monthNow = e_date.getMonth();
            this.listActiveLoanAccount.forEach( a => {
                this.totalLoanedAmount = this.totalLoanedAmount + Number(a.amount);
                a.loan_logs.forEach(i =>
                  {
                    var month = new Date(i.due_date).getMonth();
                    var mmount = new Date(i.due_date).getTime();

                    if(!Boolean(i.is_paid) && month == monthNow)
                    {
                      this.totalDueAmount =  Number( this.totalDueAmount) + Number(i.amount)
                    }

                    if(!Boolean(i.is_paid) && e_date.getTime() > mmount)
                    {
                      this.totalOverDueAmount =  Number( this.totalOverDueAmount) + Number(i.amount)
                    }

                    if(Boolean(i.is_paid) && month == monthNow)
                    {
                      this.totalPaidLoanAmount =  Number( this.totalPaidLoanAmount) + Number(i.amount)
                    }
                  });
            });

            this.listUserModel.forEach(u =>
              {
                console.log(u.total_loan_amount);
                u.loan_account.forEach(l =>
                  {
                    console.log(l.amount);
                    //u.totalLoanAmount = Number(u.totalLoanAmount) + Number(l.amount);
                  });
              });
        }
      }
      );
  }

  totalLoanAccount(model: AccountLoansRequest[])
  {
    var total = 0;
    model.forEach(i =>
      {
        if(i.is_approved )
        {
          total = total + Number(i.amount);
        }
      });

      return total;
  }

  totalLoanAccountWithInterest(model: AccountLoansRequest[])
  {
    var total = 0;
    model.forEach(i =>
      {
        if(i.is_approved )
        {
          total = total + Number(i.total_amount_loan_and_interest);
        }
      });

      return total;
  }

  term_counts(list : LoanContributionBreakDown[])
  {
      return list.length;
  }

  viewBreakDown(model : AccountLoansRequest)
  {
    this.router.navigateByUrl('/user-loan-info', { state : model});
  }

  requestApprove_Reject(model : AccountLoansRequest, stat : boolean)
  {
      if(stat)
      {
        model.user_id = Number(localStorage.getItem('UserId')); //
        model.is_approved = true;
        model.aprroved_date = new Date();
        this.service.approvedLoanRequest(model);
      }
      else{
        model.status = "Reject By userid UA-"+ localStorage.getItem('UserId'); //
        model.is_active = false;
        this.service.rejectLoanRequest(model);
      }
  }

  
  requestRelease_Reject(model : AccountLoansRequest, stat : boolean)
  {
      if(stat)
      {
        model.user_id = Number(localStorage.getItem('UserId')); //
        model.is_release = true;
        model.release_date = new Date();
        this.service.releaseLoanRequest(model);
      }
      else{
        model.status = "Reject By userid UA-"+ localStorage.getItem('UserId'); //
        model.is_active = false;
        this.service.reject_releaseLoanRequest(model);
      }
  }
}
