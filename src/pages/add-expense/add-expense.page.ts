import { Constant } from 'src/services/constant';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { NavController, NavParams, ModalController, ToastController, AlertController, Events } from '@ionic/angular';
import { AddVendorPage } from '../add-vendor/add-vendor.page';
import { RelloacateAmountPage } from '../../models/relloacate-amount/relloacate-amount.page';
import { VendorListPage } from '../vendor-list/vendor-list.page'
import { Router } from '@angular/router';
import { VendorComponent } from "src/helper/vendor/vendor.component";
import { webServicenew } from '../../services/webServicenew';
import { ActivatedRoute } from '@angular/router';
import { async } from 'q';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {

  fromDate = new Date().toISOString();
  minDate: string = new Date().toISOString();
  maxData : any = (new Date()).getFullYear() + 2;
  expenseInputs: any = [];
  spreadExpense: boolean = false;
  date: any;
  purchaseOrder: any;
  vendor: any;
  invoiceNumber: any;
  dateErrorMessage: any;
  isCheckEmptyField = false;
  getReallocatedExpense: any = false;
  category: any = [];
  department: any = [];
  cost: any = [];
  description: any = [];
  fromMonth: any = []; toMonth: any = [];
  userData: any;
  getDepartmentList: any = [];
  GetCategoryList: any = [];
  hideme = [];
  expShow: any;
  spreadFlag = false;
  buttoncolor: any = '';
  remainingAmount = ''; totalBudget = '';
  totalExpense = 0;
  minValue: any;
  maxValue: any; minToDate: any; pageBack: any;
  checkNotificationStatus = false;
  vendorId: any;
  notifiAlert: any;
  hotelList: any;
  hotelName: any=[];
  
  fromDatevalue: boolean;
  dateflag: boolean;
  cMont: any;
  monthNames: string[];
  cYear: any;
  cMonth: any;
  reqparam: any={userId:'',roleId:'',hotel_id:'',year:0,month:'',toMonth: '',page:"0"};
  catagory: any;
  dipartmentName: any =[];
  department_data: any;
  DapartmentData: any;
  hotelId: number;
  userId: any;
  selectedDate: any;
  confirmExpensedata: any;
  HotelName: any;
  expenseData: any;
  hoteloriginal_id: any;
  departmentId: any;
  categoryActive: any;
  do: any;



  constructor(public modalCtrl: ModalController,  public events: Events,
    public navCtrl: NavController, private router: Router, public alertController: AlertController,
    public constant: Constant,  public activatedRoute: ActivatedRoute,
    public alertCtrl: AlertController, public service: webServicenew,
     public toastCtrl: ToastController, public sanitizer: DomSanitizer) {
    //this.expShow=true;
    var monthNames = [ "Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec" ];
    this.cYear = (new Date()).getFullYear();
    this.cMonth = monthNames[(new Date()).getMonth()];
    // this.cMonth = (new Date()).getMonth()+1;
    // this.cMonth = this.monthNames[(new Date()).getMonth()];
    // console.log(this.cMonth);
    this.userData = this.constant.getUserData();

    if(this.userData.roleId == 1){
      this.hotelId = this.constant.HotelId;
      this.HotelName = this.constant.hotelName;
     }else if(this.userData.roleId == 2){
      this.hotelId = this.userData.hotelId;
      this.HotelName = this.constant.capitalHotelName;
     }
     let ts = new Date();
     this.selectedDate = this.constant.dateFormat(ts);
    //  console.log("todate",this.selectedDate);
    this.userId = this.userData.userId;
    this.reqparam.roleId = this.userData.roleId;
    this.expenseData = JSON.parse(this.activatedRoute.snapshot.paramMap.get('deptData'));
    this.departmentId = JSON.parse(this.activatedRoute.snapshot.paramMap.get('departmentId'));
    this.hoteloriginal_id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('hoteloriginal_id'));
    this.department_data= JSON.parse(localStorage.getItem("department_data"));
    this.DapartmentData = this.department_data.data.department_data;
    this.categoryActive =0;

    
    // console.log("dpdata",this.department_data);

    // console.log(this.constant.HotelId);
    // if (this.activatedRoute.snapshot.paramMap.get('data')) {
    //   this.pageBack = this.activatedRoute.snapshot.paramMap.get('data');
    //   console.log(this.pageBack);
    // }
    
    // console.log(this.userData);
    this.inputsFunction();
  }
  ngOnInit() {
    
   
  //  this.getListDepartment('');
   
  }
//----------------------------select date-----------------------//
/////segment y m q d
fromDateClick(fromDate, data) {
  // console.log(fromDate);
  this.selectedDate = this.constant.dateFormat(fromDate);
  // console.log(this.fromDate);
  // console.log(this.toDate);
   var ts = new Date(fromDate);
  // console.log(ts.toDateString());
  // this.cMonth = this.monthNames[(new Date(fromDate)).getMonth()];
  // console.log(this.cMonth);
  this.dateflag = true;

  if (data === 'fromDate') {
    
    this.fromDatevalue = false;
   // this.fromdate = ts.getMonth() + 1
    //this.fromdate = this.monthNames[(new Date()).getMonth()];
    // console.log(this.fromdate);
    this.reqparam.year = ts.getFullYear()
    
    this.cMont = this.cMonth
    // console.log(this.cMont);
    this.reqparam.month = this.cMont
    // console.log(this.reqparam.month);
    
    this.reqparam.toMonth = this.cMont
    
  }
  // console.log(this.dateflag);


}
  //-----------------------------------Get Department List Function----------------------------------------//

  // getDepartmentListClick(departmentID) {
    
  //   console.log(departmentID);
  //   this.constant.LoadingPresent();
  //   this.service.getDashboardDataAPI(this.reqparam).subscribe((result) => {
  //     this.constant.LoadingHide();
  //     if (result.status) {
  //       console.log(result);
  //       this.getDepartmentList = result.data;
  //       console.log(this.getDepartmentList);
  //       //this.constant.ToastCustom(result.message, 'top');
  //     } else {
  //       this.constant.ToastCustom(result.message, 'top');
  //     }
  //   }, error => {
  //     this.constant.Logout(error);
  //   });
  // }
  getListDepartment(dept,j){
    this.categoryActive =1;
    // console.log(dept);
   let dic = {
    // userId: this.userId,
    // hotelId: this.hotelId,
    departmentId: dept.detail.value,
    invoiceDate:this.selectedDate,
    // month: this.cMonth,
    // toMonth: this.cMonth,
    // year: this.cYear,
    }
    // for(var i=0;i<this.expenseInputs.length;i++){
    //   if(i == j){
        this.expenseInputs[j].department = dept.detail.value;
    //   }
    //  }
   this.reqparam.page="0"
   this.constant.LoadingPresent();
     this.service.getExpenselistAPI(dic).subscribe((result) => {
     this.constant.LoadingHide(); 
      //  console.log("department",result);
       this.expenseInputs[j].democategory = result.data;
      //  console.log( this.expenseInputs);
 
      // this.department = this.dipartmentName[0].departmentId;
    //   console.log(this.department);
    //  console.log("hbid",this.constant.HotelId);
     })
   }

getListCategory(val,j){
  // console.log("cat",val);
  
  var dic = {
    userId:this.userId,
    date: this.selectedDate,
    expenseAccount : val.detail.value,
    hotelId: this.hotelId,
    // amount: 
  }
      this.expenseInputs[j].category = val.detail.value;
    console.log(dic);
  
  this.service.confirmExpenselistAPI(dic).subscribe((result) => {
    console.log(result);
    var temp = result.data;
    this.confirmExpensedata = temp;
    // if(this.confirmExpensedata.remainingAmount != 0 && this.confirmExpensedata.budget != 0){
      // console.log(this.confirmExpensedata);
      // console.log("confirm Expense data",this.confirmExpensedata.remainingAmount);
      this.expenseInputs[j].remainingAmount = this.confirmExpensedata.remainingAmount;
      this.expenseInputs[j].totalBudget = this.confirmExpensedata.budget;
      if (result.data.status == "sufficient") {
        // console.log(result);
        this.checkNotificationStatus = false;
      }
      else if (result.status == "unsufficient") {
        this.constant.AlertCustom('Over Expense', result.data.message, 'Ok');
        this.checkNotificationStatus = true;
      }
      else if (result.status == "date_not_found" || result.data.status == 'budgetError') {
        this.constant.AlertCustom('Over Expense', result.data.message, 'Ok');
      } else {
        this.constant.ToastCustom(result.data.message, 'top');
      }

    // }else{
    //   console.log("No budget");
    //   this.constant.AlertCustom('Over Expense', "Un-Sufficient Expense ", 'Ok');
    //   this.checkNotificationStatus = true;
    // }, error => {
    //   this.constant.Logout(error);
    // }
  }, error => {
    this.constant.Logout(error);
  });
}
  // -----------------------------------Select Vendor Function----------------------------------------//

  async relloacateAmount() {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: RelloacateAmountPage,
        componentProps: {
          type: 'vendorModel'
        }
      });
    modal.onDidDismiss().then((detail) => {
      // console.log(detail);
      //this.getCapitalExpenseAccount();
    });
    return await modal.present();
  }

  inputsFunction() {
    this.expenseInputs = [{
      department: '',
      category: '',
      cost: '',
      description: '',
      fromMonth: '',
      toMonth: '',
      spreadExpense: false
    }];
  }

  //-----------------------------------Multiple Expense Model----------------------------------------//

  addInput() {
    if (this.expenseSubmitClick()) {
      // console.log(this.expenseSubmitClick());
      this.constant.ToastCustom("Please enter all * field!", 'top');
    }
    else {
      // this.spreadFlag = 0;
      this.isCheckEmptyField = false;
      this.expenseInputs.push({
        department: '',
        category: '',
        cost: '',
        description: '',
        fromMonth: '',
        toMonth: '',
        spreadExpense: false
      });
      // console.log(this.expenseInputs);
    }
  }

  //-----------------------------------Delete model----------------------------------------//

  removeInput(index ,item) {
    var a= 0;
    this.expenseInputs.splice(index, 1);
    for(let i= 0 ; i < this.expenseInputs.length ; i++){
      a = a + this.expenseInputs[i].cost;
    }
    this.totalExpense = a;
    console.log("totalcost",a);
 
   
    // this.expenseInputs.splice(item.cost, 1);
    // this.totalExpense = index.cost;
  //   for(let i= 0 ; i < this.expenseInputs.length ; i++){
  //     this.totalExpense = a + this.expenseInputs[i].cost;
  //  }
    // if(this.expenseInputs.length==1){
    //   this.totalExpense = this.expenseInputs[index-1].cost;
    //   console.log("indexzero",this.totalExpense);
    // }else if(this.expenseInputs.length!=0){ 
      
    //   console.log("totalcost",this.totalExpense);
    // }
      // this.expenseInputs.forEach(item => {
      //   console.log("indexmore",item.cost);
      // });
      //  this.do = this.expenseInputs[index-1].cost + this.expenseInputs[index+1].cost;
     
    // }
    //  this.do = this.expenseInputs[index-1].cost;
    //  console.log(this.do);
    // console.log("tottel expense", this.totalExpense);
    console.log(" expense", this.expenseInputs);
  }

//-----------------------------------Spread Expense Function----------------------------------------//
  spreadExpenseClick(index, item) {
    // console.log(index);
    // console.log(item.spreadExpense);
    if (!item.spreadExpense) {
      item.fromMonth = '';
      item.toMonth = ''
    }

    this.spreadFlag = !this.spreadFlag;
    // console.log(item);
    // item.spreadExpense
    // if (item)
    //   item.spreadExpense = 1;
    // else {
    //   this.spreadFlag = 0;
    // }
    var currentYear = this.constant.currentYear();
    // console.log(currentYear + 1);
    this.minValue = currentYear - 1 + '-' + '01';
    this.maxValue = currentYear + 1 + '-' + '12';
    // console.log(this.minValue);
    // console.log(this.spreadFlag);
  }

  getPurchaseOrderCLick(purchaseOrder) {
    // console.log(purchaseOrder);
    if (purchaseOrder) {
      this.invoiceNumber = "";
      this.purchaseOrder = true;
    }
    else {
      this.purchaseOrder = false;
    }
  }

  //----------------------------------- Add Expense Function ----------------------------------------// 
  expenseAddClick() {
    this.department = [];
    this.category = [];
    this.cost = [];
    this.description = [];
    this.fromMonth = [];
    this.toMonth = [];
    var dic = {};
    dic['isSpread'] = false;

    var self = this;
    this.isCheckEmptyField = true;
    if (this.expenseSubmitClick()) {
      // console.log(this.expenseSubmitClick());
    }
    else {
      this.getReallocatedExpense = true;

      if (this.purchaseOrder) {
        dic['isPurchaseOrder'] = true;
        dic['PONumber'] = '';
      }
      else {
        dic['PONumber'] = this.invoiceNumber;
      }
      dic['date'] = this.selectedDate;
      dic['vendor'] = this.vendorId;

      for(var entry of this.expenseInputs){
        self.department.push(entry.department);
        self.category.push(entry.category);
        self.cost.push(entry.cost);
        self.description.push(entry.description);
        // self.fromMonth.push(entry.fromMonth);
        // self.toMonth.push(entry.toMonth);expenseInputs[i].spreadExpense
        if(!entry.spreadExpense){
          self.fromMonth.push("");
        self.toMonth.push("");
        }else{
          self.fromMonth.push(this.constant.dateFormat2(entry.fromMonth));
        self.toMonth.push(this.constant.dateFormat2(entry.toMonth));
        }
        // self.fromMonth.push(this.constant.dateFormat(entry.fromMonth));
        // self.toMonth.push(this.constant.dateFormat(entry.toMonth));
      }
      // this.expenseInputs.forEach(function (entry) {
       
      // });
      // console.log(self.department);
      dic['department'] = self.department;
      dic['expenseAccount'] = self.category;
      dic['amount'] = self.cost;
      dic['itemDescription'] = self.description;
      dic['fromMonth'] = self.fromMonth;
      dic['toMonth'] = self.toMonth;
      for (var i = 0; i < self.fromMonth.length; i++) {

        if (self.fromMonth[i] != null && self.fromMonth[i] != '') {
          dic['isSpread'] = true;
          break;
        }
        else {
          dic['isSpread'] = false;
        }
      }
      dic['hotelId'] = this.hotelId;
      dic['hotelName'] = this.constant.hotelName;
      dic['userName'] = this.userData.userName;
      // dic['isPurchaseOrder'] = '';
      dic['userId'] = this.userData.userId;
      // console.log(self.fromMonth);
      // console.log(dic);
      // console.log(this.checkNotificationStatus);
      if (this.checkNotificationStatus) {
        this.notificationAlert(dic);
      }
      else {
        this.addExpenseClickApi(dic);
      }
    }
  }

  //-----------------------------------Notification Alert----------------------------------------//
  async notificationAlert(dic) {

    var notifiAlert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Would you like to send over expense request to Region Mananger',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            notifiAlert = null;
          }
        },
        {
          text: 'Save Expense & Send Request',
          handler: () => {
            this.addExpenseClickApi(dic);
          }
        }
      ]
    });
    notifiAlert.present();
  }

  addExpenseClickApi(dic) {
    this.constant.LoadingPresent();
    this.service.addExpenseAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        if(this.expenseData!=null){
          this.router.navigate(['/showExpense', {
            deptData: JSON.stringify(this.expenseData),
            departmentId: this.departmentId,
            hoteloriginal_id: JSON.stringify(this.hoteloriginal_id) 
          }]);
        }else{
          if(this.userData.hotelId == 0){
            this.events.publish('addexpenseclick',"dashboard");
          // this.navCtrl.navigateRoot(['/dashboard']);
          }else if (this.userData.hotelId!=0){
            this.events.publish('addexpenseclick',"gmdashboard");
            // this.navCtrl.navigateRoot(['/gmdashboard']);
          }
        }
        // console.log(result);
         this.getDepartmentList = result.data;
        // console.log(this.getDepartmentList);
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }

  //-----------------------------------Validation check----------------------------------------//

  expenseSubmitClick() {
    let checkValid = false;
    // console.log(this.expenseInputs);
    // console.log(this.spreadFlag);
    for (var i = 0; i < this.expenseInputs.length; i++) {
      if (this.expenseInputs[i].department == null || this.expenseInputs[i].department == "") {
        checkValid = true;
        break;
      }
      if (this.expenseInputs[i].category == null || this.expenseInputs[i].category == "") {
        checkValid = true;
        break;
      }
      if (this.expenseInputs[i].cost == null || this.expenseInputs[i].cost == "") {
        checkValid = true;
        break;
      }
      if (this.expenseInputs[i].description == null || this.expenseInputs[i].description == "") {
        checkValid = true;
        break;
      }
      if (this.expenseInputs[i].spreadExpense) {
        if (this.expenseInputs[i].fromMonth == null || this.expenseInputs[i].fromMonth == "") {
          checkValid = true;
          break;
        }
        if (this.expenseInputs[i].toMonth == null || this.expenseInputs[i].toMonth == "") {
          checkValid = true;
          break;
        }
      }
    }
    if (checkValid) {
      return 1;
    }else{
      return 0;
    }
  }


  async getAddVendorModel() {
    //this.router.navigate(['/vendor-list',{type: 'vendorModel'}]);
    let modal = await this.modalCtrl.create({
      component: AddVendorPage,
      componentProps: {
        type: 'vendorModel'
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        // console.log(data);
      })
    return await modal.present();
  }

  async selectVendorModel() {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: VendorListPage,
        componentProps: {
          type: 'vendorListModel'
        }
      });

    modal.onDidDismiss().then((detail) => {
      if (detail) {
        if (detail.data) {
          this.vendor = detail.data.vendorCompany +detail.data.vendorNumber;
          this.vendorId = detail.data.vendorId;
        }
      }
    });
    await modal.present();
  }

  deleteVendor(){
    // console.log("delete vendor",this.vendorId)
    this.vendor = '';
    this.vendorId = '';
  }

  //----------------------------------- Get Category List ----------------------------------------//

 

  //----------------------------------- Change Date Function ----------------------------------------//
  changeDate(date) {
    // console.log(date);
    var i = 0;
    this.expenseInputs.forEach(function (entry) {
      // console.log(entry);
      entry.department = '';
      entry.category = '';
      entry.remainingAmount = '';
      entry.totalBudget = '';
    });
  }

  expenseShow(item) {
    this.expShow[item] = !this.expShow[item];
  }

  //----------------------------------- Check Confirm Expense ----------------------------------------// 

  checkConfirmExpense(item, index) {
    this.totalExpense = 0;
    // console.log(this.expenseInputs);
    var self = this;
    this.expenseInputs.forEach(function (entry) {
      // console.log(entry.cost);
      // console.log(entry.category);
      if (entry.cost) {
        var a = parseFloat(entry.cost);
        self.totalExpense = a + self.totalExpense;
      }

    });
    // console.log(this.expenseInputs);
    // console.log(this.totalExpense);
    // console.log(item);
    // console.log(index);
   
    
    
    // console.log("Year>>>>>>",temp2);
    if (item.category) {
      var dic = {};
      dic['userId'] = this.userData.userId;
      dic['isSpread'] = this.spreadFlag;
      if (this.expenseInputs[index].spreadExpense == 1) {

        dic['fromMonth'] = this.constant.dateFormat2(item.fromMonth);
    
        dic['toMonth'] = this.constant.dateFormat2(item.toMonth);
      }
      else {
        dic['fromMonth'] = '';
        dic['toMonth'] = '';
      }
      dic['hotelId'] = this.constant.HotelId;
      dic['expenseAccount'] = item.category;
      if (item.cost)
        dic['amount'] = item.cost;
      else
        dic['amount'] = 0;
      // dic['date'] = this.constant.dateFormat(this.date);
      // dic['date'] = new Date().toISOString();selectedDate
      dic['date'] = this.selectedDate;

      // console.log(dic);
      this.constant.LoadingPresent();
      this.service.getConfirmExpenseAPI(dic).subscribe((result) => {
        this.constant.LoadingHide();
        // console.log(result);
        this.expenseInputs[index].remainingAmount = result.data.remainingAmount;
        this.expenseInputs[index].totalBudget = result.data.budget;
        if (result.data.status == "sufficient") {
          // console.log(result);
          this.checkNotificationStatus = false;
        }
        else if (result.status == "unsufficient") {
          this.constant.AlertCustom('Over Expense', result.data.message, 'Ok');
          this.checkNotificationStatus = true;
        }
        else if (result.status == "date_not_found" || result.data.status == 'budgetError') {
          this.constant.AlertCustom('Over Expense', result.data.message, 'Ok');
        } else {
          this.constant.ToastCustom(result.data.message, 'top');
        }
      }, error => {
        this.constant.Logout(error);
      });
    }
  }
  fromMonthClick(mindate) {
    // console.log(mindate);
    this.minToDate = mindate;
  }

}
