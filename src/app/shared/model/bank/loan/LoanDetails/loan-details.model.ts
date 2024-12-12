import { AccountLoansRequest } from "../../../AcountLoansRequest/account-loans-request.model";

export class LoanDetails {
    loan_count : number = 0;
    total_loan_amount : number = 0;
    due_amount : number = 0;
    due_date : Date = new Date();
    list_of_account : AccountLoansRequest[] = [];
}
