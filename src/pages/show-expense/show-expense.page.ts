import { ManageTeamsEditDeleteComponent } from 'src/components/manage-teams-edit-delete/manage-teams-edit-delete.component';
import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, AlertController, Events } from '@ionic/angular';
import { PromptMessageComponent } from '../../components/prompt-message/prompt-message';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from "../../services/constant";

@Component({
  selector: 'app-show-expense',
  templateUrl: './show-expense.page.html',
  styleUrls: ['./show-expense.page.scss'],
})
export class ShowExpensePage implements OnInit {

  hideme: any = [];
  expenseData: any;
  expenseAccountId: any;
  categoryData: any = [];
  userData: any;
  departmentId: any;
  Hotelname: any;
  expenseList: any = [];
  getExpRecord: any;
  HotelnName: any;
  hoteloriginal_id: any;
  requestParam = { userId: 0, departmentId: 0, hotel_id: 0, year: '', month: '', toMonth: '', expenseAccountId: 0, page: 0 };
  getExpencesDataList: any;
  demo:boolean;
  getExpencesList: any;

  constructor(public popoverController: PopoverController, public navCtrl: NavController, public events: Events,
    public activatedRoute: ActivatedRoute, private router: Router, public service: webServicenew, public constant: Constant, public alertCtrl: AlertController) {
   
      this.expenseData = JSON.parse(this.activatedRoute.snapshot.paramMap.get('deptData'));
      console.log('======================================', this.expenseData);
      this.departmentId = JSON.parse(this.activatedRoute.snapshot.paramMap.get('departmentId'));
      this.hoteloriginal_id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('hoteloriginal_id'));
      this.events.subscribe('reload', (data) => {
        // this.requestParam = 
        this.setParamFunction();
      });
      // console.log(this.expenseData);
      // console.log(this.departmentId);
    
    this.userData = this.constant.getUserData();
    // console.log(this.expenseData);
    if(this.userData.roleId==1){
      this.HotelnName = this.constant.hotelName;
      // console.log(this.HotelnName)
    }else if(this.userData.roleId==2){
      this.HotelnName = this.constant.capitalHotelName;
      // console.log(this.HotelnName)
    }
    // this.setParamFunction();
  }
  ionViewWillEnter(){
    this.setParamFunction();
  }
  ngOnInit() {
    
  }
  setParamFunction() {
    this.requestParam.userId = this.userData.userId;
    if(this.constant.year == '' || this.constant.month == '' ||  this.constant.toMonth == ''){
      this.requestParam.year = JSON.parse(this.activatedRoute.snapshot.paramMap.get('year'));
      this.requestParam.month = JSON.parse(this.activatedRoute.snapshot.paramMap.get('month'));
      this.requestParam.toMonth = JSON.parse(this.activatedRoute.snapshot.paramMap.get('month'));
    }else{
      this.requestParam.year = this.constant.year;
      this.requestParam.month = this.constant.month;
      this.requestParam.toMonth = this.constant.toMonth;
    }
   
    this.requestParam.hotel_id = this.hoteloriginal_id;
    this.requestParam.departmentId = this.departmentId;
    this.requestParam.expenseAccountId = this.expenseData.expenseAccountId;
    // this.Hotelname = this.constant.HotelId;
    // console.log(this.requestParam);
    this.getExpenseListFunction();
  }

  
  getExpenseListFunction() {
    // console.log(this.requestParam);
    this.constant.LoadingPresent();
    this.service.getExpenseListAPI(this.requestParam).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        this.categoryData = result.data.remaningAmount;
        // console.log(this.categoryData);
        this.expenseList = result.data.expense.expenses;
        // if (result.data.expense.expenses) {
        //   for (let index = 0; index < result.data.expense.expenses.length; index++) {
        //     this.expenseList.push(result.data.expense.expenses[index]);
        //   }
        // }
        // console.log(this.expenseList);
        // console.log(this.categoryData.departmentName);
        // if (categoryData.length < 20) {
        //   this.infiniteScrollEnable = false
        // }
        // else {
        //   this.infiniteScrollEnable = true;
        // }
        //  console.log(this.categoryData);
        // this.deptDetail = result.data;
        // console.log(this.departmentData);
        // this.MQYsegment = this.deptDetail.current_filter;
        // this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PromptMessageComponent,
      event: ev,
      translucent: true,
      cssClass: 'custom-popover',
    });
    return await popover.present();
  }

  openpopup(ev: any,exp, i){
    this.constant.LoadingPresent();
    let req = { expenseId: exp.expenseId, roleId: this.userData.roleId, userId: this.userData.userId }
    this.service.checkExpenseAPI(req).subscribe(async (result) => {
      this.constant.LoadingHide();
      console.log(result);
      this.demo = result.status;
      if (result.status) {
        this.getExpencesList = result;
        this.getExpRecord = result.data.resultArr;
      }
      var array = [];
      if (this.demo == true){
        array=['Edit Expense','Delete Expense','Invoice Progress'];
      }else if(this.demo == false){
        array=['Invoice Progress'];
      }
      const popover = await this.popoverController.create({
        component: ManageTeamsEditDeleteComponent,
        event: ev,
        translucent: true,
        cssClass: "popover-delete-edit",
        componentProps: {
          arrayoflist: array
        }
      });
      await popover.present();
      popover.onDidDismiss().then(async response => {         
        if (response.data) {
          // tslint:disable-next-line: triple-equals
          if (response.data.status == 'Edit Expense' && this.getExpencesList) {
            // console.log("expensdsdsd",exp)
            this.updateExpenseClick(this.getExpencesList);
          // tslint:disable-next-line: triple-equals
          } else if (response.data.status == 'Delete Expense') {
             this.deleteExpenseClick(exp);
          // tslint:disable-next-line: triple-equals
          } else if (response.data.status == 'Invoice Progress') {
             this.invoiceProgressClick(exp.expenseId);
          }
        }
      });
    }, error => {
      this.constant.Logout(error);
    });
  }

  hidemeClick(exp, i) {
    let req = { expenseId: exp.expenseId, roleId: this.userData.roleId, userId: this.userData.userId }
    this.service.checkExpenseAPI(req).subscribe((result) => {
      // console.log(result);
      this.demo = result.status;
      if (result.status) {
        this.getExpencesList = result;
        this.getExpRecord = result.data.resultArr;
        this.hideme[i] = !this.hideme[i];
      } else {
        // this.demo = result.status;
        this.hideme[i] = !this.hideme[i];
        // this.constant.LogoutSession(result.status_key);
        // this.constant.AlertCustom('Alert', result.message, 'Ok');
      }
      //this.constant.LoadingHide();
    }, error => {
      this.constant.Logout(error);
    });

    setTimeout(() => {
      this.hideme[i] = false;
    }, 3000);
  }

  async updateExpenseClick(val) {
    this.updateExpense(val);

    // let alert = await this.alertCtrl.create({
    //   header: 'Alert',
    //   message: 'Are you sure want to Update Expense',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {
    //       }
    //     },
    //     {
    //       text: 'Ok',
    //       handler: () => {
                 
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }
  updateExpense(val) {
    // console.log(exp);
    //  console.log(val);
     
     this.navCtrl.navigateForward(['/updateExpense', {data: JSON.stringify(val),
      deptData: JSON.stringify(this.expenseData),departmentId: JSON.stringify(this.departmentId),
      hoteloriginal_id: JSON.stringify(this.hoteloriginal_id) ,
      year: JSON.stringify(this.requestParam.year),
      month: JSON.stringify(this.requestParam.month),
    }]);
        // serachParam: JSON.stringify(this.reqParam)
        // console.log(this.requestParam)
  }

  addExpenseClick() {
    this.navCtrl.navigateForward(['/add-expense', {data: JSON.stringify(this.getExpencesList),
      deptData: JSON.stringify(this.expenseData),departmentId: JSON.stringify(this.departmentId),
      hoteloriginal_id: JSON.stringify(this.hoteloriginal_id) }]);
  }
  async deleteExpenseClick(exp) {
    // console.log(exp);
    let dic = { expenseId: exp.expenseId, hotelId: this.constant.HotelId, userId: this.userData.userId, roleId:this.userData.roleId};
    let alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this expense?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteExpense(dic);
          }
        }
      ]
    });
    alert.present();
  }

  deleteExpense(dic) {
    this.constant.LoadingPresent();
    this.service.getdeleteExpenseAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        let ind = this.expenseList.findIndex(x => x.expenseId === dic.expenseId)
        this.expenseList.splice(ind, 1);
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }

  invoiceProgressClick(expenseId)
  {
    // console.log("expanceidok",expenseId);
    this.router.navigate(['/invoiceProgress', { data: JSON.stringify(expenseId) }]);
    
  }

}
