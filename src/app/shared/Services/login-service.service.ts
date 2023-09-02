import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';
import { BaseURL } from 'src/app/shared/model/base/base-url.model';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(formValueLogin : Login, baseurl : BaseURL)
  {
      return this.http.post<any>(baseurl.url_api+'/login/user', formValueLogin);
  }

}
