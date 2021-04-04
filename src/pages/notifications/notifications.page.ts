import { ModuleShowNotificationComment2PageModule } from './../../app/module-show-notification-comment2/module-show-notification-comment2.module';
import { Router } from '@angular/router';
import { ModuleNotificationPenddingPage } from './../../models/module-notification-pendding/module-notification-pendding.page';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController, ModalController, Events } from '@ionic/angular';
import { Constant } from "../../services/constant";
import { webServicenew } from '../../services/webServicenew';
import { ModuleShowNotificationCommentPage } from 'src/models/module-show-notification-comment/module-show-notification-comment.page';
import { ModuleShowNotificationComment2Page } from 'src/app/module-show-notification-comment2/module-show-notification-comment2.page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  pending: any;
  approved: any;
  rejected: any;
  backButtonAlertModel: any;
  hideme = [];
  MQYsegment: any;
  getNotificationList = [];
  infiniteScrollEnable = false;
  notificationdata: any;
  erroMsg = false;
  profileimageurl:any;
  userData: any;
  reqParameter: any;
  notificationc_count: any;
  notification_totel:any;
  message: any;
  message_title: any;
  
  constructor(public alertCtrl: AlertController,private router: Router, public constant: Constant, public modelCtrl: ModalController,
    public service: webServicenew, public changedetected: ChangeDetectorRef,public events: Events, public modalCtrl: ModalController) {
    this.userData = this.constant.getUserData();
    this.MQYsegment = 'pending'
    // this.MQYsegment = 'rejected'
    this.reqParameter= { notificationStatus: "1", userId: this.userData.userId, page: 0, userRoleId: this.userData.roleId };

    
    // this.userdataget =  JSON.parse(localStorage.getItem("profile_image"));
    // this.profileimageurl = this.userdataget; 
    // console.log(this.userData);
    
    // if (this.reqParameter.notificationStatus==1) {
    //  this.notification_totel = 1;
    //  console.log("1p");
    // }
    // else if (this.reqParameter.notificationStatus==2) {
    //   this.notification_totel = 2;
    //   console.log("2a");
    // }
    // else if (this.reqParameter.notificationStatus==3) {
    //   this.notification_totel = 3;
    //   console.log("3r");
    // }
    
  }

  async ShowList(noti,typemy){
    let modal = await this.modelCtrl.create({
      component: ModuleNotificationPenddingPage,
      cssClass: 'Hardik',
      componentProps: {
        type: typemy,
        datamy:noti,
        profileimage:this.profileimageurl,
         
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if(data.data == true){
          this.segmentChanged();
        }
        
      })
    return await modal.present();
  }
  ngOnInit() {
   
    this.reqParameter['notificationStatus'] = "1";
    this.reqParameter['userId'] = this.userData.userId;
    this.reqParameter['page'] = 0;
    this.reqParameter['userRoleId'] = this.userData.roleId;
    this.getNotification();
  }
  getNotification() {

    // console.log(this.reqParameter);
    this.constant.LoadingPresent2();
    this.service.getNotificationListAPI(this.reqParameter).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        this.message = result.setting.message;
        this.message_title = result.setting.message_title;
        this.notificationdata = result.data;
        this.notificationc_count = result.data.currentCount;
        if(this.MQYsegment == 'pending'){
        localStorage.setItem("NotificationCount", result.data.currentCount);
        this.events.publish('NotificationCount',{countdata:result.data.currentCount});
        }
        this.profileimageurl = result.setting.profile_image_url;
       
         console.log("seg", this.notificationc_count);
        var getNotificationList = result.data.notifications;
        for (let index = 0; index < getNotificationList.length; index++) {
          this.getNotificationList.push(getNotificationList[index]);
        }
        if (getNotificationList.length < 20) {
          this.infiniteScrollEnable = false
        }
        else {
          this.infiniteScrollEnable = true;
        }
        // this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
        // console.log("message->>",result.message);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }

  async MessageShow(notiid){
    console.log(notiid);
    // this.calltempalertbox(notiid);
    const modal = await this.modalCtrl.create(
      {
        component: ModuleShowNotificationCommentPage,
        // component: ModuleShowNotificationComment2Page,
        // cssClass: 'custom-modal addcategorymodel',
        componentProps: {
          userId: this.userData.userId,
          notificationId: notiid
        }
        

      });
    await modal.present();
    modal.onDidDismiss().then(async (response) => {
      console.log(response);
      console.log(response.data);
      this.segmentChanged();
      // if (response.data) {
      //     await this.AddItemSurveyData(response.data.signbase64);
      // }

    });

    await modal.onDidDismiss();
  }


  async calltempalertbox(notiid){
    const alert = await this.alertCtrl.create({
      header: 'Rejected Comment',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }
  InfinitScrollingAPI(event) {
    if (this.getNotificationList.length > 0) {
      this.reqParameter.page += 20;
    }
    // this.constant.LoadingPresent();
    this.service.getNotificationListAPI(this.reqParameter).subscribe((result) => {
      // this.constant.LoadingHide();
      event.target.complete();
      if (result.status) {
        this.notificationdata = result.data;
        var getNotificationList = result.data.notifications;
        for (let index = 0; index < getNotificationList.length; index++) {
          this.getNotificationList.push(getNotificationList[index]);
        }
        this.changedetected.detectChanges();
        // console.log(this.getNotificationList);
        if (getNotificationList.length < 20) {
          this.infiniteScrollEnable = false
        }
        else {
          this.infiniteScrollEnable = true;
        }
        // this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }

    }, error => {
      this.constant.Logout(error);
    });
  }
  segmentChanged() {
    // console.log(this.MQYsegment);
    this.notificationc_count = 0;
    if (this.MQYsegment == 'pending') {
      this.getNotificationList = [];
      this.reqParameter['notificationStatus'] = '1';
      this.reqParameter.page = 0;
   
    }
    else if (this.MQYsegment == 'approved') {
      this.getNotificationList = [];
      this.reqParameter['notificationStatus'] = '2';
      this.reqParameter.page = 0;
    }
    else if (this.MQYsegment == 'rejected') {
      this.getNotificationList = [];
      this.reqParameter['notificationStatus'] = '3';
      this.reqParameter.page = 0;
    }
    this.getNotification();
  }

  async acceptPendingAlert(data,event,statasmy) {
    // console.log(data);
    this.backButtonAlertModel = await this.alertCtrl.create({
      header: 'Pending Request?',
      message: 'Are you sure you want to accept over expense request?',
      cssClass: 'msg-reject',
      // enableBackdropDismiss: false,

      buttons: [
        {
          text: '',
          cssClass: 'icon-cancel',
          role: 'cancel',
          handler: () => {
            this.backButtonAlertModel = null;
          }
        },
        {
          text: '',
          cssClass: 'icon-bk',
          handler: () => {
            let dic ={};
            if(statasmy == 'Accept'){
              dic = { 
                  expenseId: data.expenseId,
                  notificationId: data.notificationId,
                  status: 1,
                  userId: this.userData.userId,
                  comment: ''
                }
            }else if(statasmy == 'Accept All'){
              dic = { 
                  expenseId: data.expenseId, 
                  notificationId: data.notificationId, 
                  status: 1,
                  userId: this.userData.userId,
                  comment: '',
                  PONumber:data.PONumber,
                  approveAll:true,
                  expenseAccountId:data.expenseAccountId,
                  vendor:data.vendor,
                  hotelId:data.hotelId,
                };
            }
            
            this.acceptPendingRequest(dic, data);
          }
        }
      ],

    });
    this.backButtonAlertModel.present();
  }
  acceptPendingRequest(dic, data) {
    this.constant.LoadingPresent();
    this.service.approveNotificationAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        // console.log(this.getNotificationList);
        let ind = this.getNotificationList.findIndex(x => x.notificationId === data.notificationId)
        this.notificationdata.currentCount=this.notificationdata.currentCount-1;
        this.notificationc_count = this.notificationc_count - 1;
        
        this.getNotificationList.splice(ind, 1);
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }


  //------------------------------Back Button Alert-----------------------------------//
  async rejectRejectAlert(data, event,statasmy) {
    // console.log(data);
    if (this.erroMsg)
      var d = "Are you sure you want to reject over expense request?" + '<p class="error" *ngIf="erroMsg">Reject reason is required!</p>';
    else
      var d = "Are you sure you want to reject over expense request?";
    this.backButtonAlertModel = await this.alertCtrl.create({
      header: 'Reject Request?',
      message: d,
      cssClass: 'msg-reject',
      backdropDismiss: false,
      // enableBackdropDismiss: false,  
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Reason to Reject',
        },
      ],
      buttons: [
        {
          text: '',
          cssClass: 'icon-cancel',
          role: 'cancel',
          handler: () => {
            this.backButtonAlertModel = null;
          }
        },
        {
          text: '',
          cssClass: 'icon-bk',
          handler: item => {
            if (item.name == "" || item.name == null) {
              this.constant.ToastCustom('Reject Message  is Required', 'top');
              this.backButtonAlertModel.onDidDismiss(false);
              return false
              setTimeout(function () {
                return this.erroMsg = true;
              }, 500);
            }
            else {

              let dic ={};
              if(statasmy == 'Reject'){
                dic = { 
                    expenseId: data.expenseId,
                    notificationId: data.notificationId,
                    status: 2,
                    userId: this.userData.userId,
                    comment: item.name
                  }
              }else if(statasmy == 'Reject All'){
                dic = { 
                    expenseId: data.expenseId, 
                    notificationId: data.notificationId, 
                    status: 2,
                    userId: this.userData.userId,
                    comment: item.name,
                    PONumber:data.PONumber,
                    rejectAll:true,
                    expenseAccountId:data.expenseAccountId,
                    vendor:data.vendor,
                    hotelId:data.hotelId,
                  };
              }

              // let dic = { expenseId: data.expenseId, notificationId: data.notificationId, status:2, userId: this.userData.userId, comment: item.name };
              this.acceptPendingRequest(dic, data);

            }
          }
        }
      ]
    });
    this.backButtonAlertModel.present();
  }

  Resubmitcall(noti){

    var dic ={
      userId:this.userData.userId,
      notificationId:noti.notificationId
    }
    this.constant.LoadingPresent();
    this.service.ResubmitNotificationAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        // console.log(this.getNotificationList);
      this.segmentChanged();
        
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  showexpense(item){
  console.log("111111",item);
   if(this.userData.roleId==1){
      this.constant.hotelName = item.hotelName;
      // console.log(this.HotelnName)
    }else if(this.userData.roleId==2){
      this.constant.capitalHotelName = item.hotelName;
      // console.log(this.HotelnName)
    }
    var tempstr = item.invoiceDate.split(" ");
    var requestParam = { 
      userId: this.userData.userId,
      departmentId: item.departmentId,
      hotelId: item.hotelId,
      year: tempstr[2],
      month: tempstr[0],
      toMonth: tempstr[0],
      page:0
    };
    this.constant.LoadingPresent();
    this.service.getCategoryListAPI(requestParam).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        this.message = result.setting.message;
        this.message_title = result.setting.message_title;
        var categoryData = result.data;
        var passdata = [];
        for(let item2 of categoryData){
          // console.log("item2",item2);
          if(item.expenseAccountId == item2.expenseAccountId){
              passdata = item2;
              break;
          }
        }
        console.log(passdata);
        this.router.navigate(['/showExpense',{deptData: JSON.stringify(passdata),
          departmentId:JSON.stringify(item.departmentId),
          hoteloriginal_id: JSON.stringify(item.hotelId),
          year:JSON.stringify(tempstr[2]),month:JSON.stringify(tempstr[0])
          }]);
          // this.constant.
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
    // this.router.navigate(['/showExpense',{deptData: JSON.stringify(item),
    //   departmentId:JSON.stringify(item.departmentId),
    //   hoteloriginal_id: JSON.stringify(item.hotelId)
    //   }]);

  }
}
