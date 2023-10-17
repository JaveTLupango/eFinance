import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { BreakdownContributionService } from 'src/app/shared/Services/bank/savings/breakdown-contribution.service';
import { AccountLoansRequest } from 'src/app/shared/model/AcountLoansRequest/account-loans-request.model';
import { ContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';

@Component({
  selector: 'app-users-create-loan-request',
  templateUrl: './users-create-loan-request.component.html',
  styleUrls: ['./users-create-loan-request.component.css']
})
export class UsersCreateLoanRequestComponent {
  constructor (public datepipe: DatePipe) {}
  accountLoanRequest : AccountLoansRequest = new AccountLoansRequest();
  accountLoanRequestModel : AccountLoansRequest = new AccountLoansRequest();
  listContributionBreakdown : ContributionBreakDown[] = [];
  bdcService : BreakdownContributionService = new BreakdownContributionService(this.datepipe);

  onSubmit()
  {
    this.accountLoanRequest.requestDate = new Date();
    this.accountLoanRequest.noMonthsTerms = this.getTotalMonths(this.accountLoanRequest);
    this.accountLoanRequest.amountInterestPerMonth = this.getTotalPercentagePerMonth(this.accountLoanRequest);
    this.accountLoanRequest.totalAmountLoanAndInterest = this.getTotalAmountLoanAndInterest(this.accountLoanRequest);

    this.accountLoanRequestModel = this.accountLoanRequest;
      // this.listContributionBreakdown = [];
      // this.accountSavingsRequestModel = this.accountSavingsRequest;
      // this.accountSavingsRequestModel.expectedAmountPerTerm = this.accountSavingsRequestModel.amountLoan / this.accountSavingsRequestModel.monthlyTerm;
      // this.accountSavingsRequestModel.gracePeriod = 3;
      // this.accountSavingsRequestModel.extentionFeePerDay = 10;
      if(this.accountLoanRequest.monthlyTerm == 4)
      {
        this.listContributionBreakdown = this.bdcService.loanWeekly(this.accountLoanRequest);
      }
      else if(this.accountLoanRequest.monthlyTerm == 2)
      {
        //this.listContributionBreakdown = this.bdcService.semiMonthly(this.accountLoanRequest);
      }
      else if (this.accountLoanRequest.monthlyTerm == 1)
      {
        //this.listContributionBreakdown = this.bdcService.monthly(this.accountLoanRequest);
      }
      else{

      }
  }

  getTotalMonths(model : AccountLoansRequest)
  {
    let now = new Date();
    let day = now.toLocaleDateString().split('/')[1];
    let expectedDateToPaid = new Date(model.expectedDateToPaid);
    let startMonth = (new Date()).getMonth() + 1;
    let lastMonth = expectedDateToPaid.getMonth() + 1;
    let totalMonths =  lastMonth - startMonth;
    return totalMonths == 0 ? 1 : totalMonths;
  }

  getTotalPercentagePerMonth(model : AccountLoansRequest)
  {
    console.log(model);
    let interestPerMonth = 0.10; // this is must be selectable;
    let amountInterestPerMonth = model.amountLoan * interestPerMonth;
    return amountInterestPerMonth;
  }

  getTotalAmountLoanAndInterest(model : AccountLoansRequest)
  {
    return (model.amountInterestPerMonth * model.noMonthsTerms) + model.amountLoan;
  }

}
