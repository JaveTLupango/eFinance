import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { AccountLoansRequest } from 'src/app/shared/model/AcountLoansRequest/account-loans-request.model';
import { LoanContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';

@Component({
  selector: 'app-user-loan-info',
  templateUrl: './user-loan-info.component.html',
  styleUrls: ['./user-loan-info.component.css']
})
export class UserLoanInfoComponent {

  retval : any;
  loanInfo : AccountLoansRequest = new AccountLoansRequest();
  loanContributionBreakDown : LoanContributionBreakDown[] = [];
  role : any = localStorage.getItem('UserRole');
  userRole : boolean= false;
  monthNow: string = '';
  dateNow : Date = new Date();
  totalAmountOverDue : number = 0;
  totalAmountDue : number = 0;
  totalPayableAmount : number = 0;
  paidAsOfThisMonth : number = 0;

  constructor(private router:Router,private activatedroute:ActivatedRoute)
  {
  }

  ngOnInit() {
    this.userRole = this.role == 1 ? true : false; // true admin, false user
    this.monthNow = this.dateNow.toLocaleString('default', { month: 'long' });
    this.retval =history.state;
    console.log(this.retval);
    this.loanInfo = this.retval;
    this.loanContributionBreakDown = this.loanInfo.loan_logs;
    this.getTotalPayableAmount();
    }

    getTotalPayableAmount()
    {
      var a = new Date();
      var monthNum = a.getMonth();

      this.loanInfo.loan_logs.forEach(e => {

            var month = new Date(e.due_date);
            var eMonthNum = new Date(e.due_date).getMonth();
              if(!Boolean(e.is_paid) && month <= a)
              {
                this.totalAmountOverDue =  Number(this.totalAmountOverDue) + Number(e.amount)
              }

              if(!Boolean(e.is_paid) && eMonthNum == monthNum)
              {
                this.totalAmountDue = Number(this.totalAmountDue) + Number(e.amount);
              }

              if(!Boolean(e.is_paid))
              {
                this.totalPayableAmount = Number(this.totalPayableAmount) + Number(e.amount);
              }

              if(Boolean(e.is_paid) && eMonthNum == monthNum)
              {
                this.paidAsOfThisMonth =  Number(this.paidAsOfThisMonth) + Number(e.amount);
              }
      });
    }

    count_term(model: LoanContributionBreakDown[])
    {
      return model.length;
    }

}
