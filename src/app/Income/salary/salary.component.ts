import { BaseURL } from 'src/app/shared/model/base/base-url.model';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SalaryService } from 'src/app/shared/Services/salary/salary.service';
import { Salary } from 'src/app/shared/model/salary/salary.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent {

  constructor(private http: HttpClient)
  {

  }

  salaryService : SalaryService = new SalaryService(this.http);
  salaryModel : Salary = new Salary();
  baseURL : BaseURL = new BaseURL();
  salaryList : Salary[] | undefined;

  onSubmit()
  {
      if(this.salaryModel.amount == 0 || this.salaryModel.source == '' || this.salaryModel.date == '')
      {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Please fill out the nessesary fields!',
          showConfirmButton: false,
          timer: 2000
        });
      }
      else{        
        this.salaryModel.user_id = Number(localStorage.getItem('UserId'));
        this.salaryService.Insert(this.salaryModel, this.baseURL).subscribe(
          data =>
          {
            console.log(data);
          }
        );
      }
      
  }

}
