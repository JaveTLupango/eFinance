import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURL } from 'src/app/shared/model/base/base-url.model';

@Injectable({
  providedIn: 'root'
})
export class FundserviceService {
  constructor(private http: HttpClient) { }
  baseurl : BaseURL = new BaseURL();

  get()
  {
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/fund/get";
        return this.http.get<any>(apiURL,{headers});
  }

  create(model: any)
  {
    const headers = new HttpHeaders()
    .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/fund/create";
    return this.http.post<any>(apiURL,model,{headers});
  }
}
