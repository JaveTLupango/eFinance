import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountLoansRequest } from 'src/app/shared/model/AcountLoansRequest/account-loans-request.model';
import { LoanContributionBreakDown } from 'src/app/shared/model/bank/contributionBreakDown/contribution-break-down';
import { AdminAction, ProofOfPayment } from 'src/app/shared/model/proofOfPayment/proof-of-payment.model';
import { LoanPaymentService } from 'src/app/shared/Services/bank/loan/loan-payment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-loan-term-details',
  templateUrl: './user-loan-term-details.component.html',
  styleUrls: ['./user-loan-term-details.component.css']
})
export class UserLoanTermDetailsComponent {

  form: FormGroup | undefined;

  constructor(private router:Router,private activatedroute:ActivatedRoute, private http: HttpClient,
    public fb: FormBuilder
  )
  {
    this.form = this.fb.group({
      image : null
    });
  }
  user_id = Number(localStorage.getItem('UserId'));
  retval : any;
  loanInfo : AccountLoansRequest = new AccountLoansRequest();
  service : LoanPaymentService = new LoanPaymentService(this.http);
  loanContributionBreakDown : LoanContributionBreakDown[] = [];
  role : any = localStorage.getItem('UserRole');
  userRole : boolean= false;
  monthNow: string = '';
  dateNow : Date = new Date();
  totalAmountOverDue : number = 0;
  totalAmountDue : number = 0;
  totalPayableAmount : number = 0;
  paidAsOfThisMonth : number = 0;
  loanTerm : any;
  base64String: string = '';
  isShowAttached : boolean = false;
  listOfAttachment : any;
  showModal : boolean = false;
  listOfSystemLogs : any;
  


  /// Proof Of Payment
  proofOfPayment : ProofOfPayment = new ProofOfPayment();

  ngOnInit() {
    this.userRole = this.role == 1 ? true : false; // true admin, false user
    this.monthNow = this.dateNow.toLocaleString('default', { month: 'long' });
    this.retval =history.state;
    console.log(this.retval);
    this.loanInfo = this.retval.loanInfo;
    this.loanContributionBreakDown = this.loanInfo.loan_logs;
    this.loanTerm = this.retval.term;
    console.log(this.loanTerm);
    this.getAttachedLoadPayment();
    this.getTotalPayableAmount();
    }


  getAttachedLoadPayment()
  { 
    var payload = {
      'id': this.loanTerm.id
    };
    this.service.getAttachment(payload).subscribe(data =>
    {
      this.listOfAttachment = data.data;
      console.log(this.listOfAttachment);
      this.listOfSystemLogs = data.systemlogs;      
      console.log(this.listOfSystemLogs);
    }
    );
  }

  count_term(model: LoanContributionBreakDown[])
  {
    return model.length;
  }

  getTotalPayableAmount()
  {
    var a = new Date();
    var monthNum = a.getMonth();

    this.loanInfo.loan_logs.forEach(e => {

          var month = new Date(e.due_date);
          var eMonthNum = new Date(e.due_date).getMonth();
            if(!Boolean(e.is_paid) && month <= a)
            {
              this.totalAmountOverDue =  Number(this.totalAmountOverDue) + Number(e.amount)
            }

            if(!Boolean(e.is_paid) && eMonthNum == monthNum)
            {
              this.totalAmountDue = Number(this.totalAmountDue) + Number(e.amount);
            }

            if(!Boolean(e.is_paid))
            {
              this.totalPayableAmount = Number(this.totalPayableAmount) + Number(e.amount);
            }

            if(Boolean(e.is_paid) && eMonthNum == monthNum)
            {
              this.paidAsOfThisMonth =  Number(this.paidAsOfThisMonth) + Number(e.amount);
            }
    });
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
           this.base64String= btoa(binaryString);
   }

  onFileSelected(event: any): void {

    var files = event.target.files;
    var file = files[0];
     this.proofOfPayment.file_size = file?.size;
     this.proofOfPayment.file_name = file?.name;
     this.proofOfPayment.file_type = file?.type;

      if (files && file) {
          var reader = new FileReader();
          reader.onload =this._handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
      }
  }

  showAttached(action : boolean)
  {
      this.proofOfPayment = new ProofOfPayment();
      this.isShowAttached = action;
  }

  SaveProofOfPayment()
  {
    //user_loan_account_logs
      this.proofOfPayment.file_id = this.loanTerm.id;
      this.proofOfPayment.termID = this.loanTerm.term_no;
      this.proofOfPayment.file_location = 'user_loan_account_logs';
      this.proofOfPayment.image = this.base64String;
      this.proofOfPayment.file_extention = this.getfileExt(this.proofOfPayment.file_name);
      this.proofOfPayment.user_id = this.user_id;
      this.service.Insert(this.proofOfPayment).subscribe( data=>
      {
        if(data.StatusCode == 200)
        {
          Swal.fire({
            title: "Success!",
            text: "Successfully Attach Payment Reciept!",
            icon: "success",
            confirmButtonText: "Ok"
          }).then((result) => {
            if (result.isConfirmed) {
            this.listOfAttachment = data.data;
            this.listOfSystemLogs = data.systemlogs;
            }
          });
          // Swal.fire({
          //   position: 'top-end',
          //   icon: 'success',
          //   title: 'Successfully Attach Payment Reciept!',
          //   showConfirmButton: false,
          //   timer: 2000
          // }); 
        }
        else
        {
          alert('error');
          console.log(data);
        }
      });

  }

  getfileExt(filename: string)
  {
      var sptStr = filename.split('.');
      return sptStr[sptStr.length - 1];
  }

  viewAttachment(item : any) 
  {debugger;
    this.proofOfPayment = new ProofOfPayment();
    this.proofOfPayment.image = item.attachments.image;
    this.showHideModal();
  }

  showHideModal()
  {
    this.showModal = !this.showModal;
  }

  requestApprove_Reject(action : boolean)
  {
    this.proofOfPayment.adminAction = new AdminAction();
    this.proofOfPayment.adminAction.is_action = true;
    if(action)
    {
      this.proofOfPayment.adminAction.is_approve = true;
    }
    else
    {
      this.proofOfPayment.adminAction.is_reject = true;
    }
  }

  SaveAdminAction()
  {
    this.proofOfPayment.file_id = this.loanTerm.id;
    this.proofOfPayment.user_id = this.user_id;
    this.proofOfPayment.system_link_id = this.loanTerm.id;
    
    if(this.proofOfPayment.adminAction.is_reject && !this.proofOfPayment.adminAction.is_approve)
    {
      this.rejectByAdmin();
    }
    else if(!this.proofOfPayment.adminAction.is_reject && this.proofOfPayment.adminAction.is_approve)
    {
      this.approvedByAdmin();
    }
  }
  rejectByAdmin()
  {
    this.proofOfPayment.adminAction.is_action = false;

    Swal.fire({
      title: "Are you sure you want to reject?",
      text: "This amount wont added to the resource!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.rejectAdmin(this.proofOfPayment).subscribe(data=>
          {
            if(data.StatusCode == 200)
              {              
                Swal.fire({
                  title: "Success!",
                  text: "Successfully Rejected Payment Reciept!",
                  icon: "success",
                  confirmButtonText: "Ok"
                }).then((result) => {
                  if (result.isConfirmed) {
                  this.listOfAttachment = data.data;
                  this.listOfSystemLogs = data.systemlogs;
                  }
                });  
              }
              else
              {
                console.log(data);
                Swal.fire({
                  title: "Error Occurs!",
                  text: "Unsuccessfully Reject Payment Reciept!",
                  icon: "error",
                  confirmButtonText: "Ok"
                }).then((result) => {
                  if (result.isConfirmed) {
                  this.listOfAttachment = data.data;
                  this.listOfSystemLogs = data.systemlogs;
                  }
                });  
                // alert('error');
                // console.log(data);
              }
          });
      }
    });

   
  }

  approvedByAdmin()
  {
    this.proofOfPayment.adminAction.is_action = false;
    Swal.fire({
      title: "Are you sure you want to approve?",
      text: "This amount automatically added to the resource!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!"
    }).then((result) => {
      if (result.isConfirmed) {
       
        this.service.approvedAdmin(this.proofOfPayment).subscribe(data=>
          {
            if(data.StatusCode == 200)
            {              
              Swal.fire({
                title: "Success!",
                text: "Successfully Approved Payment Reciept!",
                icon: "success",
                confirmButtonText: "Ok"
              }).then((result) => {
                if (result.isConfirmed) {
                this.listOfAttachment = data.data;
                this.listOfSystemLogs = data.systemlogs;
                }
              });  
            }
            else
            {
              Swal.fire({
                title: "Error Occurs!",
                text: "Unsuccessfully Approved Payment Reciept!",
                icon: "error",
                confirmButtonText: "Ok"
              }).then((result) => {
                if (result.isConfirmed) {
                this.listOfAttachment = data.data;
                this.listOfSystemLogs = data.systemlogs;
                }
              });  
              // alert('error');
               console.log(data);
            }
          });

      }
    });

    
  }

  closeAdminAction()
  {
      this.proofOfPayment.adminAction.is_action = false;
  }

  
}
