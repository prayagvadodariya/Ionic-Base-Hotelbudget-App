import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from "../../services/constant";


@Component({
  selector: 'app-expense-progress',
  templateUrl: './expense-progress.page.html',
  styleUrls: ['./expense-progress.page.scss'],
})
export class ExpenseProgressPage implements OnInit {

  params: any;
  userData: any = [];
  invoiceStepArr:any=[];
  invoiceCom_Step_class:any=[]
  active_step:any=[];
  dataContainer: any;
  
  

  constructor(public activatedRoute: ActivatedRoute, public service: webServicenew, public constant: Constant) {
  
    
    // console.log(this.dataContainer);
    this.userData = this.constant.getUserData();
    if (this.activatedRoute.snapshot.paramMap.get('data')) {
      this.params = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
       console.log(this.params);
    }
  }

  ngOnInit() {
    let dic = { 
      capitalexpenseId: this.params.capitalexpenseId ,
      userId: this.userData.userId
     };
    this.invoiceProgressClick(dic);
    // console.log("parameter->>>",dic);
  }

  invoiceProgressClick(dic)
   {
    this.constant.LoadingPresent();
    this.service.CapitalExpenseProgressAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        this.invoiceStepArr=result.data;
        this.invoiceCom_Step_class=this.invoiceStepArr.cmp_step_class;
        this.active_step =  this.invoiceStepArr.active_step;
        this.constant.ToastCustom(result.message, 'top');
        // console.log( this.invoiceCom_Step_class);
        // let ind = this.expenseList.findIndex(x => x.expenseId === dic.expenseId)
        // this.expenseList.splice(ind, 1);
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });

  }

}
