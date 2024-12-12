import { Component } from '@angular/core';
import { BreakdownContributionService } from 'src/app/shared/Services/bank/savings/breakdown-contribution.service';
import { ContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
import { AcountSavingsRequest } from 'src/app/shared/model/bank/AccountSavingsRequest/acount-savings-request';
import {RequestListModel} from 'src/app/shared/model/bank/RequestModel/request-list-model.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-create-savings-request',
  templateUrl: './user-create-savings-request.component.html',
  styleUrls: ['./user-create-savings-request.component.css']
})
export class UserCreateSavingsRequestComponent {
    constructor (public datepipe: DatePipe) {}
    accountSavingsRequest : AcountSavingsRequest = new AcountSavingsRequest();
    accountSavingsRequestModel : AcountSavingsRequest = new AcountSavingsRequest();
    listContributionBreakdown : ContributionBreakDown[] = [];
    bdcService : BreakdownContributionService = new BreakdownContributionService(this.datepipe);
    requestModel : RequestListModel = new RequestListModel();

    onSubmit()
    {
        this.listContributionBreakdown = [];
        this.accountSavingsRequestModel = this.accountSavingsRequest;
        this.accountSavingsRequestModel.expectedAmountPerTerm = this.accountSavingsRequestModel.targetMonthlyContribution / this.accountSavingsRequestModel.monthlyTerm;
        this.accountSavingsRequestModel.gracePeriod = 3;
        this.accountSavingsRequestModel.extentionFeePerDay = 10;
        if(this.accountSavingsRequestModel.monthlyTerm == 4)
        {
          this.listContributionBreakdown = this.bdcService.weekly(this.accountSavingsRequestModel);
        }
        else if(this.accountSavingsRequestModel.monthlyTerm == 2)
        {
          this.listContributionBreakdown = this.bdcService.semiMonthly(this.accountSavingsRequestModel);
        }
        else{
          this.listContributionBreakdown = this.bdcService.monthly(this.accountSavingsRequestModel);
        }
    }

    onReset()
    {
      this.listContributionBreakdown = [];
      this.accountSavingsRequestModel = new AcountSavingsRequest();
    }

    NgSubmitSavingRequest(model: AcountSavingsRequest)
    {
      //alert(model);
      this.requestModel.user_id = 2;
      this.requestModel.savings_id = 1;
      this.requestModel.listmodel = this.listContributionBreakdown;
      console.log(this.requestModel);
      console.log(JSON.stringify(this.requestModel));
    }
}
