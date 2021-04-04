import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, AlertController, Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { WebService } from '../../services/webService';
import { webServicenew } from '../../services/webServicenew';
import { Routes, RouterModule } from '@angular/router';
import { Constant } from '../../services/constant';
import { IonSelect } from '@ionic/angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-gmdashboard',
  templateUrl: './gmdashboard.page.html',
  styleUrls: ['./gmdashboard.page.scss'],
})
export class GMDashboardPage implements OnInit {
  @ViewChild('quaterSelect') quaterselectref: IonSelect;
  @ViewChild('yearSelect') yearselectRef: IonSelect;
  @ViewChild('weekSelect') weekselectRef: IonSelect;
  @ViewChild('monthSelect') monthselectRef: IonSelect;


  MQYsegment: any; oldMQYsegment: any;
  currentYear: any;
  title: any;
  HotelName: any;
  yearDataList: any = []; quarterDataList: any = []; weekDataList: any = []; monthDataList: any = []; userData: any = [];
  yearmodel: any; selectyear: any; quarterModel: any; monthModel: any; weekmodel: any;
  HotelData: any; Hotelname: any; deptDetail: any;
  infiniteScrollEnable = false;hotel_name:any;hoteloriginal_id:any;

  requestParam = { userId: 0, roleId: 0, hotel_id: 0, year: '', month: '', toMonth: '', page: 0 };

  departmentData: any = []; hotelDepartmentsList: []; HotelList: any = [];
  cYear: any;
  cMonth: any;

  constructor(public nacCtrl: NavController, private router: Router, public detectChange: ChangeDetectorRef, public service: webServicenew, public constant: Constant, public events: Events) {
    var monthNames = [ "Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec" ];
    this.cYear = (new Date()).getFullYear();
    // this.cMonth = (new Date()).getMonth()+1;
    this.cMonth = monthNames[(new Date()).getMonth()];

    this.userData = this.constant.getUserData();
    this.requestParam.userId = this.userData.userId;
    this.requestParam.roleId = this.userData.roleId;
    this.requestParam.year = this.cYear;
    this.requestParam.month = this.cMonth;
    this.requestParam.toMonth = this.cMonth;
    this.requestParam.hotel_id = this.userData.hotelId;
    this.constant.HotelId = this.userData.hotelId;
    this.hoteloriginal_id = this.userData.hotelId;
    // this.constant.HotelId = 
    // this.HotelList = JSON.parse(localStorage.getItem('HotelList'));
  }

  ngOnInit() {
    
  }

  next() {
    this.router.navigate(['/expense-categories']);
  }

  ionViewDidEnter() {
    this.getDepartmentList();
    this.setParamFunction();
    this.currentYear = this.constant.currentYear();
    this.yearDataList = this.constant.dateFilterData;
    if (this.yearDataList) {
      const index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.quarterDataList = this.yearDataList[index].quarter; // this.constant.QuaterObject();
      const index1 = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.monthDataList = this.yearDataList[index1].months; // this.constant.QuaterObject();
      const index2 = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.weekDataList = this.yearDataList[index2].weeks;
    }
  }
  setParamFunction() {
    this.requestParam.userId = this.userData.userId;
    this.requestParam.roleId = this.userData.roleId;
    this.requestParam.year = this.constant.year;
    this.requestParam.month = this.constant.month;
    this.requestParam.toMonth = this.constant.toMonth;
     this.requestParam.hotel_id = this.userData.hotelId;
    // this.Hotelname = this.constant.HotelId;
    // this.HotelName = this.constant.hotelName;
  }
  selectsegment() {
    if (this.MQYsegment === 'year') {
      this.title = 'Year';
      setTimeout(() => { this.yearselectRef.open(); }, 500);
    } else if (this.MQYsegment === 'quarter') {
      const index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.quarterDataList = this.yearDataList[index].quarter;
      this.title = 'Quarter';
      setTimeout(() => { this.quaterselectref.open(); }, 500);
    } else if (this.MQYsegment === 'month') {
      const index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.monthDataList = this.yearDataList[index].months;
      this.title = 'Month';
      setTimeout(() => { this.monthselectRef.open(); }, 500);
    } else if (this.MQYsegment === 'week') {
      const index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.weekDataList = this.yearDataList[index].weeks;
      this.title = 'Week';
      setTimeout(() => { this.weekselectRef.open(); }, 500);
    }
  }

  onselectChangeYear(data) {
    if (data === 'year') {
      this.requestParam.year = this.yearmodel;
      this.requestParam.toMonth = 'Dec';
      this.requestParam.month = 'Jan';
      if (this.yearmodel) {
        this.quarterModel = ''; this.monthModel = ''; this.weekmodel = '';
        this.constant.year = this.yearmodel;
        this.getDepartmentList();
      }
    }
    this.oldMQYsegment = data;
  }
  onselectChangeQuarter(data) {
    // var response= this.constant.quaterFormat(this.quarterModel);
    //  this.requestParam.month = response.month;
    //  this.requestParam.toMonth = response.toMonth;
    // console.log(this.quarterModel);
    if (this.quarterModel === 'Q1') {
      this.requestParam.month = 'Jan';
      this.requestParam.toMonth = 'Mar';
    } else if (this.quarterModel === 'Q2') {
      this.requestParam.month = 'Apr';
      this.requestParam.toMonth = 'Jun';
    } else if (this.quarterModel === 'Q3') {
      this.requestParam.month = 'Jul';
      this.requestParam.toMonth = 'Sep';
    } else if (this.quarterModel === 'Q4') {
      this.requestParam.month = 'Oct';
      this.requestParam.toMonth = 'Dec';
    }
    if (this.quarterModel) {
      this.monthModel = ''; this.yearmodel = ''; this.weekmodel = '';
      this.getDepartmentList();
    }
    this.oldMQYsegment = data;
  }
  onselectChangeMonth(data) {
    this.requestParam.month = this.monthModel;
    this.requestParam.toMonth = this.monthModel;
    if (this.monthModel) {
      this.yearmodel = ''; this.quarterModel = ''; this.weekmodel = '';
      this.getDepartmentList();
    }
    this.oldMQYsegment = data;
  }

  onSelectChangeCancel() {
    this.MQYsegment = this.oldMQYsegment;
  }
  getDepartmentList() {
    this.events.publish('footershow', {da:1});
    this.constant.LoadingPresent();
    this.constant.year = this.requestParam.year;
    this.constant.month = this.requestParam.month;
    this.constant.toMonth = this.requestParam.toMonth;
    this.service.getDashboardDataAPI(this.requestParam).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        this.constant.ToastCustom(result.message, 'top');
        this.departmentData = result.data.department_data;
        // console.log(this.departmentData);
        this.hotel_name = result.data;
        this.events.publish('NotificationCount',{countdata:result.data.notificationCount});
        localStorage.setItem("NotificationCount", result.data.notificationCount);
        localStorage.setItem("department_data", JSON.stringify(result));
        this.constant.capitalHotelName = this.hotel_name.hotel_name;
        this.constant.hotelName = this.hotel_name.hotel_name;
        this.detectChange.detectChanges();
        let sortedArray = this.departmentData.sort(function (a, b) {
          return a.expensePer < b.expensePer ? 1 : a.expensePer > b.expensePer ? -1 : 0;
        });
        // console.log(sortedArray);
        if (result.data.department_data.length < 10) {
          this.infiniteScrollEnable = false;
        } else {
          this.infiniteScrollEnable = true;
        }
        // this.departmentData = result.data.department_data;
        this.deptDetail = result.data;
        this.MQYsegment = this.deptDetail.current_filter;
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }

    }, error => {
      this.constant.Logout(error);
    });
  }

  InfinitScrollingAPI(event) {
    // console.log(event);
    if (this.departmentData.length > 0) {
      this.requestParam.page += 10;
    }
    // this.getNotification();
    this.constant.LoadingPresent();
    this.service.getDashboardDataAPI(this.requestParam).subscribe((result) => {
      this.constant.LoadingHide();
      event.target.complete();
      if (result.status) {
        this.constant.ToastCustom(result.message, 'top');
        let department = result.data.department_data;
        this.hotel_name = result.data;
        // console.log(department);
        for (let index = 0; index < department.length; index++) {
          this.departmentData.push(department[index]);
        }
        let sortedArray = this.departmentData.sort(function (a, b) {
          return a.expensePer < b.expensePer ? 1 : a.expensePer > b.expensePer ? -1 : 0;
        });
        // console.log(sortedArray);
        if (department.length < 10) {
          this.infiniteScrollEnable = false;
        } else {
          this.infiniteScrollEnable = true;
        }
        this.deptDetail = result.data;
        this.MQYsegment = this.deptDetail.current_filter;
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
        this.infiniteScrollEnable = false;
      }
    }, error => {
      this.constant.Logout(error);
    });
  }

  selectDashboardClick(event) {
    const index = this.HotelList.findIndex(p => p.hotelId === event.detail.value);
    this.HotelName = this.HotelList[index].hotelName;
    const hotelId = event.detail.value;
    this.requestParam.hotel_id = hotelId;
    

    this.getDepartmentList();
  }
  getDeptExpense(dept) {
    // console.log("depdata",dept);
    // console.log("hbid---",this.hoteloriginal_id);
    dept.label = this.deptDetail.label;
    this.router.navigate(['/expenseCategories', { deptData: JSON.stringify(dept), 
    hotelname: JSON.stringify(this.hotel_name.hotel_name),
    hoteloriginal_id: JSON.stringify(this.hoteloriginal_id)}]);
  }

  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    setTimeout(() => {
      // console.log('Async operation has ended');
     
      // this.ionViewWillEnter();
      this.requestParam.page = 0;
      this.getDepartmentList();
      

      
      event.target.complete();
    }, 500);
  }
}
