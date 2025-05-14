import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FundHistory } from 'src/app/shared/model/bank/fund/fundHistory/fund-history.model';
import { FundHistoryService } from 'src/app/shared/Services/bank/fund/fundHistory/fund-history.service';

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

  }
}
