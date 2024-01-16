import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  constructor(private router: Router){}
  role : any = localStorage.getItem('UserRole');
  userRole : boolean= false;
  ngOnInit()
  {
    this.userRole = this.role == 1 ? true : false;
    console.log(localStorage.getItem('UserRole'));
    if(!this.userRole)
    {
      this.router.navigate(['user-access-404']);
      
    }
  }
}
