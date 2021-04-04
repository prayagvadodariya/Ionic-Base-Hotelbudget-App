import { Component, OnInit } from '@angular/core';
import { Constant } from "../../services/constant";
import { webServicenew } from "../../services/webServicenew";

@Component({
  selector: 'app-pm-notification',
  templateUrl: './pm-notification.page.html',
  styleUrls: ['./pm-notification.page.scss'],
})
export class PmNotificationPage implements OnInit {
  userData:any=[];
  reqparam:any={};
  notificationsList:any=[];
  imgPath:any;
  infiniteScrollEnable = true;
  message: any;
  getNotificationList = [];
  message_title: any;
  pmNotification: any;
  constructor(public constant: Constant,public service: webServicenew) { 
    this.pmNotification = JSON.parse(localStorage.getItem("pm_notifivation"));
    this.userData = this.constant.getUserData();
    // console.log(this.userData);
    this.reqparam.userId = this.userData.userId;
    // this.reqparam.hotelId = this.constant.HotelId;
    this.reqparam.roleId = this.userData.roleId;
   
    if(this.userData.roleId == 1){
    this.reqparam.hotelId = this.constant.HotelId;
    }else if(this.userData.roleId == 2){
      this.reqparam.hotelId = this.userData.hotelId;
    }else if(this.userData.roleId == 5){
      this.reqparam.hotelId = this.userData.hotelId;
    }else if(this.userData.roleId == 6){
      this.reqparam.hotelId = this.userData.hotelId;
    }else if(this.userData.roleId == 7){
      this.reqparam.hotelId = this.userData.hotelId;
    }
  }

  ngOnInit() {
    // this.getPMNotification();
  }

  ionViewWillEnter(){
    this.reqparam.page = 0;
    this.reqparam.notiType = 1;
    this.getPMNotification();
  }

  getPMNotification(){
    
    this.constant.LoadingPresent();
    this.service.getPMNotificationAPI(this.reqparam).subscribe(
      result => {
        this.constant.LoadingHide();
        if (result.status) {
          this.message = result.setting.message;
          this.message_title = result.setting.message_title;
          this.imgPath = result.setting.imgPath;
          this.notificationsList = result.data.notifications;

          var getNotificationList = result.data.notifications;
          for (let index = 0; index < getNotificationList.length; index++) {
            this.getNotificationList.push(getNotificationList[index]);
          }
          if (getNotificationList.length < 10) {
            this.infiniteScrollEnable = false
          }
          else {
            this.infiniteScrollEnable = true;
          }
          this.constant.ToastCustom(result.message, 'top');
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
          //this.notificationsList=[];
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }


  InfinitScrollingProject(infiniteScroll: any) {
    // console.log(this.infiniteScrollEnable);
    if (this.getNotificationList.length > 0) {
      this.reqparam.page += 10;
    }
    let getNotificationList;
    this.service.getPMNotificationAPI(this.reqparam).subscribe((result) => {
      // console.log(result)
      infiniteScroll.target.complete();
      if (result.status) {
        getNotificationList = result.data.notifications;
      
        for (let index = 0; index < getNotificationList.length; index++) {
          this.notificationsList.push(getNotificationList[index]);
        }
        this.constant.ToastCustom(result.message, 'top');
      }
      else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
      if (getNotificationList.length < 10) {
        this.infiniteScrollEnable = false;
      }
      else {
        this.infiniteScrollEnable = true;
      }
    }, (error) => {
      this.constant.Logout(error);
    });
  }

  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
      console.log('Async operation has ended');
     this.ionViewWillEnter();
      
      event.target.complete();
    }, 500);
  }

}
