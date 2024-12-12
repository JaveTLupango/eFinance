import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleted-users',
  templateUrl: './deleted-users.component.html',
  styleUrls: ['./deleted-users.component.css']
})
export class DeletedUsersComponent {
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
