import { Injectable } from '@angular/core';
import { Salary } from '../../model/salary/salary.model';
import { BaseURL } from '../../model/base/base-url.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient) { }

  Insert(model : Salary, baseurl : BaseURL)
  {
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    return this.http.post<any>(baseurl.url_api+'/salary/insert', model,{headers});
  }

}
