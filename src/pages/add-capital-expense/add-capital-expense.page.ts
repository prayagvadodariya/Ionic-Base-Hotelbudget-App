import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController,NavController } from '@ionic/angular';
import { CapitalExpenseCatPage } from '../../models/capital-expense-cat/capital-expense-cat.page';
import { VendorListPage } from '../vendor-list/vendor-list.page'
import { webServicenew } from '../../services/webServicenew';
import { AddVendorPage } from '../add-vendor/add-vendor.page';
import { Constant } from '../../services/constant';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-add-capital-expense',
  templateUrl: './add-capital-expense.page.html',
  styleUrls: ['./add-capital-expense.page.scss'],
})
export class AddCapitalExpensePage implements OnInit {

  isCheckEmptyField = false;
  getExpenseList: any = [];
  userData: any = [];
  vendorId: any;
  HotelName: any;
  ExpenseForm: FormGroup;
  expense: any = [];
  params:any;
  hotelData: any;
  hotelID: any;
  active: any;
  Hotel_Id: any;
  expUpdate: any;
  exp: any;
  vendorName: any;
  hotelName: any;
  vendorCompany: any;
  purchaseOrder: boolean;
  OldPoNumber: any;
  innoicesnumber: any;
  indata: string;
  ispurchaseOrder:any;
  date: any;
  //expense: { cap_date: any, cap_invoice: any, cap_vendor: any, cap_cost: any, cap_category: any, cap_description: any } ;

  constructor(public alertCtrl: AlertController, public fb: FormBuilder,
     private router: Router,public modelCtrl: ModalController,
      public constant: Constant, public service: webServicenew, 
      public activatedRoute: ActivatedRoute,public navCtrl:NavController) {
    this.userData = this.constant.getUserData();
    this.active = this.activatedRoute.snapshot.paramMap.get('active');
    // console.log("data active",this.active);
    
    this.FormValtion();
    if(this.userData.roleId == 1){
      this.hotelID = this.constant.capitalHotelId;
    }else if(this.userData.roleId == 2){
      this.hotelID = this.userData.hotelId;
      // this.hotelName = this.constant.capitalHotelName
    }
    console.log('capitalHotelId',this.constant.capitalHotelId);
    // console.log(this.constant);
    
    this.expUpdate = JSON.parse(this.activatedRoute.snapshot.paramMap.get('expUpdate'));
    this.HotelName = this.constant.hotelName
   
    // this.exp.expenseAccountName = this.expUpdate.expenseAccountName;
    // console.log("1",this.expUpdate);
    if(this.expUpdate){
      this.OldPoNumber = this.expUpdate.invoiceNo;
      // this.hotelID = this.constant.capitalHotelId
     this.expUpdate.vendorId;
     if(this.expUpdate.isPurchaseOrder == 1){
      this.purchaseOrder = true;
      

      // console.log("1",this.dataResultArr.isPurchaseOrder);
    }else if(this.expUpdate.isPurchaseOrder == 0){
      this.purchaseOrder = false;
      // console.log("2",this.dataResultArr.isPurchaseOrder);
      this.expUpdate.invoiceNo;
    }
      // this.HotelName = this.constant.hotelName
      // console.log(this.hotelName);
      
    }
    // this.HotelName=this.constant.capitalHotelName;
    this.getCapitalExpenseAccount();
  
      
    
      // console.log("hbname",this.hotelData);
      // console.log("hbID",this.hotelID);

      if(this.userData.roleId == 1){
        this.hotelID =  this.constant.capitalHotelId
        this.HotelName = this.constant.hotelName
       }else if(this.userData.roleId == 2){
        this.hotelID = this.userData.hotelId;
        this.HotelName = this.constant.capitalHotelName;
       }
    
      if (this.activatedRoute.snapshot.paramMap.get('expUpdate')) {
        
       
        setTimeout(() => {
          this.expense = JSON.parse(this.activatedRoute.snapshot.paramMap.get('expUpdate'));
               },500);
              //  console.log(this.expense);
              // this.setvaluefrom();
        if(this.activatedRoute.snapshot.paramMap.get('expense'))
        {
          this.params = JSON.parse(this.activatedRoute.snapshot.paramMap.get('expense'));
          // console.log(this.params);
        }
      }
    // }
  }
  setvaluefrom() {
    // this.ExpenseForm.setValue({
    //   capitalExpenseAccountId:this.expUpdate.expenseAccountName
    // })
  }

  ngOnInit() {
   
    // this.keyboard.hideKeyboardAccessoryBar(false);
    
    //  this.getEditCapitalExpense();
  }
  getPurchaseOrderCLick(purchaseOrder) {
    // console.log(purchaseOrder);
    if (purchaseOrder) {
      // this.invoiceNumber = "";
      // this.dataResultArr.PONumber = "";
      this.purchaseOrder = true;
      this.expUpdate.isPurchaseOrder = "1";
      this.indata = "";
      this.ispurchaseOrder = '1';
      //  this.ExpenseForm.value.invoiceNo = this.expUpdate.invoiceNo;
    }
    else {
      this.purchaseOrder = false;
      this.expUpdate.isPurchaseOrder = "0";
      this.ispurchaseOrder = '0';
      // this.ExpenseForm.value.invoiceNo = "";
      // this.ExpenseForm.value.invoiceNo = this.expUpdate.invoiceNo;
      
    }
  }
  CategoryData(val){
    // console.log("catergory",val);
    // console.log("1",val.detail.value.capitalExpenseAccountId);
    this.expUpdate.expenseAccountName = val.detail.value.accountName;
    this.expUpdate.capitalExpenseAccountId = val.detail.value.capitalExpenseAccountId;
   
  }
  // onSelectChange(){
  //  console.log("ok");
  // }
  //---------------------------- Validation Function -------------------------------------------------//
  FormValtion() {
    this.ExpenseForm = this.fb.group({
      date: ['', Validators.compose([Validators.required])],
      invoiceNo: ['', Validators.compose([Validators.required, this.noWhitespaceValidator])],
      vendor: ['', Validators.compose([Validators.required])],
      capitalExpenseAccountId: ['', Validators.compose([Validators.required])],
      cost: ['', Validators.compose([Validators.pattern('^[0-9]{1,100}$'), Validators.required, this.noWhitespaceValidator])],
      description: ['', Validators.compose([Validators.required, this.noWhitespaceValidator])],
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    // console.log(control);
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  //------------------------------Get CapitalExpense Account List-----------------------------------//
  getCapitalExpenseAccount() {

    let dic = { hotelId: this.hotelID, userId: this.userData.userId };
    console.log(dic);
    this.constant.LoadingPresent();
    this.service.getCapitalExpenseAccountListAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        this.getExpenseList = result.data.expenseAccountData;
        // console.log(this.getExpenseList);
        // this.constant.ToastCustom(result.message, 'top');
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }

  //--------------------------------------Add CapitalExpense-------------------------------------//
  capitalExpenseAddClick(val) {
    
    if(this.purchaseOrder==true){
      this.innoicesnumber = "";
      this.ispurchaseOrder = "1";
    }else if(this.purchaseOrder==false){
      this.innoicesnumber = val.value.invoiceNo
      this.ispurchaseOrder = "0";
    } 
   
    // let ok = this.constant.dateFormat(val.value.date)
     console.log(val);
    //  console.log(ok);
      
      let dic = {
      createdByUserId : this.userData.userId,
      date : this.constant.dateFormat(val.value.date),
      capitalExpenseAccountId : val.value.capitalExpenseAccountId.capitalExpenseAccountId,
      userId : this.userData.userId,
      hotelId : this.hotelID,
      vendorId : this.vendorId,
      invoiceNo : this.innoicesnumber,
      isPurchaseOrder: this.ispurchaseOrder,
      cost : val.value.cost,
      description : val.value.description,
    };

    if(this.innoicesnumber == '' && this.purchaseOrder == false){
      this.constant.ToastCustom('Invoice Number is required', 'top');

   }else{
      if (dic.hotelId!='' && dic.createdByUserId!='' && val.value.date!='' && dic.capitalExpenseAccountId!='' && dic.userId!='' && dic.vendorId!='' && dic.cost!='' && dic.description!='')  {
       console.log(dic);
      this.constant.LoadingPresent();
      this.service.AddCapitalExpenseAPI(dic).subscribe((result) => {
        this.constant.LoadingHide();
        if (result.status) {
          // console.log(result);
          this.constant.ToastCustom(result.message, 'top', );
          this.navCtrl.back();
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      }, error => {
        this.constant.Logout(error);
      });
    }
    else {
      this.constant.ToastCustom('All * fields are required', 'top');
    }
   }
    // var self = this;
    // this.isCheckEmptyField = true;
    // if (this.expenseSubmitClick()) {
    //   console.log(this.expenseSubmitClick());
    //   var dic = {};

  }
  capitalExpenseUpdateClick(){
    // console.log("1",this.ExpenseForm);
    if(this.purchaseOrder==true){
      this.innoicesnumber = this.indata;
    }else if(this.purchaseOrder==false){
      this.innoicesnumber = this.ExpenseForm.value.invoiceNo;
    } 
      let dic = {
      capitalExpenseId: this.expUpdate.capitalexpenseId,
      hotelId: this.hotelID,
      createdByUserId: this.userData.userId,
      date: this.constant.dateFormat(this.ExpenseForm.value.date),
      capitalExpenseAccountId: this.expUpdate.capitalExpenseAccountId,
      userId: this.userData.userId,
      vendorId: this.expUpdate.vendorId,
      invoiceNo: this.innoicesnumber,
      cost: this.ExpenseForm.value.cost,
      description: this.ExpenseForm.value.description,
      isPurchaseOrder: this.expUpdate.isPurchaseOrder,
    };
      // console.log("185",dic.description);
      if(this.innoicesnumber == '' && this.purchaseOrder == false){
         this.constant.ToastCustom('Invoice Number is required', 'top');

      }else{

              if (dic.capitalExpenseId!='' && dic.hotelId!='' && dic.createdByUserId!='' && this.ExpenseForm.value.date!='' && dic.capitalExpenseAccountId!='' && dic.userId!='' && dic.vendorId!='' && dic.cost!='' && dic.description!='') {
              this.constant.LoadingPresent();
              this.service.UpdateCapitalExpenseAPI(dic).subscribe((result) => {
                this.constant.LoadingHide();
                if (result.status) {
                  // console.log(result);
                  this.constant.ToastCustom(result.message, 'top');
                  this.navCtrl.back();
                  // this.router.navigate(['/CapitalExpenseInner']);
                  // console.log("hotelid dataasw:----",JSON.stringify(this.Hotel_Id))
                } else {
                  this.constant.ToastCustom(result.message, 'top');
                  this.constant.LogoutSession(result.status_key);
                }
              }, error => {
                this.constant.Logout(error);
              });
            }
            else {
              this.constant.ToastCustom('All * fields are required', 'top');
            }
       }


  }
  async getAddVendorModel() {
    //this.router.navigate(['/vendor-list',{type: 'vendorModel'}]);
    let modal = await this.modelCtrl.create({
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


  //------------------------------Vendor Model Open-----------------------------------//
  async selectVendorModel() {
    const modal: HTMLIonModalElement =
      await this.modelCtrl.create({
        component: VendorListPage,
        componentProps: {
          type: 'vendorListModel',
          // hotelId: this.hotelID,
          // hotelName: this.HotelName,
        }
       
      });

    modal.onDidDismiss().then((detail) => {
      if (detail) {
        console.log('The result:', detail.data);
        // this.expense.vendorCompany = detail.data.vendorCompany + detail.data.vendorNumber;
        this.vendorId = detail.data.vendorId;
        this.vendorCompany = detail.data.vendorCompany;
        // this.expUpdate.vendorCompany = this.vendorCompany;
        // this.expUpdate.vendorId = this.vendorId;
      }
    });
    await modal.present();

  }
  deleteVendor(){
    // console.log("delete vendor",this.vendorId)
    // this.vendorName = '';
    this.vendorCompany = '';
    // this.expUpdate.vendorCompany = '';
    // this.expUpdate.vendorId = '';
    this.vendorId = '';
  }


  async selectupdateVendorModel() {
    const modal: HTMLIonModalElement =
      await this.modelCtrl.create({
        component: VendorListPage,
        componentProps: {
          type: 'vendorListModel',
          // hotelId: this.hotelID,
          // hotelName: this.HotelName,
        }
       
      });

    modal.onDidDismiss().then((detail) => {
      if (detail) {
        // console.log('The result:', detail.data);
        // this.expense.vendorCompany = detail.data.vendorCompany + detail.data.vendorNumber;
        this.expUpdate.vendorCompany = detail.data.vendorCompany;
        this.expUpdate.vendorId = detail.data.vendorId;
      }
    });
    await modal.present();

  }

  removeVendor(){
    this.expUpdate.vendorCompany = '';
    this.expUpdate.vendorId = '';
  }
  onSubmit(){
    
  }
  //------------------------------Add Expense Category Model-----------------------------------//
  async addExpense() {
    const modal: HTMLIonModalElement =
      await this.modelCtrl.create({
        component: CapitalExpenseCatPage,
        componentProps: {
          hotelId: this.hotelID
          
        }
      });
    modal.onDidDismiss().then((detail) => {
      // console.log(detail);
      this.getCapitalExpenseAccount();
    });
    return await modal.present();
    // this.getCapitalExpenseAccount();
  }

 //------------------------------Old Validation Code-----------------------------------/
  expenseSubmitClick() {
    // console.log(this.expense.cap_invoice.length);
    let checkValid = false;
    let checklength = false;
    if (this.expense.cap_date == null || this.expense.cap_date == "") {
      checkValid = true;
    }
    if (this.expense.cap_invoice == null || this.expense.cap_invoice == "") {
      checkValid = true;
    }
    if (this.expense.cap_invoice.length < 3) {
      // console.log("dsdhshs");
      let checklength = true;
    }
    if (this.expense.cap_vendor == null || this.expense.cap_vendor == "") {
      checkValid = true;
    }
    if (this.expense.cap_category == null || this.expense.cap_category == "") {
      checkValid = true;
    }
    if (this.expense.cap_cost == null || this.expense.cap_cost == "") {
      checkValid = true;
    }
    if (this.expense.cap_description == null || this.expense.cap_description == "") {
      checkValid = true;
    }

    if (checkValid && checklength) {
      // console.log(checkValid);
      return 0;
    }
    else {
      // console.log(checkValid);
      return 1;
    }
  }

  //------------------------------Edit Capital Expense-----------------------------------//
  // updateCapitalExpClick() {
  //   if (this.ExpenseForm.valid) {
  //     let dic = {};
  //     dic['createdByUserId'] = this.userData.userId;
  //     dic['date'] = this.ExpenseForm.value.date;
  //     dic['capitalExpenseAccountId'] = this.ExpenseForm.value.capitalExpenseAccountId;
  //     dic['userId'] = this.userData.userId;
  //     dic['hotelId'] = this.constant.capitalHotelId
  //     if(this.vendorId)
  //     {
  //       dic['vendorId'] = this.vendorId;
  //     }
  //     else
  //     {
  //       dic['vendorId'] = this.expense.vendorId;
  //     }    
  //     dic['invoiceNo'] = this.ExpenseForm.value.invoiceNo;
  //     dic['cost'] = this.ExpenseForm.value.cost;
  //     dic['description'] = this.ExpenseForm.value.description;
  //     dic['capitalExpenseId'] = this.expense.capitalexpenseId;

  //     console.log(dic);
  //     this.constant.LoadingPresent();
  //     this.service.updateCapitalExpenseAPI(dic).subscribe((result) => {
  //       this.constant.LoadingHide();
  //       if (result.status) {
  //         console.log(result);
  //         this.constant.ToastCustom(result.data.message, 'top');
  //        // this.router.navigate(['/CapitalExpenseInner',{expense: JSON.stringify(this.params) }]);
  //         this.navCtrl.navigateForward(['/CapitalExpenseInner',{expense: JSON.stringify(this.params) }]);
  //       } else {
  //         this.constant.ToastCustom(result.message, 'top');
  //       }
  //     }, error => {
  //       this.constant.Logout(error);
  //     });
  //   }
  //   else {
  //     this.constant.ToastCustom('Please All * Fields are Required', 'top');
  //   }
  // }
}
