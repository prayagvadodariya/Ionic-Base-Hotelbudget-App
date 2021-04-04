import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from "../../services/constant";


@Component({
  selector: 'app-invoice-progress',
  templateUrl: './invoice-progress.page.html',
  styleUrls: ['./invoice-progress.page.scss'],
})
export class InvoiceProgressPage implements OnInit {

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
      // console.log(this.params);
    }
  }

  ngOnInit() {
    let dic = { expenseId: this.params, userId: this.userData.userId };
    this.invoiceProgressClick(dic);
    // console.log("parameter->>>",dic);
  }

  invoiceProgressClick(dic)
   {
    this.constant.LoadingPresent();
    this.service.invoiceProgressAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        this.invoiceStepArr = result.data;
        this.invoiceCom_Step_class = this.invoiceStepArr.cmp_step_class;
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
