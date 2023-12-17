import { Injectable } from '@angular/core';
import { ContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
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
  modelCB : ContributionBreakDown = new ContributionBreakDown();
  weekly(model : AcountSavingsRequest)
  {
    this.listContributionBreakdown = [];
    let year = (new Date()).getFullYear();
    let start=new Date(year,0,1);
    let end = new Date(year,11,31);
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
      this.modelCB.amount = model.expectedAmountPerTerm;
      this.modelCB.extention_fee_per_day = 10;
      this.modelCB.savings_id = model.uniqueId;
      this.modelCB.grace_period = model.gracePeriod;
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

    for(let i = 11; month <= i; month++)
    {
      var semi1 = new Date(year, month, 15);
      var semi2 = new Date(year, month+1, 0);
      semiMonthly.push(new Date(semi1));
      semiMonthly.push(new Date(semi2));
    }

    semiMonthly.forEach(a =>{
      this.modelCB = new ContributionBreakDown();
      this.modelCB.amount = model.expectedAmountPerTerm;
      this.modelCB.extention_fee_per_day = 10;
      this.modelCB.savings_id = model.uniqueId;
      this.modelCB.grace_period = model.gracePeriod;
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

    for(let i = 11; month <= i; month++)
    {
      var monthly = new Date(year, month+1, 0);
      Monthly.push(new Date(monthly));
    }

    Monthly.forEach(a =>{
      this.modelCB = new ContributionBreakDown();
      this.modelCB.amount = model.expectedAmountPerTerm;
      this.modelCB.extention_fee_per_day = 10;
      this.modelCB.savings_id = model.uniqueId;
      this.modelCB.grace_period = model.gracePeriod;
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
    this.listContributionBreakdown = [];
    let start= model.requestDate;
    let end = new Date(model.expectedDateToPaid);
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
    model.expectedAmountPerTerm = model.totalAmountLoanAndInterest / totalTerms;

    weekends.forEach(a =>{
      this.modelCB = new ContributionBreakDown();
      this.modelCB.amount = model.expectedAmountPerTerm;
      this.modelCB.extention_fee_per_day = 10;
      this.modelCB.savings_id = model.uniqueId;
      this.modelCB.grace_period = model.gracePeriod;
      terms = terms + 1;
      this.modelCB.id = terms;
      this.modelCB.term =  "Term #"+terms;
      this.modelCB.due_date = new Date(a);
      this.listContributionBreakdown?.push(this.modelCB);
    });

     return this.listContributionBreakdown;
  }

  loanSemiMonthly(model : AccountLoansRequest)
  {
    this.listContributionBreakdown = [];
    let start= model.requestDate.getMonth();
    let end = new Date(model.expectedDateToPaid).getMonth();
    let day = new Date(model.requestDate).getDate();

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
    model.expectedAmountPerTerm = model.totalAmountLoanAndInterest / totalTerms;

    semiMonthly.forEach(a =>{
      this.modelCB = new ContributionBreakDown();
      this.modelCB.amount = model.expectedAmountPerTerm;
      this.modelCB.extention_fee_per_day = 10;
      this.modelCB.savings_id = model.uniqueId;
      this.modelCB.grace_period = model.gracePeriod;
      terms = terms + 1;
      this.modelCB.id = terms;
      this.modelCB.term =  "Term #"+terms;
      this.modelCB.due_date = new Date(a);
      this.listContributionBreakdown?.push(this.modelCB);
    });
    return this.listContributionBreakdown;
  }

  loanMonthly(model : AccountLoansRequest)
  {
    let year = (new Date()).getFullYear();
    this.listContributionBreakdown = [];
    let start= model.requestDate.getMonth();
    let day = new Date(model.requestDate).getDate();
    let Monthly = [];
    let terms = 0;
    for(let i = 1; model.noMonthsTerms >= i; i++)
    {
      var monthly = new Date(year, start+1, day);
      Monthly.push(new Date(monthly));
    }

    let totalTerms = Monthly.length;
    model.expectedAmountPerTerm = model.totalAmountLoanAndInterest / totalTerms;

    Monthly.forEach(a =>{
      this.modelCB = new ContributionBreakDown();
      this.modelCB.amount = model.expectedAmountPerTerm;
      this.modelCB.extention_fee_per_day = 10;
      this.modelCB.savings_id = model.uniqueId;
      this.modelCB.grace_period = model.gracePeriod;
      terms = terms + 1;
      this.modelCB.id = terms;
      this.modelCB.term =  "Term #"+terms;
      this.modelCB.due_date = new Date(a);
      this.listContributionBreakdown?.push(this.modelCB);
    });

    return this.listContributionBreakdown;
  }
}
