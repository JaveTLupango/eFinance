import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ngOnInit() {
      this.OnLoad();
  }
  OnLoad()
  {
    this.service.get().subscribe({
      next: (data) =>
      {
         console.log(data)
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
          console.log('complete')
      }
    });
  }
}
