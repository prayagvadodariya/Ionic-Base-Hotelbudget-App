import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from "../../services/constant";
import { IonSelect } from "@ionic/angular";

@Component({
  selector: 'app-pm-dashboard-status',
  templateUrl: './pm-dashboard-status.page.html',
  styleUrls: ['./pm-dashboard-status.page.scss'],
})
export class PmDashboardStatusPage implements OnInit {
  @ViewChild("quaterSelect") quaterselectref: IonSelect;
  @ViewChild("yearSelect") yearselectRef: IonSelect;
  params: any;
  userData: any;
  hotelId: any; HotelList: any = [];
  requestParam = { userId: 0, quarter: '', roleId: 0, room: '', surveyStatus: '', hotelId: 0, year: '', page: 0, categoryId: '' };
  roomList: any = [];
  currentYear: any;
  yearDataList: any = [];
  quarterDataList: any = [];
  categoryList: any = [];
  surveyStatus: any = [];
  yearmodel: any;
  MQYsegment: any;
  oldMQYsegment: any;
  title: any;
  quarterModel: any;
  PMStatusDataList: any = [];
  infiniteScrollEnable = false;
  hotelName: any;
  compareWith:any;

  CategoryOptions = {
    title: 'Category'
  };
  status: any;
  name: any;
  category: any;
  data: any;
  pmNotification: any;

  constructor(public activatedRoute: ActivatedRoute, public service: webServicenew, public constant: Constant,
    public cdRef: ChangeDetectorRef, private router: Router) {
      this.pmNotification = JSON.parse(localStorage.getItem("pm_notifivation"));
      this.params = JSON.parse(this.activatedRoute.snapshot.paramMap.get('deptData'));
      this.data = JSON.parse(this.activatedRoute.snapshot.paramMap.get('status'));
      this.category = JSON.parse(this.activatedRoute.snapshot.paramMap.get('name'));
      this.name = this.data.name;
      console.log("parameter",this.name);
      console.log("parameter",this.params);
      // console.log("parameter",this.name);
    // if (this.activatedRoute.snapshot.p,aramMap.get('deptData')) {
      
    //   setTimeout(() => {
    //     this.cdRef.detectChanges();
    //     this.params = JSON.parse(this.activatedRoute.snapshot.paramMap.get('deptData'));
    //   }, 200);
    // }
    this.userData = this.constant.getUserData();
    this.HotelList = JSON.parse(localStorage.getItem("HotelList"));
    if (this.userData.hotelId==0) {
      this.hotelName = this.constant.hotelName;
      this.hotelId = this.constant.HotelId;
    }else if(this.userData.hotelId != 0){
      this.hotelName =  this.constant.hotelName;
      this.hotelId = this.userData.hotelId;
    } 
    
    this.MQYsegment = "year";
    this.oldMQYsegment = "year";
  }
  compareWithFn(o1, o2) {
    return o1 === o2;
  };
  gotoNotification() {
    this.router.navigate(['/pm-notification']);
  }


  ngOnInit() {
    this.compareWith = this.compareWithFn;
    if(this.params.statusqydata == 'quater'){
      this.MQYsegment = 'quater';
      this.requestParam.quarter = this.params.sendqy;
      this.currentYear =  this.params.yearsend1;
    }else if(this.params.statusqydata == 'year'){
      this.MQYsegment = 'year';
      this.currentYear = this.params.yearsend1;
      this.yearmodel =  this.params.yearsend1;
    }
   
    this.yearDataList = this.constant.dateFilterData;
    if (this.yearDataList) {
      const index = this.yearDataList.findIndex(
        record => record.id === this.currentYear
      );
      this.quarterDataList = this.yearDataList[index].quarter;
    }

    setTimeout(() => {
      this.setParamFunction();
      this.getRoomlist();
    }, 200);
  
    
  }

  selectsegment() {
    if (this.MQYsegment === "year") {
      this.title = "Year";
      setTimeout(() => {
        this.yearselectRef.open();
      }, 500);
    } else if (this.MQYsegment === "quater") {
      const index = this.yearDataList.findIndex(
        record => record.id === this.currentYear
      );
      this.quarterDataList = this.yearDataList[index].quarter;
      this.title = "Quarter";
      setTimeout(() => {
        this.quaterselectref.open();
      }, 500);
    }
  }

  setParamFunction() {
    this.requestParam.userId = this.userData.userId;
    this.requestParam.categoryId = this.params.categoryId;
    this.requestParam.roleId = this.userData.roleId;
    this.requestParam.room = this.params.roomId;
    this.requestParam.surveyStatus = this.params.status;
    this.requestParam.hotelId = this.constant.HotelId;
    this.requestParam.year = this.currentYear;
    this.getPMStatusDetail();
  }
  getRoomlist() {
    const dic = {
      hotelId: this.hotelId,
      roleId: this.userData.roleId,
      userId: this.userData.userId
    };
    this.service.getPMgetRooms(dic).subscribe(
      result => {
        // console.log(result);
        if (result.data) {
          this.roomList = result.data.rooms;
          this.categoryList = result.data.categoryList;
          this.surveyStatus = result.data.surveyStatus;
       
          this.constant.ToastCustom(result.message, 'top');
        }else{
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }
  
  onselectChangeYear(data) {
    if (data === "year") {
      this.quarterModel = "";
      this.requestParam.year = this.yearmodel;
      this.constant.year = this.yearmodel;
      this.requestParam.quarter = '';
      this.getPMStatusDetail();
    }
    this.oldMQYsegment = data;
  }
  onselectChangeQuarter(data) {
    if (data === "quater") {
      this.yearmodel = "";
      this.requestParam.quarter = this.quarterModel;
      this.getPMStatusDetail();
    }
  }
  getPMStatusDetail() {
    // console.log(this.requestParam);
    this.PMStatusDataList = [];
    this.constant.LoadingPresent();
    this.service.getPMItemWiseDataForDashboard(this.requestParam).subscribe(result => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        this.PMStatusDataList = result.data.roomCounts;
        // console.log(this.PMStatusDataList);
        if (result.data.roomCounts < 20) {
          this.infiniteScrollEnable = false;
        } else {
          this.infiniteScrollEnable = true;
        }
        this.constant.ToastCustom(result.message, 'top');
      }else{
        // this.constant.ToastCustom("No Data found", 'top');
        // this.constant.ToastCustom(result.message, 'top');
        // this.constant.LogoutSession(result.status_key);
      }
    },
      error => {
        this.constant.Logout(error);
      }
    );
  }
  InfinitScrollingAPI(event) {
    // console.log(event);
    if (this.PMStatusDataList.length > 0) {
      this.requestParam.page += 20;
    }
    // this.getNotification();
    this.constant.LoadingPresent();
    this.service.getPMItemWiseDataForDashboard(this.requestParam).subscribe((result) => {
      this.constant.LoadingHide();
      event.target.complete();
      if (result.status) {
        var roomCounts = result.data.roomCounts;
        // console.log(roomCounts);
        for (let index = 0; index < roomCounts.length; index++) {
          this.PMStatusDataList.push(roomCounts[index]);
        }
        if (roomCounts.length < 20) {
          this.infiniteScrollEnable = false;
        } else {
          this.infiniteScrollEnable = true;
        }
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }

  getstatus(status) {
    return this.constant.getstatus(status);
  }

  getSelectRoom(val) {
    // console.log("roomid",val.detail.value)
    this.requestParam.room = val.detail.value;
    this.getPMStatusDetail();
  }
  getSelectCategory(val) {
     console.log("catid",val)
    this.requestParam.categoryId = val.detail.value;
    // this.params.categoryId 
    this.category = val.detail.value.category;
    this.getPMStatusDetail();
  }
  getSurveyStatus(val) {
     console.log("statusid",val)
    this.requestParam.surveyStatus = val.detail.value;
    // this.status.id = val.detail.value.id;
     this.name = val.detail.value.name;
    this.getPMStatusDetail();
  }
}
