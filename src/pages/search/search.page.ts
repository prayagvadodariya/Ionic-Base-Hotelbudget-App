import { Component, OnInit, ViewChild } from "@angular/core";
import { Constant } from "../../services/constant";
import { webServicenew } from "../../services/webServicenew";
import { AddVendorPage } from '../add-vendor/add-vendor.page';
import {
  NavController,
  NavParams,
  ModalController,
  ToastController,
  AlertController,
  IonSelect
} from "@ionic/angular";
import { VendorListPage } from "../vendor-list/vendor-list.page";
import { Router } from "@angular/router";
import { FooterComponent } from "src/components/footer/footer";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"]
})
export class SearchPage implements OnInit {
  @ViewChild("yearSelect") yearselectRef: IonSelect;
  @ViewChild("quaterSelect") quaterselectref: IonSelect;
  @ViewChild("weekSelect") weekselectRef: IonSelect;
  @ViewChild("monthSelect") monthselectRef: IonSelect;

  fromDate: any;
  toDate: any;
  fromDatevalue = false;
  todatevalue = false;
  dateflag = true;
  category1: any = "";
  depatmentselect: any = "";
  vendor: any;
  maxValue: any;
  userData: any;
  cYear: number;
  cMonth: string;
  MQYsegment: string;
  yearDataList: any = [];
  title: string;
  dipartmentName: any = [];
  place: any;
  catagory: any = [];
  value: any;
  currentdatetime: Date;
  fromdate: number;
  todate: any;
  fromyear: number;
  toyear: number;
  monthNames: string[];
  cMont: string;
  cMon: string;
  department: any = [];
  
  hotelId: any;
  userId: any;
  department_data: any;
  DapartmentData: any;
  department_Id: any;
  expenseAccount_Id;
  vendor_Id;
  from_date: any;
  to_date: any;
  HotelName: any;
  datevalidationForm: FormGroup;
  reqparam: any;
  req: any;
  roleId: any;
  categoryActive: any;
  deptemp = '';
  constructor(
    public fb: FormBuilder,
    public constant: Constant,
    public navCtrl: NavController,
    public service: webServicenew,
    public modalCtrl: ModalController,
    private router: Router
  ) {
    this.userData = this.constant.getUserData();
    // console.log(this.userData);

    /////// date and year
    var monthNames = [ "Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec" ];
    this.cYear = new Date().getFullYear();
    this.cMonth = monthNames[new Date().getMonth()];
    // console.log(this.cMonth);
    // console.log(this.userData.roleId);
    var currentYear = this.constant.currentYear();
    this.maxValue = currentYear + 1 + "-" + "12";
    this.categoryActive =0;
    this.cYear = (new Date()).getFullYear();
    this.cMonth = monthNames[(new Date()).getMonth()];
  
    if(this.userData.roleId == 1){
      this.hotelId = this.constant.HotelId;
      this.HotelName = this.constant.hotelName;
     }else if(this.userData.roleId == 2){
      this.hotelId = this.userData.hotelId;
      this.HotelName = this.constant.capitalHotelName;
     }
   
    this.userId = this.userData.userId;
    this.roleId = this.userData.roleId;
    // this.reqparam.roleId = this.userData.roleId;

    this.department_data= JSON.parse(localStorage.getItem("department_data"));
    this.DapartmentData = this.department_data.data.department_data;
    // console.log("dpdata",this.department_data);
    this.DateValtion();
  }

  ngOnInit() {
   
  }

  DateValtion() {
    this.datevalidationForm = this.fb.group({
      fromDate: ['', Validators.compose([Validators.required])],
      toDate: ['', Validators.compose([Validators.required])],
    });
  }

  
  /////segment y m q d
  fromDateClick(fromDate, data) {
    // console.log(fromDate);
    this.from_date = this.constant.dateFormat(this.fromDate);
    this.to_date = this.constant.dateFormat(this.toDate);
    // console.log("Fromedate",this.fromDate);
    // console.log("todate",this.toDate);
    var ts = new Date(fromDate);
    // console.log(ts.toDateString());
    this.cMonth = this.monthNames[new Date(fromDate).getMonth()];
    // console.log(this.cMonth);
    this.dateflag = true;

    if (data === "fromDate") {
      this.req.fromDate = fromDate;
      this.fromDatevalue = false;
      // this.fromdate = ts.getMonth() + 1
      //this.fromdate = this.monthNames[(new Date()).getMonth()];
      // console.log(this.fromdate);
      this.reqparam.year = ts.getFullYear();
      // console.log(this.fromyear);
      this.cMont = this.monthNames[new Date(fromDate).getMonth()];
      // console.log(this.cMont);
      this.reqparam.month = this.cMont;
    }
    if (data === "toDate") {
      this.todatevalue = false;
      this.req.toDate = fromDate;
      this.todate = ts.getMonth() + 1;
      // console.log(this.todate);
      this.toyear = ts.getFullYear();
      // console.log(this.toyear);
      this.cMon = this.monthNames[new Date(fromDate).getMonth()];
      // console.log(this.cMon);
      this.reqparam.toMonth = this.cMon;
    }
    if (this.fromDate > this.toDate) {
      this.dateflag = false;
      // console.log(this.dateflag);
    }

    // console.log(this.dateflag);
  }
  selectsegment() {
    if (this.MQYsegment === "year") {
      this.title = "Year";
    } else if (this.MQYsegment === "quarter") {
      // const index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      // this.quarterDataList = this.yearDataList[index].quarter;
      this.title = "Quarter";
      // console.log("hello quarter");
    } else if (this.MQYsegment === "month") {
      // const index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      // this.monthDataList = this.yearDataList[index].months;
      // console.log("hello month");

      this.title = "Month";
    } else if (this.MQYsegment === "week") {
      // const index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      // this.weekDataList = this.yearDataList[index].weeks;
      // console.log("hello week");

      this.title = "Week";
    }
  }

  getListDepartment(dept){
    this.categoryActive =1;
   this.department_Id= dept.detail.value;
   this.category1 = '';
   if(this.deptemp != ''){
        let dic = {
          departmentId: this.department_Id,
          }
        this.constant.LoadingPresent();
        this.service.getExpenselistAPI2(dic).subscribe((result) => {
          this.constant.LoadingHide();
          //  console.log("department",result);
          this.catagory = result.data;
          //  console.log( this.dipartmentName);
    
          // this.department = this.dipartmentName[0].departmentId;
        //   console.log(this.department);
        //  console.log("hbid",this.constant.HotelId);
        if(result.status){
          this.constant.ToastCustom(result.message, 'top');
        }else{
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
        });
   }else{
    this.catagory = [];
    this.expenseAccount_Id = '';
   }
   
   }

getListCategory(val){
  // console.log("cat",val);
    this.expenseAccount_Id = val.detail.value;  
 

}
  checkConfirmExpense(event) {
    this.req.expenseAccountId = event.target.value;
    
  }
  async getAddVendorModel() {
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

  async selectVendorModel(val) {
    // console.log("vendor id", val);
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: VendorListPage,
      componentProps: {
        type: "vendorListModel"
      }
    });

    modal.onDidDismiss().then(detail => {
      if (detail) {
        if (detail.data) {
          // console.log(detail);
          // console.log("The result:", detail.data.vendorCompany);
          this.vendor = detail.data.vendorCompany;
          // this.req.vendor = this.vendor;
          this.vendor_Id = detail.data.vendorId;
          // console.log("vid",this.vendor_Id);
        }
      }
    });
    await modal.present();
  }
  deleteVendor(){
    // console.log("delete vendor",this.vendor_Id)
    this.vendor = '';
    this.vendor_Id = '';
  }

  searchClick() {
    let dic = {
      expenseAccountId: this.expenseAccount_Id,
      vendor: this.vendor_Id,
      fromDate: this.from_date,
      toDate: this.to_date,
      hotelId: this.hotelId,
      departmentId: this.department_Id,
      userId: this.userData.userId,
      page: "123"
    };
    this.router.navigate(['/SearchList', { serachParam: JSON.stringify(dic) }]);
    // console.log("page event search-inner",dic);
   
  }
}
