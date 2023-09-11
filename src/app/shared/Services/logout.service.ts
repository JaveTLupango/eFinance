import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseURL } from '../model/base/base-url.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(private http: HttpClient,private router: Router) { }

  logout(baseurl : BaseURL)
  {
    console.log(baseurl);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('AuthToken'));
    myHeaders.append("Accept", "application/json");
    return fetch(baseurl.url_api+"/user/logout", {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    });
  }
  
}
