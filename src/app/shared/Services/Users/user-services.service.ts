import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURL } from '../../model/base/base-url.model';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  constructor(private http: HttpClient) { }
  baseurl : BaseURL = new BaseURL();
  
  getlistofuser()
  {
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/get-list-user";
        return this.http.get<any>(apiURL,{headers});
  }

  deleteUser(id:number)
  {
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/user/delete?id="+id;
        return this.http.post<any>(apiURL,{headers});
  }

  blockUser(id:number)
  {
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/user/block?id="+id;
        return this.http.post<any>(apiURL,{headers});
  }

  recoverUser(id:number)
  {
    const headers = new HttpHeaders()
            .set("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    const apiURL = this.baseurl.url_api+"/user/recover?id="+id;
        return this.http.post<any>(apiURL,{headers});
  }

}
