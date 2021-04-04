import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
import { Router } from '@angular/router';
import { IonSelect, Events, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-capital-expense',
  templateUrl: './capital-expense.page.html',
  styleUrls: ['./capital-expense.page.scss'],
})
export class CapitalExpensePage implements OnInit {

  @ViewChild('quaterSelect') quaterselectref: IonSelect;
  @ViewChild('yearSelect') yearselectRef: IonSelect;
  @ViewChild('weekSelect') weekselectRef: IonSelect;
  @ViewChild('monthSelect') monthselectRef: IonSelect;


  
  getCapitalExpList: [];
  yearDataList: any = [];
  quarterDataList: any = [];
  weekDataList: any = [];
  monthDataList: any = [];
  reqParam = { year: 2019, month: '', toMonth: '' };

  //varibles
  oldMQYsegment: any;
  MQYsegment: any;
  currentYear: any;
  title: any;
  CurrentDate: any;

  yearmodel: any;
  selectyear: any;
  quarterModel: any;
  monthModel: any;
  weekmodel: any;
  params: any;
  userData: any;
  cMonth: any;
  seleMonth: any;
  seleyear: any;
  month: any=[];
  constructor(public service: webServicenew,public navCtrl: NavController, public events: Events, public constant: Constant, private router: Router, public activatedRoute: ActivatedRoute) {
    var monthNames = [ "Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec" ];
    this.cMonth = monthNames[(new Date()).getMonth()];
    this.month = new Date().getMonth()+1;
    console.log(this.cMonth);
    this.currentYear = this.constant.currentYear();
    this.constant.HotelId=0;
    this.userData = this.constant.getUserData();
    this.events.publish('menudatahide', {data:this.userData.hotelId});
    this.seleMonth = this.cMonth + " - " + this.currentYear;
    this.monthModel = 'Jan'
  }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.yearDataList = this.constant.dateFilterData;
    this.reqParam.year = this.currentYear;
    this.reqParam.month = this.cMonth;
    this.reqParam.toMonth = this.cMonth;
    this.MQYsegment = 'month';
    this.oldMQYsegment =  this.MQYsegment;
    this.getCapitalExpense();
  }

  getCapitalExpense() {
    this.constant.LoadingPresent();
    // console.log(this.reqParam);
    // this.seleyear =   this.reqParam.year;
    this.service.getCapitalExpenseAPI(this.reqParam).subscribe((result) => {
      // console.log(result);
      if (result.status) {
        this.constant.LoadingHide();
        this.getCapitalExpList = result.data;
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  onselectChangeYear(data) {
    // console.log(this.yearmodel);
    if (data == 'year') {
      this.reqParam.year = this.yearmodel.id;
      this.reqParam.toMonth = 'Dec';
      this.reqParam.month = 'Jan';
      if (this.yearmodel) {
        this.quarterModel = ''; this.monthModel = ''; this.weekmodel = '';
        this.constant.year = this.yearmodel;
        this.seleMonth = this.yearmodel.name;
        this.currentYear = this.yearmodel.name;
        this.getCapitalExpense();
      }
    }
    this.oldMQYsegment = data;
  }
  onselectChangeQuarter(data) {
    // console.log("this.quarterModel.name",data);
    // console.log(this.quarterModel.name);
    if (this.quarterModel.name == 'Q1') {
      this.reqParam.month = 'Jan';
      this.reqParam.toMonth = 'Mar';
    }
    else if (this.quarterModel.name == 'Q2') {
      this.reqParam.month = 'Apr';
      this.reqParam.toMonth = 'Jun';
    }
    else if (this.quarterModel.name == 'Q3') {
      this.reqParam.month = 'Jul';
      this.reqParam.toMonth = 'Sep';
    }
    else if (this.quarterModel.name == 'Q4') {
      this.reqParam.month = 'Oct';
      this.reqParam.toMonth = 'Dec';
    }

    if (this.quarterModel) {
      this.monthModel = ''; this.yearmodel = ''; this.weekmodel = '';
      this.seleMonth = this.quarterModel.name + " - " + this.currentYear;
      this.getCapitalExpense();
    }
    this.oldMQYsegment = data;
  }
  onselectChangeMonth(data) {
    console.log(data);
    // cMonth
    this.reqParam.month = this.monthModel.name;
    this.reqParam.toMonth = this.monthModel.name;
    
    if (this.monthModel) {
      this.yearmodel = ''; this.quarterModel = ''; this.weekmodel = '';
      this.getCapitalExpense();
      this.seleMonth = this.monthModel.name + " - " + this.currentYear;
    }
    this.oldMQYsegment = data;
  }
  selectsegment() {
    // console.log(this.MQYsegment);
    if (this.MQYsegment == 'year') {
      this.title = 'Year';
      setTimeout(() => { this.yearselectRef.open(); }, 500)
      //  this.MQYsegment = this.oldMQYsegment;
    }
    else if (this.MQYsegment == 'quater') {
      let index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.quarterDataList = this.yearDataList[index].quarter;//this.constant.QuaterObject();
      // console.log(this.quarterDataList);
      this.title = 'Quarter';
      setTimeout(() => { this.quaterselectref.open(); }, 500)
      //this.MQYsegment = this.oldMQYsegment;
    }
    else if (this.MQYsegment == 'month') {
      let index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.monthDataList = this.yearDataList[index].months;//this.constant.QuaterObject();
      // console.log(this.monthDataList);
      this.title = 'Month';
      setTimeout(() => { this.monthselectRef.open(); }, 500)
      // this.MQYsegment = this.oldMQYsegment;
    }
    else if (this.MQYsegment == 'week') {
      let index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.weekDataList = this.yearDataList[index].weeks;//this.constant.QuaterObject();
      // console.log(this.weekDataList);
      this.title = 'Week';
      setTimeout(() => { this.weekselectRef.open(); }, 500)
      //this.MQYsegment = this.oldMQYsegment;
    }

  }
  onSelectChangeCancel() {
    this.MQYsegment = this.oldMQYsegment;
  }
  getxpenseDetailClick(exp) {
    //  console.log(exp);
    // console.log(this.reqParam);
    this.constant.capitalHotelId = exp.hotelId;
    this.constant.hotelName = exp.hotelName;
    this.navCtrl.navigateForward(['/CapitalExpenseInner', { expense: JSON.stringify(this.reqParam) }]);
    // this.router.navigate(['/CapitalExpenseInner', { expense: JSON.stringify(this.reqParam) }]);
  }
}
