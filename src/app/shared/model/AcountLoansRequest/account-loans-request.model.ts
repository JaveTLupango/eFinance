export class AccountLoansRequest {
  accountName : string = '';
  amountLoan : number = 0;
  monthlyTerm : number = 0;
  expectedAmountPerTerm : number = 0;
  gracePeriod : number  = 0;
  extentionFeePerDay : number = 0;
  uniqueId : number = 0;
  expectedDateToPaid :Date = new Date();
  requestDate : Date = new Date();
  noMonthsTerms : number = 0;
  amountInterestPerMonth : number = 0;
  totalAmountLoanAndInterest : number = 0;
}
