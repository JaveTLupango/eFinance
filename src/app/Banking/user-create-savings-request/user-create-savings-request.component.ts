import { Component } from '@angular/core';
import { BreakdownContributionService } from 'src/app/shared/Services/bank/savings/breakdown-contribution.service';
import { AcountSavingsRequest } from 'src/app/shared/model/bank/AccountSavingsRequest/acount-savings-request';
import { ContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
import { DatePipe } from '@angular/common'

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

    onSubmit()
    {
      debugger
        this.accountSavingsRequestModel = this.accountSavingsRequest;
        console.log(this.accountSavingsRequestModel );
        console.log(this.accountSavingsRequest );
        this.accountSavingsRequestModel.expectedAmountPerTerm = this.accountSavingsRequestModel.targetMonthlyContribution / this.accountSavingsRequestModel.monthlyTerm;
        this.accountSavingsRequestModel.gracePeriod = 3;
        this.accountSavingsRequestModel.extentionFeePerDay = 10;

        this.listContributionBreakdown = this.bdcService.weekly(this.accountSavingsRequestModel);
        console.log(this.listContributionBreakdown);


    }
}
