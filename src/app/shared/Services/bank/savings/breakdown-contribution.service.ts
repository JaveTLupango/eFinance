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

    let start=new Date(2023,0,1);
    let end = new Date(2023,12,31);
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
      this.modelCB.Term =  "No"+terms;
      this.modelCB.dueDate = new Date(a);
      this.listContributionBreakdown?.push(this.modelCB);
    });
    return this.listContributionBreakdown;
  }

  semiMonthly()
  {

  }

  monthly()
  {

  }
}
