import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURL } from 'src/app/shared/model/base/base-url.model';
import { ProofOfPayment } from 'src/app/shared/model/proofOfPayment/proof-of-payment.model';

@Injectable({
  providedIn: 'root'
})
export class LoanPaymentService {

  constructor(private http: HttpClient) { }
  baseurl : BaseURL = new BaseURL();

  Insert(model : ProofOfPayment)
  {
    model.system_link_id = model.file_id;
    model.system_link_key = "LOAN";
    model.task_notes = 'Make Payment | Loan '+ model.termNumber +' | Amount P'+ model.amount + ' Notes: ' + model.notes;
    model.task_action_logs = 'Payment';
    model.task_action_from = 'user-loan-term-details';    
    const headers = new HttpHeaders()
        .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/loan/payment";
    return this.http.post<any>(apiURL,model,{headers});
  }

  getAttachment(model : any)
  {
    const headers = new HttpHeaders()
        .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/loan/paymentattached";
    return this.http.post<any>(apiURL,model,{headers});
  }

  rejectAdmin(model : any)
  { debugger;
    model.system_link_key = "LOAN";
    model.task_notes = 'Rejected | Loan '+ model.termNumber +' | Notes: ' + model.notes;
    model.task_action_logs = 'Approval';
    model.task_action_from = 'user-loan-term-details';    
    const headers = new HttpHeaders()
    .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/loan/reject_by_admin";
    return this.http.post<any>(apiURL,model,{headers});
  }

  approvedAdmin(model : any)
  { debugger;
    model.system_link_key = "LOAN";
    model.task_notes = 'Approved | Loan '+ model.termNumber +' | Notes: ' + model.notes;
    model.task_action_logs = 'Approval';
    model.task_action_from = 'user-loan-term-details';    
    const headers = new HttpHeaders()
    .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/loan/approved_by_admin";
    return this.http.post<any>(apiURL,model,{headers});
  }

}
