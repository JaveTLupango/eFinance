import { Injectable } from '@angular/core';
import { ContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
import { DatePipe } from '@angular/common'
import { AcountSavingsRequest } from 'src/app/shared/model/bank/AccountSavingsRequest/acount-savings-request';

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
      this.modelCB.Amount = model.expectedAmountPerTerm;
      this.modelCB.extentionFeePerDay = 10;
      this.modelCB.uniqueId = model.uniqueId;
      this.modelCB.gracePeriod = model.gracePeriod;
      terms = terms + 1;
      this.modelCB.Id = terms;
      this.modelCB.Term =  "Term #"+terms;
      this.modelCB.dueDate = new Date(a);
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
      this.modelCB.Amount = model.expectedAmountPerTerm;
      this.modelCB.extentionFeePerDay = 10;
      this.modelCB.uniqueId = model.uniqueId;
      this.modelCB.gracePeriod = model.gracePeriod;
      terms = terms + 1;
      this.modelCB.Id = terms;
      this.modelCB.Term =  "Term #"+terms;
      this.modelCB.dueDate = new Date(a);
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
      this.modelCB.Amount = model.expectedAmountPerTerm;
      this.modelCB.extentionFeePerDay = 10;
      this.modelCB.uniqueId = model.uniqueId;
      this.modelCB.gracePeriod = model.gracePeriod;
      terms = terms + 1;
      this.modelCB.Id = terms;
      this.modelCB.Term =  "Term #"+terms;
      this.modelCB.dueDate = new Date(a);
      this.listContributionBreakdown?.push(this.modelCB);
    });

    return this.listContributionBreakdown;
  }
}
