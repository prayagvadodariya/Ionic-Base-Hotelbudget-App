import { webServicenew } from 'src/services/webServicenew';
import { Constant } from 'src/services/constant';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-module-notification-pendding',
  templateUrl: './module-notification-pendding.page.html',
  styleUrls: ['./module-notification-pendding.page.scss'],
})
export class ModuleNotificationPenddingPage implements OnInit 
{


  userData:any;
  Notificationdata:any;

  Notificationlistdata:any;
  backButtonAlertModel: any;
  stats:any;

  backtimedata = false;
  profileimg:any;
  constructor(public alertCtrl: AlertController, public constant: Constant, public modelCtrl: ModalController,
    public service: webServicenew, public changedetected: ChangeDetectorRef,public navParams: NavParams ) {
        
      this.userData = this.constant.getUserData();
      if (this.navParams.get('datamy'))
        {
          this.stats = this.navParams.get('type');
          this.Notificationdata =  this.navParams.get('datamy');
          this.profileimg = this.navParams.get('profileimage');
          this.callgetnotificationdata();
        }
     }

  ngOnInit() {
  }
  closebtn(){
    this.modelCtrl.dismiss(this.backtimedata);
  }
  callgetnotificationdata(){
      console.log(this.Notificationdata);

      var reqParameter = {
        userId:this.userData.userId,
        hotelId:this.Notificationdata.hotelId,
        expenseAccountId:this.Notificationdata.expenseAccountId,
        PONumber:this.Notificationdata.PONumber,
        vendor:this.Notificationdata.vendor,
        notificationStatus:this.Notificationdata.notificationStatus
      }
     
       // console.log(this.reqParameter);
    this.constant.LoadingPresent();
    this.service.getAllNotificationListAPI(reqParameter).subscribe((result) => {
      this.constant.LoadingHide();
      console.log(result);

      if (result.status) {
        this.Notificationlistdata = result.data.notifications;
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
        // console.log("message->>",result.message);
      }
    }, error => {
      this.constant.Logout(error);
    });
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
            
            
            this.acceptPendingRequest(dic, data,statasmy);
          }
        }
      ],

    });
    this.backButtonAlertModel.present();
  }
  acceptPendingRequest(dic, data,statasmy) {
    this.constant.LoadingPresent();
    this.service.approveNotificationAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        // console.log(this.getNotificationList);
        if(statasmy == 'Reject All' || statasmy == 'Accept All'){
          this.backtimedata = true;
          this.closebtn();
        }else{
          this.backtimedata = true;
          this.callgetnotificationdata();
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


  //------------------------------Back Button Alert-----------------------------------//
  async rejectRejectAlert(data, event,statasmy) {
    // console.log(data);
    // if (this.erroMsg)
    //   var d = "Are you sure you want to reject over expense request?" + '<p class="error" *ngIf="erroMsg">Reject reason is required!</p>';
    // else
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
              this.acceptPendingRequest(dic, data,statasmy);

            }
          }
        }
      ]
    });
    this.backButtonAlertModel.present();
  }

}
