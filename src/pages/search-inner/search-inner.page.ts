import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from "../../services/constant";
import { webServicenew } from '../../services/webServicenew';
import { NavController, NavParams, ModalController, ToastController, AlertController, ActionSheetController, Events, } from '@ionic/angular';


@Component({
  selector: 'app-search-inner',
  templateUrl: './search-inner.page.html',
  styleUrls: ['./search-inner.page.scss'],
})
export class SearchInnerPage implements OnInit {

  expenselist: any = [];
  totalCount: 0;
  HotelName: any;
  infiniteScrollEnable = false;
  reqParam: any = {};
  userData: any;
  expenseId:  any;
  getExpencesDataList:  any;
  hotelId: any;
  DataNot: any;
  dic: { expenseAccountId: any; vendor: any; fromDate: any; toDate: any; hotelId: any; departmentId: any; userId: any; page: number; };

  constructor(public activatedRoute: ActivatedRoute,private router: Router,public events: Events, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, public constant: Constant, public navCtrl: NavController, public service: webServicenew) {
    this.userData = this.constant.getUserData();
    this.totalCount = 0;
    this.reqParam = JSON.parse(this.activatedRoute.snapshot.paramMap.get('serachParam'));
    this.events.subscribe('reload', (data) => {
      this.reqParam
      this.searchdata();
    });
    // localStorage.setItem(this.reqParam)
    // console.log(this.reqParam);
    // this.expenselist = this.reqParam.data.expenses;
    // this.totalCount = this.reqParam.data.total_count;

    if(this.userData.roleId == 1){
      this.hotelId = this.constant.HotelId;
      this.HotelName = this.constant.hotelName;
    }else if(this.userData.roleId == 2){
      this.hotelId = this.userData.hotelId;
      this.HotelName = this.constant.capitalHotelName;
    }
  }

  ngOnInit() {
    this.searchdata();
  }

  searchMore(){
    this.router.navigate(['/search']);
  }

  searchdata() {
   
    this.dic = {
      expenseAccountId: this.reqParam.expenseAccountId,
      vendor: this.reqParam.vendor,
      fromDate: this.reqParam.fromDate,
      toDate: this.reqParam.toDate,
      hotelId: this.hotelId,
      departmentId: this.reqParam.departmentId,
      userId: this.userData.userId,
      page: 0,
    };
    // console.log(this.dic)
    this.constant.LoadingPresent();
    this.expenselist = [];
    this.service.searchExpenceAPI(this.dic).subscribe(result => {
    this.constant.LoadingHide();
      // console.log("searchExpence result", result);
      // console.log("page event search-inner");
      if(result.status == false){
        this.DataNot = result.message;
        // console.log("nodata",this.DataNot);
      }
      if (result) {
        for (const temp of result.data.invoiceArr) {
            if (temp.expenses) {
              for (const temp2 of temp.expenses) {
                this.expenselist.push(temp2);
              }
            }
        }
        // this.expenselist = result.data.expenses;
        this.totalCount = result.data.total_count;

        if (this.expenselist.length < 20 ) {
          this.infiniteScrollEnable = false
        }
        else {
          this.infiniteScrollEnable = true;
        }
        // this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  InfinitScrollingAPI(event) {
    if (this.expenselist.length > 0) {
      this.dic.page += 20;
    }
    
    
    this.constant.LoadingPresent();
    this.service.searchExpenceAPI(this.dic).subscribe((result) => {
      this.constant.LoadingHide();
      event.target.complete();
      if (result.status) {
        // console.log(result);
        var expenselist = [];
          for (const temp of result.data.invoiceArr) {
            if (temp.expenses) {
              for (const temp2 of temp.expenses) {
                expenselist.push(temp2);
                this.expenselist.push(temp2);
              }
            }
        }
        // var expenselist = result.data.expenses; 
        // for (let index = 0; index < expenselist.length; index++) {
        //   this.expenselist.push(expenselist[index]);
        // }
        this.totalCount = result.data.total_count;
        // console.log(this.expenselist);
        
        if (expenselist.length < 20 ) {
          this.infiniteScrollEnable = false
        }
        else {
          this.infiniteScrollEnable = true;
        }
        // this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }

  getExpencesData(val){
    // console.log("getExpences data",val);
    this.expenseId = val;
    const dic ={
      userId: this.userData.userId,
      expenseId: this.expenseId,
      roleId: this.userData.roleId
      
    }
      // console.log(dic);
      this.constant.LoadingPresent();
      this.service.getExpenseData(dic).subscribe((result) => {
        this.constant.LoadingHide();
        // console.log(result);
        if (result) {
          if(result.status== true){
            this.presentActionSheetOne();
            this.getExpencesDataList = result;
          }else if(result.status== false){
            this.presentActionSheetTwo();
          }  
          // this.constant.ToastCustom(result.message, 'top');  
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      }, error => {
        this.constant.Logout(error);
      });
  }

  async presentActionSheetOne() {
    const actionSheet = await this.actionSheetCtrl.create({
     
      buttons: [{
        text: 'Update Expense',
        icon: 'create',
        handler: () => {
          // console.log('Delete clicked');
           this.UpdateExpense();
        }
      }, {
        text: 'Delete Expense',
        icon: 'trash',
        handler: () => {
          this.expenceDelete();
        }
      }, {
        text: 'Invoices Progress',
        icon: 'eye',
        handler: () => {
          this.InvoicesProgress();
        }
      }
      ]
    });
 
    await actionSheet.present();
  }

  async presentActionSheetTwo() {
    const actionSheet = await this.actionSheetCtrl.create({
     
      buttons: [{
        text: 'Invoices Progress',
        icon: 'eye',
        handler: () => {
          this.InvoicesProgress();
        }
      }
      ]
    });
 
    await actionSheet.present();
  }
  UpdateExpense(){
    this.router.navigate(['/updateExpense', {data: JSON.stringify(this.getExpencesDataList),
     serachParam: JSON.stringify(this.reqParam),}]);
  }
  
  InvoicesProgress(){
    // console.log("1",this.expenseId);
  this.router.navigate(['/invoiceProgress', { data: JSON.stringify(this.expenseId) }]);
  }

  async expenceDelete() {
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
            this.DeleteExpense();
          }
        }
      ]
    });
    return await alertmes.present();
  }

  DeleteExpense(){
    const dic ={
      userId: this.userData.userId,
      expenseId: this.expenseId,
      roleId: this.userData.roleId
      
    }
      // console.log(dic);
      this.constant.LoadingPresent();
      this.service.deleteExpenseData(dic).subscribe((result) => {
        this.constant.LoadingHide();
        // console.log(result);
        if (result) {
          this.constant.ToastCustom(result.message, 'top');
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
        this.searchdata();
      }, error => {
        this.constant.Logout(error);
      });
     
  }
  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    setTimeout(() => {
      // console.log('Async operation has ended');
     
     this.ngOnInit();
     
      
      event.target.complete();
    }, 500);
  }
}
