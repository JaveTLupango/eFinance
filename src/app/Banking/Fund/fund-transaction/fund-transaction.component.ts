import { WhoIsPenalty } from 'src/app/shared/model/AdminSettings/penalty/penalty.model';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FundHistory } from 'src/app/shared/model/bank/fund/fundHistory/fund-history.model';
import { FundHistoryService } from 'src/app/shared/Services/bank/fund/fundHistory/fund-history.service';
import Swal from 'sweetalert2';
import { SystemLogsService } from 'src/app/shared/Services/SystemLogs/system-logs.service';

@Component({
  selector: 'app-fund-transaction',
  templateUrl: './fund-transaction.component.html',
  styleUrls: ['./fund-transaction.component.css']
})
export class FundTransactionComponent {
    constructor(private router:Router,private activatedroute:ActivatedRoute, private http: HttpClient)
    { }
  service: FundHistoryService = new FundHistoryService(this.http);
  isCreate : boolean = false;
  modelList : any = [];
  model : FundHistory = new FundHistory();
  admin_users : any;
  transaction_type : any = ['Credit', 'Debit'];
  type : any = ['Penalty', 'Loan', 'Deposit Shared', 'Others'];
  banklist : any = [];
  systemLogs : SystemLogsService = new SystemLogsService();
  sysLogs : string = '';

  ngOnInit() {
      this.OnLoad();
  }
  OnLoad()
  {
    this.service.get().subscribe({
      next: (data) =>
      {
         console.log(data)
         this.modelList = data.historylist;
         this.admin_users = data.admin_users;
         this.banklist = data.banklist;
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
          console.log('complete')
      }
    });
  }

  IsCreate()
  {
    this.isCreate = !this.isCreate;
  }

  SaveAdminAction()
  {
     if(this.Validation() == true)
      {
        this.sysLogs = '';   
        if(this.model.transaction_type == 'Credit')
          {
            this.model.credit_amount = this.model.amount;            
          }
          else{
            this.model.debit_amount = this.model.amount;
          }
          this.sysLogs = 'Insert|'+'FundTransactionTogs|'+ this.model.transaction_type  + '|' + this.model.amount + '|Bank:' + this.model.bank_id + ':User:'+ this.model.userid;

          this.model.system_logs = this.systemLogs.createLogs(
          'Insert', 
          'transaction',
          this.sysLogs,
          '-',
          '-'
        );        
        this.SaveRequest();
      }
  }

  SaveRequest()
  {    
   this.service.create(this.model).subscribe({
            next : (data) =>
            {
              if(data.StatusCode == 200)
              {
                console.log(data);
                this.modelList = data.historylist;
                this.admin_users = data.admin_users;
                this.banklist = data.banklist;  
                Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Successfully saved!",
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.isCreate = !this.isCreate;
              }   
              else
              {    console.log(data);
                    Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "Unsuccessfully saved!",
                      showConfirmButton: false,
                      timer: 1500
                    });
              }
                
            },
            error: (error) =>
            {
                  console.log(error);
                  Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "Unsuccessfully saved!",
                      showConfirmButton: false,
                      timer: 1500
                    });
            },
            complete: () =>
            {
              console.log('complete');
            }
            
          });
      
  }

  Validation()
  {
    var alertSMS = '';
    var retval = true;
    var count = 1;

    if(this.model.userid === '')
    {
      alertSMS += '('+count+') Who Is, Is Required!. \n'; count++;
      retval = false;
    }
    if(this.model.amount === 0)
    {
      alertSMS += '('+count+') Amount Is Required!. \n'; count++;
      retval = false;
    }
    if(this.model.transaction_type === '')
    {
      alertSMS += '('+count+') Transaction Type Is Required!. \n'; count++;
      retval = false;
    }
    if(this.model.type === '')
    {
      alertSMS += '('+count+') Type Is Required!. \n'; count++;
      retval = false;
    }
    if(this.model.bank_id === '')
    {
      alertSMS += '('+count+') Wallet Is Required!. \n'; count++;
      retval = false; 
    }
    if(!retval)
    {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: alertSMS,
      });
    }
    return retval;
  }
}
