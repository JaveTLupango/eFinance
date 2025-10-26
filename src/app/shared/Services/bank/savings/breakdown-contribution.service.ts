import { Injectable } from '@angular/core';
import { ContributionBreakDown, LoanContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
import { DatePipe } from '@angular/common'
import { AcountSavingsRequest } from 'src/app/shared/model/bank/AccountSavingsRequest/acount-savings-request';
import { AccountLoansRequest } from 'src/app/shared/model/AcountLoansRequest/account-loans-request.model';
import { count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakdownContributionService {
  
  constructor(public datepipe: DatePipe) { }

  listContributionBreakdown : ContributionBreakDown[] = [];
  listLoanLoanContributionBreakDown : LoanContributionBreakDown [] = [];

  modelLoanCB : LoanContributionBreakDown = new LoanContributionBreakDown();
  modelCB : ContributionBreakDown = new ContributionBreakDown();
  weekly(model : AcountSavingsRequest)
  {
    this.listContributionBreakdown = [];
    let year = (new Date()).getFullYear();
    let start=new Date(year,0,1);
    let end = new Date(year,10,31);
    let weekends = [];
    let terms = 0;

    while(start < end){
       var d = start.getDay();
       if(d === 6){
         //console.log(this.datepipe.transform(start, 'yyyy-MM-dd'));
         weekends.push(new Date(start));
       }
       start.setDate(start.getDate()+1);
    };
    weekends.forEach(a =>{
      this.modelCB = new ContributionBreakDown();
      this.modelCB.amount = model.expected_amount_per_term;
      this.modelCB.extention_fee_per_day = 10;
      this.modelCB.savings_id = model.uniqueId;
      this.modelCB.grace_period = model.grace_period;
      terms = terms + 1;
      this.modelCB.id = terms;
      this.modelCB.term =  "Term #"+terms;
      this.modelCB.due_date = new Date(a);
      this.listContributionBreakdown?.push(this.modelCB);
    });
    return this.listContributionBreakdown;
  }

  semiMonthly(model : AcountSavingsRequest)
  {
    this.listContributionBreakdown = [];
    let year = (new Date()).getFullYear();
    let semiMonthly = [];
    let month = 0;
    let terms = 0;

    for(let i = 10; month <= i; month++)
    {
      var semi1 = new Date(year, month, 15);
      var semi2 = new Date(year, month+1, 0);
      semiMonthly.push(new Date(semi1));
      semiMonthly.push(new Date(semi2));
    }

    semiMonthly.forEach(a =>{
      this.modelCB = new ContributionBreakDown();
      this.modelCB.amount = model.expected_amount_per_term;
      this.modelCB.extention_fee_per_day = 10;
      this.modelCB.savings_id = model.uniqueId;
      this.modelCB.grace_period = model.grace_period;
      terms = terms + 1;
      this.modelCB.id = terms;
      this.modelCB.term =  "Term #"+terms;
      this.modelCB.due_date = new Date(a);
      this.listContributionBreakdown?.push(this.modelCB);
    });
    return this.listContributionBreakdown;
  }

  monthly(model : AcountSavingsRequest)
  {
    this.listContributionBreakdown = [];
    let year = (new Date()).getFullYear();
    let Monthly = [];
    let month = 0;
    let terms = 0;

    for(let i = 10; month <= i; month++)
    {
      var monthly = new Date(year, month+1, 0);
      Monthly.push(new Date(monthly));
    }

    Monthly.forEach(a =>{
      this.modelCB = new ContributionBreakDown();
      this.modelCB.amount = model.expected_amount_per_term;
      this.modelCB.extention_fee_per_day = 10;
      this.modelCB.savings_id = model.uniqueId;
      this.modelCB.grace_period = model.grace_period;
      terms = terms + 1;
      this.modelCB.id = terms;
      this.modelCB.term =  "Term #"+terms;
      this.modelCB.due_date = new Date(a);
      this.listContributionBreakdown?.push(this.modelCB);
    });

    return this.listContributionBreakdown;
  }

  loanWeekly(model : AccountLoansRequest)
  {
    this.listLoanLoanContributionBreakDown = [];
    let start= model.date_loan;
    let end = new Date(model.date_paid_off);
    let weekends = [];
    let terms = 0;
    let firstLoop = true;

    while(start <= end){

       var d = start.getDay();
       if(d === 6){
         //console.log(this.datepipe.transform(start, 'yyyy-MM-dd'));
         if(firstLoop)
          {
            firstLoop = false;
          }
          else{
            weekends.push(new Date(start));
          }
       }
       start.setDate(start.getDate()+1);
    };

    let totalTerms = weekends.length;
    model.amount_per_gives = Number((model.total_amount_loan_and_interest / totalTerms).toFixed(2));

    weekends.forEach(a =>{
      this.modelLoanCB = new LoanContributionBreakDown();
      this.modelLoanCB.amount = model.amount_per_gives;
      //this.modelLoanCB.loan_id = model.loan_id;
      terms = terms + 1;
      this.modelLoanCB.id = terms;
      this.modelLoanCB.term_no =  "Term #"+terms;
      this.modelLoanCB.due_date = new Date(a);
      this.listLoanLoanContributionBreakDown?.push(this.modelLoanCB);
    });

     return this.listLoanLoanContributionBreakDown;
  }

  loanSemiMonthly(model : AccountLoansRequest)
  {
    this.listLoanLoanContributionBreakDown = [];
    let start= model.date_loan.getMonth();
    let end = new Date(model.date_paid_off).getMonth();
    let day = new Date(model.date_loan).getDate();

    let weekends = [];
    let terms = 0;
    let firstLoop = true;


     let year = (new Date()).getFullYear();
    let semiMonthly = [];
    // let month = 0;
    // let terms = 0;

    while(start <= end)
    {
      if(firstLoop)
      {
          if(day <= 15)
          {
            //var semi1 = new Date(year, start, 15);
            var semi2 = new Date(year, start+1, 0);
            //.push(new Date(semi1));
            semiMonthly.push(new Date(semi2));
          }
          // else if(day > 15 && day <=30)
          // {
          //   end++;
          // }
          firstLoop = false;
      }
      else
      {
        var semi1 = new Date(year, start, 15);
        var semi2 = new Date(year, start+1, 0);
        semiMonthly.push(new Date(semi1));
        semiMonthly.push(new Date(semi2));
      }
      start++;
    }

    let totalTerms = semiMonthly.length;
    model.amount_per_gives = Number((model.total_amount_loan_and_interest / totalTerms).toFixed(2));

    semiMonthly.forEach(a =>{
      this.modelLoanCB = new LoanContributionBreakDown();
      this.modelLoanCB.amount = model.amount_per_gives;
      //this.modelLoanCB.loan_id = model.loan_id;
      terms = terms + 1;
      this.modelLoanCB.id = terms;
      this.modelLoanCB.term_no =  "Term #"+terms;
      this.modelLoanCB.due_date = new Date(a);
      this.listLoanLoanContributionBreakDown?.push(this.modelLoanCB);
    });
    return this.listLoanLoanContributionBreakDown;
  }

  loanMonthly(model : AccountLoansRequest)
  {
    let year = (new Date()).getFullYear();
    this.listLoanLoanContributionBreakDown = [];
    let start= model.date_loan.getMonth();
    let day = new Date(model.date_loan).getDate();
    let Monthly = [];
    let terms = 0;
    for(let i = 1; model.no_months >= i; i++)
    {
      var monthly = new Date(year, start+i, day);
      Monthly.push(new Date(monthly));
    }

    let totalTerms = Monthly.length;
    model.amount_per_gives =Number((model.total_amount_loan_and_interest / totalTerms).toFixed(2));

    Monthly.forEach(a =>{
      this.modelLoanCB = new LoanContributionBreakDown();
      this.modelLoanCB.amount = model.amount_per_gives;
      //this.modelLoanCB.loan_id = model.loan_id;
      terms = terms + 1;
      this.modelLoanCB.id = terms;
      this.modelLoanCB.term_no =  "Term #"+terms;
      this.modelLoanCB.due_date = new Date(a);
      this.listLoanLoanContributionBreakDown?.push(this.modelLoanCB);
    });

    return this.listLoanLoanContributionBreakDown;
  }
}
