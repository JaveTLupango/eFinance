import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountLoansRequest } from 'src/app/shared/model/AcountLoansRequest/account-loans-request.model';
import { BaseURL } from 'src/app/shared/model/base/base-url.model';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {

  constructor(private http: HttpClient) { }
  baseurl : BaseURL = new BaseURL();
  create(model: AccountLoansRequest)
  {
    console.log(localStorage.getItem('AuthToken'));
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/loan/create";
        return this.http.post<any>(apiURL,model,{headers});
  }

  getLoanAccountByUser()
  {
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));

    let queryParams = new HttpParams();
        queryParams = queryParams.append("user_id",Number(localStorage.getItem('UserId')));

    const options = { params: queryParams, headers: headers };

    const apiURL = this.baseurl.url_api+"/loan/getloanlist";

    return this.http.get<any>(apiURL,options);

  }

  getuserwithloans()
  {
    console.log(localStorage.getItem('AuthToken'));
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/loan/getuserwithloans";
        return this.http.get<any>(apiURL,{headers});
  }

  approvedLoanRequest(model: AccountLoansRequest)
  {
    console.log(localStorage.getItem('AuthToken'));
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/loan/requestapproved";
        return this.http.post<any>(apiURL,model,{headers}).subscribe(
          data =>
          {
            console.log(data);
          }
        );
  }

  rejectLoanRequest(model: AccountLoansRequest)
  {
      console.log(localStorage.getItem('AuthToken'));
      const headers = new HttpHeaders()
              .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
      const apiURL = this.baseurl.url_api+"/loan/requestreject";
          return this.http.post<any>(apiURL,model,{headers}).subscribe(
            data =>
            {
              console.log(data);
            }
          );
  }

  releaseLoanRequest(model: AccountLoansRequest)
  {
    console.log(localStorage.getItem('AuthToken'));
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/loan/requestrelease";
        return this.http.post<any>(apiURL,model,{headers}).subscribe(
          data =>
          {
            console.log(data);
          }
        );
  }

  reject_releaseLoanRequest(model: AccountLoansRequest)
  {
    console.log(localStorage.getItem('AuthToken'));
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/loan/requestre_reject";
        return this.http.post<any>(apiURL,model,{headers}).subscribe(
          data =>
          {
            console.log(data);
          }
        );
  }
}

