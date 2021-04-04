import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
import { Router } from '@angular/router';


@Component({
  selector: 'app-capital-expense-inner',
  templateUrl: './capital-expense-inner.page.html',
  styleUrls: ['./capital-expense-inner.page.scss'],
})
export class CapitalExpenseInnerPage implements OnInit {

  req = { hotelId: 0, month: "Feb", toMonth: "Feb", year: '', userId: '' }
  getexpenseData: any = []; userData: any;
  totalExpense: any;
  hotelData: any; hotelName: any;
  params: any;
  roleid: any;
  cYear: any;
  cMonth:any;
  hotelId: number;
  message: any;
  message_title: any;

  checkclick:true;
  


  constructor(public activatedRoute: ActivatedRoute, public actionSheetController: ActionSheetController, 
    public service: webServicenew, public constant: Constant, 
    private router: Router, public alertCtrl: AlertController) {
    var monthNames = [ "Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec" ];
    this.cYear = (new Date()).getFullYear();
    // this.cMonth = (new Date()).getMonth()+1;
    this.cMonth = monthNames[(new Date()).getMonth()];
   
    this.userData = this.constant.getUserData();
    
    if (this.userData.roleId==1) {
      this.params = JSON.parse(this.activatedRoute.snapshot.paramMap.get('expense'));
      // console.log(this.params);
      this.hotelName = this.constant.hotelName
      this.req.hotelId = this.constant.capitalHotelId;
      this.req.month = this.params.month;
      this.req.toMonth =  this.params.toMonth;
      this.req.year =  this.params.year;
      this.req.userId = this.userData.userId;
      this.hotelId = this.constant.capitalHotelId;
    }else if(this.userData.roleId==2){
      this.hotelName = this.constant.capitalHotelName;
      this.req.hotelId = this.userData.hotelId;
      // if(this.activatedRoute.snapshot.paramMap.get('hotelID')){
      //   this.req.hotelId = JSON.parse(this.activatedRoute.snapshot.paramMap.get('hotelID'));
      // }else{
      //   this.req.hotelId = this.userData.hotelId;
      //   this.hotelId = this.userData.hotelId;
      // }
      this.req.month = this.cMonth;
      this.req.toMonth = this.cMonth;
      this.req.year = this.cYear;
      this.req.userId = this.userData.userId;
      // console.log("paramdata",this.req);
     
    }
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.totalExpense = 0;
    this.getcapitalExpensehotelDetail();
    // console.log("ryteryery");
    
  }
  getcapitalExpensehotelDetail() {
    this.constant.LoadingPresent();
    // console.log(this.req);
    this.service.getCapitalHotelExpAPI(this.req).subscribe((result) => {
      if (result.status) {
        this.constant.LoadingHide();
        this.message = result.setting.message;
        this.message_title = result.setting.message_title;
        var getexpenseData = result.data.expenseData;
        // console.log(getexpenseData);
        this.constant.ToastCustom(result.message, 'top');
        let totalExpense = 0
        if (getexpenseData.length > 0) {
          for (var i = 0; i < getexpenseData.length; i++) {
            totalExpense = totalExpense + parseFloat(getexpenseData[i].cost);
          }
          // console.log(totalExpense);
          this.totalExpense = totalExpense.toFixed(2);
          // console.log(this.totalExpense);
          this.getexpenseData = result.data.expenseData;
        }
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
      //this.constant.LoadingHide();
    }, error => {
      this.constant.Logout(error);
    });
  }
  async openActionSheet(exp) {
    // console.log(exp);
    this.constant.LoadingPresent();
    let req = { capitalExpenseId: exp.capitalexpenseId, roleId: this.userData.roleId, userId: this.userData.userId }
    this.service.getCapitalExpDataAPI(req).subscribe((result) => {
      // console.log(result);
      this.constant.LoadingHide();

      if (result.status) {
        this.openActionFunction(exp);
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
      //this.constant.LoadingHide();
    }, error => {
      this.constant.Logout(error);
    });
  }

  addCapitalExpense() {
    this.router.navigate(['/addCapitalExpense', { active: JSON.stringify(true) }]);
    // console.log("add 1",this.constant.capitalHotelId);
  }

  async openActionFunction(exp) {
    let data = exp;
    const actionSheet = await this.actionSheetController.create({
    
      // header: 'Albums',
      buttons: [{
        text: 'Edit Expense',
        role: '',
        icon: 'create',
        handler: () => {
          this.router.navigate(['/addCapitalExpense', { expUpdate: JSON.stringify(data) }]);
          // console.log("data",exp);
        }
      }, {
        text: 'Delete Expense',
        icon: 'trash',
        handler: () => {
          this.expenceDelete(exp);
        }
      },{
        text: 'Invoice Progress',
        icon: 'eye',
        handler: () => {
           this.router.navigate(['/expense-progress', { data: JSON.stringify(data) }]);
         
        }
      }]
    });
    await actionSheet.present();
  }

  async expenceDelete(exp) {
    const alertmes = await this.alertCtrl.create({
      header: 'Confirm',
      // subHeader: 'Subtitle',
      message: 'Are you sure you want to delete this expense?',
      backdropDismiss: false,
      buttons: [
        {
          text: '',
          cssClass: 'icon-cancel',
          handler: () => {
            //this.navCtrl.navigateRoot('/dashboard');
          }
        },
        {
          text: 'Yes',
          cssClass: 'done-btn btnsize1',
          handler: () => {
            this.expDelApiFunction(exp);
          }
        }
      ]
    });
    return await alertmes.present();
  }

  expDelApiFunction(exp) {
    // console.log("expdat",exp)
    let dic = {};
    dic['hotelId'] = this.req.hotelId;
    dic['userId'] = this.userData.userId;
    dic['capitalExpenseAccountId'] = exp.capitalExpenseAccountId;
    dic['capitalExpenseId'] = exp.capitalexpenseId;
    // dic['roleId'] = this.userData.roleId;
    this.service.deleteCapitalExpAPI(dic).subscribe((result) => {
      // console.log(result);
      if (result.status) {
        this.getcapitalExpensehotelDetail();
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
       
      }
      //this.constant.LoadingHide();
    }, error => {
      this.constant.Logout(error);
    });
  }

  back()
  {
    this.router.navigate(['/capitalExpense', {  params: JSON.stringify(this.params) }]);
  }

}
