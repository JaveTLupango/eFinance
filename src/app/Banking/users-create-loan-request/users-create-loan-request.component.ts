import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoanRequestService } from 'src/app/shared/Services/bank/loan/loan-request.service';
import { BreakdownContributionService } from 'src/app/shared/Services/bank/savings/breakdown-contribution.service';
import { AccountLoansRequest } from 'src/app/shared/model/AcountLoansRequest/account-loans-request.model';
import { LoanContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-create-loan-request',
  templateUrl: './users-create-loan-request.component.html',
  styleUrls: ['./users-create-loan-request.component.css']
})
export class UsersCreateLoanRequestComponent {
  constructor (public datepipe: DatePipe, private router: Router, private http: HttpClient) {}
  accountLoanRequest : AccountLoansRequest = new AccountLoansRequest();
  accountLoanRequestModel : AccountLoansRequest = new AccountLoansRequest();
  listContributionBreakdown : LoanContributionBreakDown[] = [];
  bdcService : BreakdownContributionService = new BreakdownContributionService(this.datepipe);
  loanRequestService : LoanRequestService = new LoanRequestService(this.http);

  dateSelectMonth : string = '';
  dateNow : Date = new Date();
  dateMax : Date = new Date();
  minMonths = this.datepipe.transform(this.dateNow, 'yyyy-MM')?.toString();
  maxMonths = this.datepipe.transform(new Date(this.dateMax.setMonth(this.dateNow.getMonth() + 6)), 'yyyy-MM')?.toString();

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    console.log('Min:' +this.minMonths);
    console.log('Max:' +this.maxMonths);
  }

  onSubmit()
  {
    // console.log(this.dateSelectMonth);
    // console.log(new Date(this.dateSelectMonth+'-28'));

    this.accountLoanRequest.date_paid_off = new Date(this.dateSelectMonth+'-28');

    if(this.accountLoanRequest.loan_purpose_name == null || this.accountLoanRequest.loan_purpose_name == ''
        || this.accountLoanRequest.amount == 0 || this.dateSelectMonth == "")
    {
      Swal.fire(
        'Warning!',
        'Please fill out all required fields.',
        'warning'
      )
      return;
    }
    this.accountLoanRequest.date_loan = new Date();
    this.accountLoanRequest.no_months = this.getTotalMonths(this.accountLoanRequest);
    this.accountLoanRequest.amount_interest_per_month = this.getTotalPercentagePerMonth(this.accountLoanRequest);
    this.accountLoanRequest.total_amount_loan_and_interest = this.getTotalAmountLoanAndInterest(this.accountLoanRequest);

       this.listContributionBreakdown = [];
       console.log(this.listContributionBreakdown);
      // this.accountSavingsRequestModel = this.accountSavingsRequest;
      // this.accountSavingsRequestModel.expectedAmountPerTerm = this.accountSavingsRequestModel.amountLoan / this.accountSavingsRequestModel.monthlyTerm;
      // this.accountSavingsRequestModel.gracePeriod = 3;
      // this.accountSavingsRequestModel.extentionFeePerDay = 10;

      if(this.accountLoanRequest.no_month_term == 0)
      {
        Swal.fire(
          'Warning!',
          'Please select monthly term!.',
          'warning'
        )
        return;
      }
      else if(this.accountLoanRequest.no_month_term == 1)
      {
        this.accountLoanRequest.is_monthly = true;
        this.listContributionBreakdown = this.bdcService.loanMonthly(this.accountLoanRequest);
      }
      else if(this.accountLoanRequest.no_month_term == 2)
      {
        this.accountLoanRequest.is_mid_monthly = true;
        this.listContributionBreakdown = this.bdcService.loanSemiMonthly(this.accountLoanRequest);
      }
      else if(this.accountLoanRequest.no_month_term == 4)
      {
        this.accountLoanRequest.is_weekly = true;
        this.listContributionBreakdown = this.bdcService.loanWeekly(this.accountLoanRequest);
      }

      let totalcounts = this.listContributionBreakdown.length;
      this.accountLoanRequest.num_of_gives = totalcounts;

      console.log(this.accountLoanRequest.total_amount_loan_and_interest / totalcounts);
      console.log((this.accountLoanRequest.total_amount_loan_and_interest / totalcounts).toFixed(2));

      this.accountLoanRequest.amount_per_gives = Number((this.accountLoanRequest.total_amount_loan_and_interest / totalcounts).toFixed(2));
      this.accountLoanRequestModel = this.accountLoanRequest;

  }

  onReset()
  {
    this.listContributionBreakdown = [];
    this.accountLoanRequest = new AccountLoansRequest();
    this.accountLoanRequestModel = new AccountLoansRequest();
  }

  getTotalMonths(model : AccountLoansRequest)
  {
    let now = new Date();
    let day = now.toLocaleDateString().split('/')[1];
    let expectedDateToPaid = new Date(model.date_paid_off);
    let startMonth = (new Date()).getMonth() + 1;
    let lastMonth = expectedDateToPaid.getMonth() + 1;
    let totalMonths =  lastMonth - startMonth;
    return totalMonths == 0 ? 1 : totalMonths+1;
  }

  getTotalPercentagePerMonth(model : AccountLoansRequest)
  {
    console.log(model);
    let interestPerMonth = 0.10; // this is must be selectable;
    let amountInterestPerMonth = model.amount * interestPerMonth;
    return amountInterestPerMonth;
  }

  getTotalAmountLoanAndInterest(model : AccountLoansRequest)
  {
    var i : number = 0;
    var total : number = model.amount;
    for(i = model.no_months; i >= 1; i--)
    {
      total = (total * model.interest_rate) + total;
    }
    return total;
  }

  NgSubmitSavingRequest(model: AccountLoansRequest)
  {
    debugger;
    model.user_id = Number(localStorage.getItem('UserId'));
    model.loanContributionBreakDown = this.listContributionBreakdown;
    console.log(model);

    this.loanRequestService.create(model).subscribe(
      {
        next: (data) =>
        {
          var retval = data;
          console.log(data);
          if(data.status_code == 200)
          {
             Swal.fire(
              'Success!',
              'Loan request successfully sent!.',
              'success'
            );
          }
          else{
            Swal.fire(
              'Error!',
              'Something went wrong during performing the task!.',
              'error'
            )
          }
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
            console.log('complete')
        }
      }
    );
  }
}
