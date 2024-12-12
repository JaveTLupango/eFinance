import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../model/register/register-model.model';
import { BaseURL } from '../model/base/base-url.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) { }

  register(model : RegisterModel, baseurl : BaseURL)
  {
    return this.http.post<any>(baseurl.url_api+'/register/user', model);
  }
}
