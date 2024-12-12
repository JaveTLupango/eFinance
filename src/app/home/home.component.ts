import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private router: Router){}
    role : any = localStorage.getItem('UserRole');
    userRole : boolean= false;
    ngOnInit()
    {
      this.userRole = this.role == 1 ? true : false;
      console.log(localStorage.getItem('UserRole'));
      // if(!this.userRole)
      // {
      //   this.router.navigate(['']);
      // }
    }
}
