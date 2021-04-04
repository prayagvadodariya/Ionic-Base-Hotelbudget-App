import { AddVendorPage } from './../add-vendor/add-vendor.page';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, NavParams, ModalController, ToastController, AlertController, Events, } from '@ionic/angular';
import { VendorListPage } from '../vendor-list/vendor-list.page'
import { Constant } from "../../services/constant";
import { webServicenew } from '../../services/webServicenew';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.page.html',
  styleUrls: ['./update-expense.page.scss'],
})
export class UpdateExpensePage implements OnInit {

  expenseData: any = [];
  vendor: any;
  vendorId: any;
  userData: any = [];
  getDepartmentList: any = [];
  authForm: FormGroup;
  GetCategoryList: any = [];
  hotelname:any;
  updateExpense: any;
  dataResultArr: any;
  confirmExpensedata: any;
  catagory: any;
  accountName: any;
  selDATA = 2;
  cMonth: any;
  cYear: any;
  HotelName: any;
  hotelId: any;
  purchaseOrder: boolean;
  invoiceNumber: string;
  date: any;
  minDate: string = new Date().toISOString();
  maxData : any = (new Date()).getFullYear() + 2;
  OldPoNumber: any;
  purchaseOrderPoNumber: any;
  from_date: any;
  to_date: any;
  reqParam: any;
  expenseData0: any;
  departmentId: any;
  hoteloriginal_id: any;
  dataform: any = [];

  department_data: any;
  DapartmentData: any;

  checkonetimecall = true;

  totaltempcost:any;
  year:any;
  month:any;

  constructor(public fb: FormBuilder,public cd:ChangeDetectorRef,public navCtrl: NavController, public activatedRoute: ActivatedRoute, public events: Events,
    private router: Router, public modalCtrl: ModalController, public service: webServicenew, public constant: Constant) {
    var monthNames = [ "Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec" ];
    this.cMonth = monthNames[(new Date()).getMonth()];
    this.cYear = (new Date()).getFullYear();
    this.userData = this.constant.getUserData();
    this.reqParam = JSON.parse(this.activatedRoute.snapshot.paramMap.get('serachParam'));
    this.updateExpense = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
    this.expenseData0 = JSON.parse(this.activatedRoute.snapshot.paramMap.get('deptData'));
    this.departmentId = JSON.parse(this.activatedRoute.snapshot.paramMap.get('departmentId'));
    this.hoteloriginal_id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('hoteloriginal_id'));
    this.year = JSON.parse(this.activatedRoute.snapshot.paramMap.get('year'));
    this.month = JSON.parse(this.activatedRoute.snapshot.paramMap.get('month'));
    this.dataResultArr = this.updateExpense.data.resultArr;
    this.date = this.updateExpense.data.date;
    this.dataResultArr.PONumber = this.dataResultArr.PONumber;
    this.OldPoNumber = this.dataResultArr.PONumber;
    this.accountName = this.dataResultArr.accountName;
    console.log("updateExpense",this.updateExpense);

    // console.log("data1",this.dataResultArr);


    this.department_data= JSON.parse(localStorage.getItem("department_data"));
    this.DapartmentData = this.department_data.data.department_data;

    this.totaltempcost =   parseFloat(this.dataResultArr.remainingAmount) + parseFloat(this.dataResultArr.amount);
    console.log("Total cost >>>>>>",this.totaltempcost);


    this.dataResultArr.remainingAmount = this.totaltempcost - parseFloat(this.dataResultArr.amount);

    if(this.userData.roleId == 1){
      this.hotelId = this.constant.HotelId;
      this.HotelName = this.constant.hotelName;
    }else if(this.userData.roleId == 2){
      this.hotelId = this.userData.hotelId;
      this.HotelName = this.constant.capitalHotelName;
    }
    if(this.dataResultArr.isPurchaseOrder == 1){
      this.purchaseOrder = true;
      this.dataResultArr.PONumber;
      // console.log("1",this.dataResultArr.isPurchaseOrder);
    }else if(this.dataResultArr.isPurchaseOrder == 0){
      this.purchaseOrder = false;
      // console.log("2",this.dataResultArr.isPurchaseOrder);
      this.dataResultArr.PONumber;
    }
    
    this.getCategoryList();
    this.formPasswordValidation();
    // console.log(this.userData);
  }

  formPasswordValidation() {
    this.authForm = this.fb.group({
      date: ['', Validators.compose([Validators.required])],
      itemDescription: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([ Validators.required])],
      remainingamount: ['', Validators.compose([Validators.required])],
      budget: ['', Validators.compose([Validators.required])],
      // category: ['', Validators.compose([Validators.required])],
      // cost: ['', Validators.compose([Validators.pattern('^[0-9]{1,100}$'), Validators.required])],
      // department: ['', Validators.compose([Validators.required])],
      vendor: ['', Validators.compose([Validators.required])],
      invoiceNumber: ['', Validators.compose([Validators.required])],
    });
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
          this.vendor = detail.data.vendorCompany + detail.data.vendorNumber;
          this.vendorId = detail.data.vendorId;
          // console.log("vendorName",this.vendor);
          // console.log("vendorId",this.vendorId);
          this.dataResultArr.vendorCompany= detail.data.vendorCompany;
          this.dataResultArr.vendor = this.vendorId;
        }
      }
    });
    await modal.present();
  }

  ngOnInit() {
    
  }
  getPurchaseOrderCLick(purchaseOrder) {
    // console.log(purchaseOrder);
    if (purchaseOrder) {
      // this.invoiceNumber = "";
      // this.dataResultArr.PONumber = "";
      this.purchaseOrder = true;
      this.dataResultArr.isPurchaseOrder = "1";
      this.dataResultArr.PONumber = '';
    }
    else {
      this.purchaseOrder = false;
      this.dataResultArr.isPurchaseOrder = "0";
      this.dataResultArr.PONumber = this.OldPoNumber;
      
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
  
  CategoryData(val){
    if(val){
      this.dataResultArr.accountName = val.detail.value.accountName;
      console.log("catergory",val);
    }
   
    // console.log("1",val.detail.value.accountName);

    // if(this.checkonetimecall == true)
    // {
        var dic = {
          userId:this.userData.userId,
          date: this.constant.dateFormat(this.dataResultArr.date),
          expenseAccount : this.dataResultArr.expenseAccountId,
          hotelId: this.hotelId,
          amount:this.dataResultArr.amount
          // amount: 
        }
            // this.expenseInputs[j].category = val.detail.value;
          // console.log(dic);
        
        this.service.confirmExpenselistAPI(dic).subscribe((result) => {
          this.checkonetimecall = false;
          this.confirmExpensedata = result.data;
          // if(this.confirmExpensedata.remainingAmount != 0 && this.confirmExpensedata.budget != 0){
            // console.log(this.confirmExpensedata);
            // console.log("confirm Expense data",this.confirmExpensedata.remainingAmount);
            // this.dataResultArr.remainingAmount = this.confirmExpensedata.remainingAmount;
            this.totaltempcost  =  parseFloat(result.data.remainingAmount) + parseFloat(result.data.budget);

            this.dataResultArr.totalBudget = this.confirmExpensedata.budget;
            this.dataResultArr.remainingAmount = this.totaltempcost - parseFloat(this.dataResultArr.amount);
            // this.dataResultArr.accountName = val.detail.value.accountName;
            // this.dataResultArr.expenseAccountId = val.detail.value.expenseAccountId;
            if (result.data.status == "sufficient") {
              // console.log(result);
              // this.checkNotificationStatus = false;
            }
            else if (result.status == "unsufficient") {
              this.constant.AlertCustom('Over Expense', result.data.message, 'Ok');
              // this.checkNotificationStatus = true;
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
          // }
          
        });
    // }else{
    //   this.checkonetimecall = true;
    // } 

    // this.dataResultArr.accountName = val.detail.value.accountName;
    // this.dataResultArr.expenseAccountId = val.detail.value.expenseAccountId;
    
  }


  deleteVendor(){
    // console.log("delete vendor",this.vendorId)
    this.dataResultArr.vendor = "";
    this.dataResultArr.vendorCompany = "";
    this.dataResultArr.van
    this.vendor = '';
    this.vendorId = '';
  }
  getCategoryList() {
  
    var dic = {
      // userId: this.userData.userId,
      // hotelId: this.hotelId,
      departmentId:this.dataResultArr.departmentId,
      // month: this.cMonth,
      // toMonth: this.cMonth,
      // year: this.cYear,
      
    }
    // console.log(dic);
    
    this.service.getExpenselistAPI2(dic).subscribe((result) => {
      this.catagory = result.data;
      this.dataResultArr.expenseAccountId = this.dataResultArr.expenseAccountId;
      
      // this.cd.detectChanges();
      // console.log(this.confirmExpensedata);
      // console.log("confirm Expense data",this.confirmExpensedata.remainingAmount);
      if(result.status){
        // this.constant.ToastCustom(result.message, 'top');SPSE
      }else{
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    });
    // this.cd.detectChanges();
    // this.cd.markForCheck();
  }

 UpdateExpense(val){
    this.dataform = val;
    // console.log("date",this.dataform)
    // if(this.purchaseOrder==true){
      
    // }  
    let dic = {
      date:this.constant.dateFormat(this.dataform.date),
      PONumber:this.dataResultArr.PONumber,
      isPurchaseOrder:this.dataResultArr.isPurchaseOrder,
      amount:this.dataResultArr.amount,
    
      expenseAccountId:this.dataResultArr.expenseAccountId,
      expenseId:this.dataResultArr.expenseId,
      itemDescription:this.dataResultArr.itemDescription,
      // modifiedByUserId
      vendor:this.dataResultArr.vendor,
      hotelId:this.hotelId,
      departmentId:this.dataResultArr.departmentId,
      budgetAllocationId:this.dataResultArr.budgetAllocationId,
      userId:this.userData.userId,
      OldPONumber:this.OldPoNumber,
       

      
    };
     console.log(dic);
     if(dic.PONumber == '' && this.purchaseOrder == false){
      this.constant.ToastCustom('PoNumber is required', 'top');
     }else{

     if(dic.date!=''  && dic.isPurchaseOrder!='' && dic.amount!='' && dic.expenseAccountId!='' 
     && dic.expenseId!='' && dic.itemDescription!='' && dic.vendor!='' && dic.departmentId!='' && dic.budgetAllocationId!='' && dic.userId!='' ){
      this.constant.LoadingPresent();
      this.service.getupdateExpenseAPI(dic).subscribe((result) => {
        this.constant.LoadingHide();
        if (result) {
          // console.log("update expences");
          if(this.reqParam!=null){
          this.router.navigate(['/SearchList',{ serachParam: JSON.stringify(this.reqParam)}]);
          this.events.publish('reload', (reload1) => {
          });
          }else if(this.expenseData0!=null){
            this.navCtrl.back();
          }
            // this.navCtrl.navigateBack(['/showExpense', {deptData: JSON.stringify(this.expenseData0),
            //   departmentId: JSON.stringify(this.departmentId),
            //   hoteloriginal_id: JSON.stringify(this.hoteloriginal_id),
            //   year: JSON.stringify(this.year),
            //   month: JSON.stringify(this.month),
            //  }]);
            //   this.events.publish('reload', (reload) => {
            //   });
          // }else if(this.expenseData0!=null){
          //   this.navCtrl.navigateBack('/showExpense');
          // }
          this.constant.ToastCustom(result.message, 'top');
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      }, error => {
        this.constant.Logout(error);
      });
    }else{
      this.constant.ToastCustom('All * fields are required', 'top');
    }
  }
  }


 
}
