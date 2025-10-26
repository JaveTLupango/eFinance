import { SystemLogs } from "../../../systemLogs/system-logs.model";

export class FundHistory {
     id : number = 0;
     userid : string = '';
     bank_id : string = '';
     transaction_type : string = '';
     type : string = '';
     amount : number = 0;
     credit_amount : number = 0;
     debit_amount : number = 0;
     notes : string = '';
     loan_account_id : string = '';
     credit_account_id : string = '';
     created_at : string = '';
     updated_at : string = '';
     system_logs : SystemLogs = new SystemLogs();
}
