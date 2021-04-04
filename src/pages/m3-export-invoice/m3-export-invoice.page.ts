import { Component, OnInit } from '@angular/core';
import { Constant } from "../../services/constant";
import { webServicenew } from "../../services/webServicenew";
import * as Highcharts from "highcharts";
import { Router } from '@angular/router';
import { Events, NavController } from '@ionic/angular';

@Component({
  selector: 'app-m3-export-invoice',
  templateUrl: './m3-export-invoice.page.html',
  styleUrls: ['./m3-export-invoice.page.scss'],
})
export class M3ExportInvoicePage implements OnInit {
  userData: any = [];
  HotelList: any = [];

  month: any; dt: any;
  fromDate: any; todate: any;
  infiniteScrollEnable: any;
  reqParam: any = {};
  m3Data: any = [];
  m3Data2: any = [];
  hotelName: any;
  isShow :any;
  returnDateValue: any;
  hotelId: any;
  from_date: any;
  to_date: any;

  tempdata:string="";
  data: any;
  constructor(public service: webServicenew,public events: Events,public navCtrl: NavController, private router: Router, public constant: Constant) {
    this.userData = this.constant.getUserData();
    this.HotelList = JSON.parse(localStorage.getItem("HotelList"));

    this.isShow = this.constant.pmstatus; 
    this.events.subscribe('segment', (data) => {
      if(data == "PMModule"){
      this.isShow = false
      // console.log('p');
      } else {
        //  console.log('m');
        this.isShow = true
        // this.constant.pmstatus = 'true';
      }
      // this.pmdata = data;
      //   console.log("11",this.pmdata)
      // console.log("public events: Events",data);
    });
    this.events.subscribe('segment0', (data) => {
      if(data == "budgetModule"){
      this.isShow = true
      // this.constant.pmstatus = 'true';
      // console.log('p0');
      } else {
        //  console.log('m0');
        this.isShow = false
      }
      // this.pmdata = data;
      //   console.log("11",this.pmdata)
      // console.log("public events: Events",data);
    });
    if(this.userData.roleId == 1){
      this.hotelId = 0;
    }else if(this.userData.roleId == 2){
      this.hotelId = this.userData.hotelId;
      this.hotelName = this.constant.capitalHotelName
    }else if(this.userData.roleId == 5){
      this.hotelId = this.userData.hotelId;
      this.hotelName =  this.constant.hotelName
    }else if(this.userData.roleId == 6){
      this.hotelId = this.userData.hotelId;
      this.hotelName =  this.constant.hotelName
    }else if(this.userData.roleId == 7){
      this.hotelId = this.userData.hotelId;
      this.hotelName =  this.constant.hotelName
    }

    // let template = new Date().toISOString();
    let fromdate = new Date();
    fromdate.setMonth(new Date().getMonth() - 1);
    let todate = new Date();
    this.from_date = this.constant.dateFormat(fromdate);
    this.to_date = this.constant.dateFormat(todate);
    this.getM3Data();
  }
 
  ngOnInit() {
  }
  gotoNotification(){
    this.router.navigate(['/pm-notification']);
 }

  ExportInvoiceList(data){
    // this.router.navigate(['/export-invoice-list', { invoiceData: JSON.stringify(data),
    this.navCtrl.navigateForward(['/export-invoice-list', { invoiceData: JSON.stringify(data),
    hotelId: JSON.stringify(this.hotelId)}]);
    // console.log("exportinvoice page",data);
    
  }

  changeHotel(eve) {
    this.hotelId = eve.target.value;
    this.getM3Data();
  }

  changeFromDate(eve) {
    let date = new Date(eve.target.value);
    
    // if (eve.target.value.length > 10) {
      if (this.from_date <= this.to_date) {
        this.from_date = this.constant.dateFormat(date);
        // this.reqParam.from_transferedDate = this.from_date;
        this.getM3Data();
      // } else {
      //   this.constant.ToastCustom('To Date must be greater than From Date', 'top');
      // }
    }
  }

  changeToDate(eve) {
    let date = new Date(eve.target.value);

    // if (eve.target.value.length > 10) {
      // if (this.from_date <= this.to_date) {
        this.to_date = this.constant.dateFormat(date);
        // this.reqParam.to_transferedDate = this.to_date;
        this.getM3Data();
      // } else {
      //   this.constant.ToastCustom('To Date must be greater than From Date', 'top');
      // }
    // }
  }

  getM3Data() {
    this.reqParam.userId = this.userData.userId;
    this.reqParam.hotelId = this.hotelId;
    this.reqParam.page = 0;
    this.reqParam.orderBy = 'transferedDate';
    this.reqParam.from_transferedDate = this.from_date;
    this.reqParam.to_transferedDate = this.to_date;
    // console.log(this.reqParam)
    this.constant.LoadingPresent();
    this.service.getM3ExportInvoiceAPI(this.reqParam).subscribe(
      result => {
        this.constant.LoadingHide();
        if (result.status) {
          this.m3Data = result.data;
          this.m3Data2 = this.m3Data.resultArr;
          this.data = result.data.resultArr.length;
          if (this.data < 20) {
            this.infiniteScrollEnable = false;
          }
          else {
            this.infiniteScrollEnable = true;
          }
          this.constant.ToastCustom(result.message, 'top');
          this.generateM3Chart();
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }

  InfinitScrolling(event) {

    if (this.data > 0) {
      this.reqParam.page += 20;
    }
    this.constant.LoadingPresent();
    this.service.getM3ExportInvoiceAPI(this.reqParam).subscribe(
      result => {
        this.constant.LoadingHide();
        event.target.complete();
        if (result.status) {
          let responseData = result.data;
          for (var i = 0; i < responseData.resultArr.length; i++) {
            this.m3Data2.push(responseData.resultArr[i]);
          }
          if (responseData.resultArr.length < 20) {
            this.infiniteScrollEnable = false;
          }
          else {
            this.infiniteScrollEnable = true;
          }
          this.constant.ToastCustom(result.message, 'top');
        } else {
          this.infiniteScrollEnable = false;
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      },
      error => {

      }
    );
  }

  generateM3Chart() {
    // console.log(this.m3Data.hotelData);

    if(this.m3Data.hotelData != 0){
      this.tempdata = "";
    }else{
      this.tempdata = "tempclass";
    }
    Highcharts.chart('m3Dashboard', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: "rgba(255, 255, 255, 0.0)",
        height: (8 / 9) * 100 + "%" // 16:9 ratio
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      exporting: { enabled: false },
      tooltip: {
        formatter: function () {
          var legend = new Array();
          legend.push(this.point.title + '<br>');
          legend.push('<b>Invoices :</b> ' + this.point.y + '<br>');
          return legend;
        },
        shared: true,
        useHTML: true
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
        }
      },
      series: [
        {
          type: "pie",
          data: this.m3Data.hotelData
        }
      ]
    });
  }

  convertDate(date) {
    var year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.dt = date.getDate();

    if (this.dt < 10) {
      this.dt = '0' + this.dt;
    }
    if (this.month < 10) {
      this.month = '0' + this.month;
    }
    let returnDate = year + '-' + this.month + '-' + this.dt;
    return returnDate;

  }

}
