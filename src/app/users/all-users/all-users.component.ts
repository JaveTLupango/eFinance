import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from 'src/app/shared/Services/Users/user-services.service';
import { Users } from 'src/app/shared/model/user/users.model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {

  constructor(private router: Router, private http: HttpClient){}
    role : any = localStorage.getItem('UserRole');
    userRole : boolean= false;
    list_active : Users[] = [];
    list_block : Users[] = [];
    list_deleted : Users[] = [];
    
    services: UserServicesService = new UserServicesService(this.http);


    ngOnInit()
    {
      this.userRole = this.role == 1 ? true : false;
      console.log(localStorage.getItem('UserRole'));
      if(!this.userRole)
      {
        this.router.navigate(['user-access-404']);        
      }
      else
      {
        this.onLoad();
      }
    }

    onLoad()
    {
      this.services.getlistofuser().subscribe(
        {
          next: (data) =>
                  {
                    if(data.status_code == 200)
                    {
                      this.list_active = data.active_user;
                      this.list_block = data.block_user;
                      this.list_deleted = data.deleted_user;
                    }
                  },
                  error: (error) => {
                    console.log(error)
                  },
                  complete: () => {
                      console.log('complete');
                  }
        }
      );
    }

}
