import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    role : any = localStorage.getItem('UserRole');
    userRole : boolean= false;
    ngOnInit()
    {
      this.userRole = this.role == 1 ? true : false;
      console.log(localStorage.getItem('UserRole'));
    }
}
