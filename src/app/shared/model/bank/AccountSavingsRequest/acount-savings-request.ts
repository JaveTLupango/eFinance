import { ContributionBreakDown } from "../contributionBreakDown/contribution-break-down";

export class AcountSavingsRequest {
  user_id : number = 0;
  account_name : string = '';
  target_monthly_contribution : number = 0;
  amount : number = 0;
  monthly_term : number = 0;
  expected_amount_per_term : number = 0;
  grace_period : number  = 0;
  extention_fee_per_day : number = 0;
  uniqueId : number = 0;
  expected_to_paid :Date = new Date();
  listmodel: ContributionBreakDown[] = [];
}
