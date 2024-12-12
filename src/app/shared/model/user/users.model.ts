import { AccountLoansRequest } from "../AcountLoansRequest/account-loans-request.model";

export class Users {
  id: number = 0;
  firstname : string = '';
  middlename: string = '';
  lastname: string = '';
  is_active: boolean = false;
  is_deleted: boolean = false;
  is_verified: boolean = false;
  user_role: number = 0;
  username: string = '';
  email: string = '';
  updated_at: string = '';
  email_verified_at: string ='';
  created_at: string = '';
  total_loan_amount : number = 0;
  loan_account : AccountLoansRequest[] = [];
}
