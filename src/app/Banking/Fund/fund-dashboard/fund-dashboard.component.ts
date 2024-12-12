import { Component } from '@angular/core';

@Component({
  selector: 'app-fund-dashboard',
  templateUrl: './fund-dashboard.component.html',
  styleUrls: ['./fund-dashboard.component.css']
})
export class FundDashboardComponent {

  isCreateWallet: boolean = false;


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

  }

}
