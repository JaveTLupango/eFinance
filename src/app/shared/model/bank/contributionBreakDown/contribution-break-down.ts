export class ContributionBreakDown {
  id : number = 0;
  savings_id : number = 0;
  term: string = '';
  amount : number = 0;
  due_date	: Date = new Date();
  status : number = 0;
  grace_period : number  = 0;
  extention_fee_per_day : number = 0;
}

export class LoanContributionBreakDown {
  id : number = 0;
  savings_id : number = 0;
  term_no: string = '';
  user_id : number = 0;
  loan_id : number = 0;
  amount : number = 0;
  date : Date = new Date();
  due_date	: Date = new Date();
  is_paid : boolean = false;
  status : number = 0;
  acct_paid_date : Date = new Date();
  approved_by : number = 0;
  aprroved_date : Date = new Date();
  grace_period : number  = 0;
  is_approved : boolean = false;
  is_rejected : boolean = false;
  rejected_by : number = 0;
  rejected_date : Date = new Date();
  remarks : string = '';
  is_payment_recieved : boolean = false;
  payment_recieved_by : number = 0;
  payment_recieved_date : Date = new Date();
}
