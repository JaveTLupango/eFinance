import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcountSavingsRequest } from 'src/app/shared/model/bank/AccountSavingsRequest/acount-savings-request';
import { BaseURL } from 'src/app/shared/model/base/base-url.model';

@Injectable({
  providedIn: 'root'
})
export class SavingsRequestService {

  constructor(private http: HttpClient) { }
   baseurl : BaseURL = new BaseURL();

     create(model: AcountSavingsRequest)
     {
      const headers = new HttpHeaders()
               .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
       const apiURL = this.baseurl.url_api+"/savings/create";
           return this.http.post<any>(apiURL,model,{headers});
     }
}
