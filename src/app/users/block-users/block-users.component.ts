import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-block-users',
  templateUrl: './block-users.component.html',
  styleUrls: ['./block-users.component.css']
})
export class BlockUsersComponent {
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
