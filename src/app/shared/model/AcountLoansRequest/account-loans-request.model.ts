import { LoanContributionBreakDown } from "../bank/contributionBreakDown/contribution-break-down";
import { Users } from "../user/users.model";

export class AccountLoansRequest {
  id : number = 0;
  user_id : number = 0;
  loan_purpose_name : string = '';
  amount : number = 0;
  date_loan : Date = new Date();
  date_start_payoff : Date = new Date();
  date_paid_off : Date = new Date();
  no_month_term : number = 0;
  num_of_gives : number = 0;
  is_monthly : boolean = false;
  is_mid_monthly : boolean = false;
  is_weekly : boolean = false;
  amount_per_gives : number = 0;
  interest_rate : number = .1;
  num_day_grace_period : number  = 3;
  extension_fee_per_day : number = 10;
  is_active : boolean = true;
  status : string = "For Review";
  created_at : Date = new Date();
  updated_at : Date = new Date();
  aprroved_date : Date = new Date();
  is_approved : boolean = false;
  release_by : Users = new Users();
  release_date : Date = new Date();
  is_release : boolean = false;
  amount_interest_per_month : number = 0;
  total_amount_loan_and_interest : number = 0;
  loanContributionBreakDown : LoanContributionBreakDown[] = [];
  loan_logs : LoanContributionBreakDown[] = [];
  no_months : number = 0;
  is_paid : boolean = false;
  paid_off_date : Date = new Date();
  verified_by : Users = new Users();
  verified_date : Date = new Date();
  users : Users = new Users();
  approved_by : Users = new Users();

}
