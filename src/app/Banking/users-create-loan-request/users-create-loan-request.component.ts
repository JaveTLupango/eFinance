import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BreakdownContributionService } from 'src/app/shared/Services/bank/savings/breakdown-contribution.service';
import { AccountLoansRequest } from 'src/app/shared/model/AcountLoansRequest/account-loans-request.model';
import { ContributionBreakDown, LoanContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';

@Component({
  selector: 'app-users-create-loan-request',
  templateUrl: './users-create-loan-request.component.html',
  styleUrls: ['./users-create-loan-request.component.css']
})
export class UsersCreateLoanRequestComponent {
  constructor (public datepipe: DatePipe) {}
  accountLoanRequest : AccountLoansRequest = new AccountLoansRequest();
  accountLoanRequestModel : AccountLoansRequest = new AccountLoansRequest();
  listContributionBreakdown : LoanContributionBreakDown[] = [];
  bdcService : BreakdownContributionService = new BreakdownContributionService(this.datepipe);

  onSubmit()
  {
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
      if(this.accountLoanRequest.no_month_term == 4)
      {
        this.listContributionBreakdown = this.bdcService.loanWeekly(this.accountLoanRequest);
      }
      else if(this.accountLoanRequest.no_month_term == 2)
      {
        this.listContributionBreakdown = this.bdcService.loanSemiMonthly(this.accountLoanRequest);
      }
      else if (this.accountLoanRequest.no_month_term == 1)
      {
        this.listContributionBreakdown = this.bdcService.loanMonthly(this.accountLoanRequest);
      }
      else{

      }

      let totalcounts = this.listContributionBreakdown.length;
      this.accountLoanRequest.amount_per_gives = this.accountLoanRequest.total_amount_loan_and_interest / totalcounts;
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
    return totalMonths == 0 ? 1 : totalMonths;
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
    return (model.amount_interest_per_month * model.no_month_term) + model.amount;
  }

}
