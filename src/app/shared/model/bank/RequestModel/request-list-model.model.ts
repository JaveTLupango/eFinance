import { ContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
import { AcountSavingsRequest } from '../AccountSavingsRequest/acount-savings-request';

export class RequestListModel {
    user_id:number = 0;
    savings_id:number = 0;
    loan_id:number = 0;
    listmodel: ContributionBreakDown[] = [];
    savings_info: AcountSavingsRequest = new AcountSavingsRequest();
}
