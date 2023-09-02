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
    fetch(baseurl.url_api+"/user/logout", {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);        
        localStorage.clear(); 
          Swal.fire(
                'User Logout!',
                "Users successfully logout",
                'success'
              )
      }  
      )
      .catch(error => {
        console.log('error', error);
        Swal.fire(
                'Login Failed!',
                error.message,
                'warning'
              )
      });  
  }
  
}
