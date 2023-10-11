import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {    
  role : any = localStorage.getItem('UserRole');
  userRole : boolean= false;
  ngOnInit()
  {
    this.userRole = this.role == 1 ? true : false;
  }
}
