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
  selector: 'app-rmdashboard',
  templateUrl: './rmdashboard.page.html',
  styleUrls: ['./rmdashboard.page.scss'],
})
export class RMDashboardPage implements OnInit {
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
  HotelData: any; Hotelname: any; deptDetail: any;hotel_name: any;
  infiniteScrollEnable = false;hoteloriginal_id:any;

  requestParam = { userId: 0, roleId: 0, hotel_id: 0, year: '', month: '', toMonth: '', page: 0 };

  departmentData: any = []; hotelDepartmentsList: []; HotelList: any = [];

  constructor(public nacCtrl: NavController, private router: Router, public detectChange: ChangeDetectorRef,
     public service: webServicenew, public constant: Constant, public events: Events) {
    this.userData = this.constant.getUserData();
     this.HotelList = JSON.parse(localStorage.getItem('HotelList'));
  }

  ngOnInit() {
  }

  next() {
    this.router.navigate(['/expense-categories']);
  }

  ionViewDidEnter() {
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
    this.requestParam.hotel_id = this.constant.HotelId;
    this.Hotelname = this.constant.HotelId;
    this.HotelName = this.constant.hotelName;
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
        this.departmentData = result.data.department_data;
        this.hotel_name = result.data;
        localStorage.setItem("department_data", JSON.stringify(result));
        // this.events.publish('departmentdata', {data: result});
        // console.log("dat",result)
        // console.log(this.departmentData);
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
        this.constant.ToastCustom(result.message, 'top');
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
        this.constant.ToastCustom(result.message, 'top');
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
    console.log('HotelList',this.HotelList);
    const index = this.HotelList.findIndex(p => p.hotelId === event.detail.value);
    this.HotelName = this.HotelList[index].hotelName;
    const hotelId = event.detail.value;
    this.requestParam.hotel_id = hotelId;
    // console.log("newhbhb",this.requestParam.hotel_id);
    // console.log("newhbhb1",event.detail.value);
    this.hoteloriginal_id = event.detail.value;
    console.log('hoteloriginal_id',this.hoteloriginal_id);


    this.constant.HotelId = event.detail.value;
    this.constant.hotelName = this.HotelList[index].hotelName;
    this.getDepartmentList();
  }
  getDeptExpense(dept) {
    // console.log("deptd",dept);
    // console.log(this.requestParam);
    // console.log("2",this.hotel_name.hotel_name)
    dept['label'] = this.deptDetail.label;
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
