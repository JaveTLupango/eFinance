export class AcountSavingsRequest {
  accountName : string = '';
  targetMonthlyContribution : number = 0;
  monthlyTerm : number = 0;
  expectedAmountPerTerm : number = 0;
  gracePeriod : number  = 0;
  extentionFeePerDay : number = 0;
  uniqueId : number = 0;
  expectedToPaid :Date = new Date();
}
