import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RuleOfHundred } from 'src/app/shared/model/rule/rule-of-hundred.model';
import { RuleOfHundredService } from 'src/app/shared/Services/AdminSettings/Rule/rule-of-hundred.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rules-of-hundred',
  templateUrl: './rules-of-hundred.component.html',
  styleUrls: ['./rules-of-hundred.component.css']
})
export class RulesOfHundredComponent {

  penaltyList : any;
    constructor(private router:Router,private activatedroute:ActivatedRoute, private http: HttpClient)
    {
        this.penaltyList = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];         
    }
    
    service: RuleOfHundredService = new RuleOfHundredService(this.http);
    model : RuleOfHundred = new RuleOfHundred();  
    listOfRule : any;
    listOfRuleUI : any;
    isCreateRules : boolean = false;
    _rule : string = '';
    _penalty : number = 0;
    
    ngOnInit() {
      this.OnLoad();
    }
    OnLoad()
    {
        this.service.get().subscribe(
          {
            next: (data) =>
            {
              console.log(data);
              this.listOfRule = data.rules;
              this.listOfRuleUI = data.rules;
            },
            error: (error) => {
              console.log(error)
            },
            complete: () => {
                console.log('complete')
            }
          }
        );
    }

    isCreateRulesAction()
    {
      this.isCreateRules = !this.isCreateRules;
    }

    SaveAdminAction()
    {      
      debugger;
      if(this.model.id == 0) // create
      {
          this.createAction();
      }
      else
      {
          if(this.updateValidation(this.model.id))
          { 
              this.updateAction();
          }
          else
          {
            Swal.fire({
              title: "Warning!",
              text: "There are no changes! \nThe data will remain the same.",
              icon: "warning",
              confirmButtonText: "Ok"
            });
          }
      }        
    }

    updateValidation(id: any)
    {      
      var rule = this.listOfRule.filter(
        function (e : any)
        {
          // console.log(e.id + " " + id);
          if(e.id == id)
          {
            return e;
          }    
        });

        if(this._penalty != Number(rule[0].penalty) || this._rule !=  rule[0].rule)
        {
          return true;
        }
        else
        {
          return false;
        }
    }

    updateAction()
    {
      this.model.penalty = this._penalty;
      this.model.rule = this._rule;
      this.service.update(this.model).subscribe({
        next : (data) =>
        {                
          console.log(data);
          Swal.fire({
            title: "Success!",
            text: "Rule is updated!.",
            icon: "success",
            confirmButtonText: "Ok"
          });
          this.listOfRule = data.rules;
          this.listOfRuleUI = data.rules;
          this.isCreateRules = !this.isCreateRules;
          this.model = new RuleOfHundred();  
        },
        error: (error) => {
          console.log(error)
          Swal.fire({
            title: "Error!",
            text: "Failed to update!",
            icon: "error",
            confirmButtonText: "Ok"
          });
        },
        complete: () => {
            console.log('complete')
        }
      });
    }

    createAction()
    {
      this.model.penalty = this._penalty;
      this.model.rule = this._rule;
      if(this.model.penalty != 0 || this.model.rule != '')
        {
            this.service.create(this.model).subscribe({
              next : (data) =>
              {                
                console.log(data);
                Swal.fire({
                  title: "Success!",
                  text: "Rule is created!.",
                  icon: "success",
                  confirmButtonText: "Ok"
                });
                this.listOfRule = data.rules;
                this.listOfRuleUI = data.rules;
                this.isCreateRules = !this.isCreateRules;
                this.model = new RuleOfHundred();  
              },
              error: (error) => {
                console.log(error)
                Swal.fire({
                  title: "Error!",
                  text: "Failed to create!",
                  icon: "error",
                  confirmButtonText: "Ok"
                });
              },
              complete: () => {
                  console.log('complete')
              }
            });
            
        }
        else
        {
          Swal.fire({
              title: "Warning!",
              text: "Please fill out the necessary field!.",
              icon: "warning",
              confirmButtonText: "Ok"
            });
        }
    }

    pickRuleAction(id: any)
    {
        var rule = this.listOfRule.filter(
          function (e : any)
          {
            // console.log(e.id + " " + id);
            if(e.id == id)
            {
              return e;
            }    
          });

          this.model = rule[0];
          this._penalty = Number(rule[0].penalty);
          this._rule = String(rule[0].rule);
          this.isCreateRules = true;
    }

    pickRuleDeleteAction(m : any)
    {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.delete(m).subscribe({
            next : (data) =>
            {                
              console.log(data);
              Swal.fire({
                title: "Success!",
                text: "Rule is deleted!.",
                icon: "success",
                confirmButtonText: "Ok"
              });
              this.listOfRule = data.rules;
              this.listOfRuleUI = data.rules;
              this.isCreateRules = !this.isCreateRules;
              this.model = new RuleOfHundred();  
            },
            error: (error) => {
              console.log(error)
              Swal.fire({
                title: "Error!",
                text: "Failed to delete!",
                icon: "error",
                confirmButtonText: "Ok"
              });
            },
            complete: () => {
                console.log('complete')
            }
          });
        }
      });
    }
}
