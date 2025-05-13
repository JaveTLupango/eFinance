import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Penalty, WhoIsPenalty } from 'src/app/shared/model/AdminSettings/penalty/penalty.model';
import { PenaltyService } from 'src/app/shared/Services/AdminSettings/penalty/penalty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.component.html',
  styleUrls: ['./penalty.component.css']
})
export class PenaltyComponent {

    constructor(private router:Router,private activatedroute:ActivatedRoute, private http: HttpClient)
    {
  
    }
    isCreate : boolean = false;
    service : PenaltyService = new PenaltyService(this.http);
    ruleList :any ;
    penaltyList : any;
    model : Penalty = new Penalty();
    penaltyID : number = 0 ;
    userID : number = 0;
    whoIsList : any;
    whoIsModel : WhoIsPenalty = new WhoIsPenalty();
    // whoIsModelList : WhoIsPenalty[] = [];

    ngOnInit() 
    {
      this.OnLoad();
    }

    OnLoad()
    {
        this.service.get().subscribe(
          {
            next: (data)=>
            {
              console.log(data);
              if(data.StatusCode == 200)
                {
                  this.ruleList = data.rules;
                  this.penaltyList = data.penaltyList;  
                  this.whoIsList = data.who_is;   
                  this.whoIsPenaltyComputation();
                }
            },
            error(e:any)
            {
              console.log(e);
            }
          }
        );
    }

    whoIsPenaltyComputation()
    {
      // this.whoIsModelList = [];;
        this.whoIsList.forEach((e:any)=> {
          var totalAmount = 0;
          this.whoIsModel = new WhoIsPenalty();
          this.whoIsModel.name = e.firstname;
            e.penalty.forEach((i:any) => {
                totalAmount = Number(totalAmount)+Number(i.amount);
                console.log(totalAmount + '-' + i);
            });
            this.whoIsModel.totalAmount = totalAmount;
            this.whoIsModel.totalPayableAmount = totalAmount - this.whoIsModel.TotalDepositAmount;
            console.log(this.whoIsModel);
            // this.whoIsModelList.push(this.whoIsModel);            
            // console.log(this.whoIsModelList);
        });
    }

    onchange()
    {
      debugger;
      var id = Number(this.penaltyID);
      var res = this.ruleList.filter(
          function(e: any)
          {
              if(e.id === id)
              {
                return e;
              }
          }
        );

        this.model.mistake = res[0].rule;
        this.model.amount = res[0].penalty;
    }

    onchangeWhoIs()
    {
      var id = Number(this.userID);
      var res = this.whoIsList.filter(        
          function(e: any)
          {
              if(e.id === id)
              {
                return e;
              }
          }        
      );

      this.model.userid = this.userID;
      this.model.who_is = String(this.userID);
      this.model.name = res[0].firstname+ " "+ res[0].lastname;
      this.model.type = "missed";
    }

    SaveAdminAction()
    { 
      if(this.penaltyID != 0 && this.userID != 0)
      {
        this.service.create(this.model).subscribe(
          {
            next: (data)=>
            {
              if(data.StatusCode == 200)
                { debugger;
                  this.ruleList = data.rules;
                  this.penaltyList = data.penaltyList;  
                  this.whoIsList = data.who_is;  
                  this.isCreate = false;
                  
                   Swal.fire({
                                    title: "Success!",
                                    text: "Penalty Created!.",
                                    icon: "success",
                                    confirmButtonText: "Ok"
                                  });
                }
                else
                {
                  Swal.fire({
                    title: "Error!",
                    text: "Transaction Failed!.",
                    icon: "error",
                    confirmButtonText: "Ok"
                  });
                }
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                title: "Error!",
                text: "Transaction Failed!",
                icon: "error",
                confirmButtonText: "Ok"
              });
            }
          }
        );
      }
      else
      {
        Swal.fire({
          title: "Warning!",
          text: "Please select Mistake and WhoIs option!.",
          icon: "warning",
          confirmButtonText: "Ok"
        });
      }
     
    }

    isCreateAction()
    {
      this.isCreate = !this.isCreate;
    }


   
}
