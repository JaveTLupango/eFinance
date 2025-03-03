export class Wallet {
  active_balance_amount : number = 0;
  active_prev_balance_amount	: number = 0;
  freeze_balance_amount : number = 0;
  freeze_prev_balance_amount : number = 0;
}

export class bank_wallet_funds
{
  id : number = 0;
  account_no : string = '';
  bank_name : string = '';
  wallet_owner : string = '';
  wallet_owner_name : string = '';
  owner : any;
  active_balance_amount : number = 0;
  active_prev_balance_amount : number = 0;
  last_update : any;
  last_status_update : string = '';
  types : bank_wallet_types = new bank_wallet_types();
  bank_type : number = 0;
  prefix : string = '';
}

export class bank_wallet_types
{
  id : number = 0;
  type : string = '';
  name : string = '';
}
