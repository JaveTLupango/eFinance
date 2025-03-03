import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bank_wallet_funds } from 'src/app/shared/model/bank/fund/wallet/wallet.model';
import { FundserviceService } from 'src/app/shared/Services/bank/fund/fundservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fund-dashboard',
  templateUrl: './fund-dashboard.component.html',
  styleUrls: ['./fund-dashboard.component.css']
})
export class FundDashboardComponent {

  constructor(private router:Router,private activatedroute:ActivatedRoute, private http: HttpClient)
  {

  }

  service: FundserviceService = new FundserviceService(this.http);
  banklist : any;
  listBankType : any;
  bankType : any;
  admin_users : any;
  isCreateWallet: boolean = false;
  user_id = Number(localStorage.getItem('UserId'));
  filteredlistBankType : any = [];
  model : bank_wallet_funds = new bank_wallet_funds();

  sBankList: any;
  ngOnInit() {
      this.OnLoad();
  }

  OnLoad()
  {
      this.service.get().subscribe({
        next: (data) =>
          {
            console.log(data);
            if(data.StatusCode == 200)
            {
              this.banklist = data.banklist;
              console.log(this.banklist);
              this.listBankType = data.listbanktype;
              this.bankType = data.banktype;
              this.admin_users = data.admin_users;
              console.log(this.bankType);
              this.filteredlistBankType = this.listBankType;              
              
            }
            else{
              console.log(data)
            }
          },
          error: (error) => {
            console.log(error)
          },
          complete: () => {
              console.log('complete')
          }
      });
  }



  showCreateWallet()
  {
      this.isCreateWallet = true;
  }

  hideCreateWallet()
  {
    this.isCreateWallet = false;
  }

  SaveAdminAction()
  {
    debugger;
      this.isCreateWallet = false;
      this.service.create(this.model).subscribe(
        {
          next: (data) =>
            { debugger;
              if(data.StatusCode == 200)
              {
                this.banklist = data.banklist;
                this.listBankType = data.listbanktype;
                this.bankType = data.banktype;
                this.admin_users = data.admin_users;
                this.filteredlistBankType = this.listBankType;

                Swal.fire({
                  title: "Success!",
                  text: "Wallet Account Created!.",
                  icon: "success",
                  confirmButtonText: "Ok"
                });
              }              
            },
            error: (error) => {
              console.log(error)
              Swal.fire({
                title: "Error!",
                text: "Wallet Account was not successfully Created!.",
                icon: "error",
                confirmButtonText: "Ok"
              });
            },
            complete: () => {
                console.log('complete')
            }
        }
      );
  }

  onchangeBankType()
  {
    var stype = this.model.bank_type;
    this.filteredlistBankType = this.listBankType.filter(
      function (e : any)
      {
        if(e.type === stype)
        {
          return e;
        }

      });
  }

  ChangeValue()
  {
    var ownerID = this.model.wallet_owner;
    var ownerName = "";
    this.admin_users.filter(
      function(e:any)
      {
          if(e.id === Number(ownerID))
          { 
            // ownerName = e.firstname + " " + e.middlename + " " +e.lastname ;     
            if(e.firstname !== null)
            {
              ownerName += e.firstname + ' ';
            }    
            if(e.middlename !== null)
            {
              ownerName += e.middlename + ' ';
            } 
            if(e.lastname !== null)
            {
              ownerName += e.lastname + ' ';
            }              
          }
      }
    );

    this.model.wallet_owner_name = ownerName;

  }


}
