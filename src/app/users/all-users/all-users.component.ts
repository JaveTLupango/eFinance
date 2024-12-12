import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from 'src/app/shared/Services/Users/user-services.service';
import { Users } from 'src/app/shared/model/user/users.model';
import Swal from 'sweetalert2';

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

    deleteUser(id : number)
    {
      this.services.deleteUser(id).subscribe({
        next: (data) =>
            {
              if(data.status_code == 200)
              {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'User successfully deleted!',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
            },
        error: (error) => {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: 'User unsuccessfully deleted!',
                      showConfirmButton: false,
                      timer: 2000
                    });
            },
        complete: () => {
                this.onLoad();
            }
      });
    }

    blockUser(id : number)
    {
      this.services.blockUser(id).subscribe({
        next: (data) =>
            {
              if(data.status_code == 200)
              {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'User successfully blocked!',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
            },
        error: (error) => {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: 'User unsuccessfully blocked!',
                      showConfirmButton: false,
                      timer: 2000
                    });
            },
        complete: () => {
                this.onLoad();
            }
      });
    }

    recoverUser(id : number)
    {
      this.services.recoverUser(id).subscribe({
        next: (data) =>
            {
              if(data.status_code == 200)
              {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'User successfully recovered!',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
            },
        error: (error) => {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: 'User unsuccessfully recovered!',
                      showConfirmButton: false,
                      timer: 2000
                    });
            },
        complete: () => {
                this.onLoad();
            }
      });
    }
}
