import { Component } from '@angular/core';
import { BreakdownContributionService } from 'src/app/shared/Services/bank/savings/breakdown-contribution.service';
import { ContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
import { AcountSavingsRequest } from 'src/app/shared/model/bank/AccountSavingsRequest/acount-savings-request';
import {RequestListModel} from 'src/app/shared/model/bank/RequestModel/request-list-model.model';
import { DatePipe } from '@angular/common';
import { SavingsRequestService } from 'src/app/shared/Services/bank/savings/savings-request.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create-savings-request',
  templateUrl: './user-create-savings-request.component.html',
  styleUrls: ['./user-create-savings-request.component.css']
})
export class UserCreateSavingsRequestComponent {
    constructor (public datepipe: DatePipe, private http: HttpClient , private router: Router) {}
    accountSavingsRequest : AcountSavingsRequest = new AcountSavingsRequest();
    accountSavingsRequestModel : AcountSavingsRequest = new AcountSavingsRequest();
    listContributionBreakdown : ContributionBreakDown[] = [];
    bdcService : BreakdownContributionService = new BreakdownContributionService(this.datepipe);
    requestModel : RequestListModel = new RequestListModel();
    service : SavingsRequestService = new SavingsRequestService(this.http);

    onSubmit()
    {
        this.listContributionBreakdown = [];
        this.accountSavingsRequestModel = this.accountSavingsRequest;
        this.accountSavingsRequestModel.expected_amount_per_term = this.accountSavingsRequestModel.target_monthly_contribution / this.accountSavingsRequestModel.monthly_term;
        this.accountSavingsRequestModel.grace_period = 3;
        this.accountSavingsRequestModel.extention_fee_per_day = 10;
        if(this.accountSavingsRequestModel.monthly_term == 4)
        {
          this.listContributionBreakdown = this.bdcService.weekly(this.accountSavingsRequestModel);
        }
        else if(this.accountSavingsRequestModel.monthly_term == 2)
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
      model.user_id = Number(localStorage.getItem('UserId'));
      model.listmodel = this.listContributionBreakdown
      console.log(model);
      console.log(JSON.stringify(model));
      this.service.create(model).subscribe(
            {
              next: (data) =>
              {
                var retval = data;
                console.log(data);
                if(data.status_code == 200)
                {      
                  Swal.fire({
                    title: "Success!",
                    text: "Savings request successfully sent!.",
                    icon: "success",
                    confirmButtonText: "Ok"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.router.navigate(['']);
                    }
                  });
                  //  Swal.fire(
                  //   'Success!',
                  //   'Loan request successfully sent!.',
                  //   'success'
                  // );
      
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
