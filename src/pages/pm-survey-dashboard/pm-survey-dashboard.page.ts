import { ManageTeamsEditDeleteComponent } from './../../components/manage-teams-edit-delete/manage-teams-edit-delete.component';
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import {Constant} from "../../services/constant";
import { webServicenew } from '../../services/webServicenew';
import { AddsignaturePage } from '../addsignature/addsignature.page';
import { Router,NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-pm-survey-dashboard',
  templateUrl: './pm-survey-dashboard.page.html',
  styleUrls: ['./pm-survey-dashboard.page.scss'],
})

export class PMSurveyDashboardPage implements OnInit {
  reqparam={ hotelId:0, roleId:0 ,userId:0, page:0 };
  userData:any;
  getSurveyList:any=[];
  hotelList:any=[];
  infiniteScrollEnable = false;
  hide:any; 
  Hotel_Name: any;
  HotelList: any;
  message: any;
  message_title: any;
  pmNotification: any;
  constructor(public constant: Constant, public service: webServicenew,
     private router : Router,private modalCtrl: ModalController,
     public popoverController: PopoverController,
     private navCtrl: NavController) {
    this.pmNotification = JSON.parse(localStorage.getItem("pm_notifivation"));   
    this.userData = this.constant.getUserData();
    if(this.userData.roleId==1){
      // console.log(this.reqparam.hotelId);
      if(this.constant.HotelId==0){
        this.HotelList = JSON.parse(localStorage.getItem("HotelList"));
        this.reqparam.hotelId = this.HotelList[0].hotelId;
        this.Hotel_Name  =this.HotelList[0].hotelName; 
        // console.log("static");

      }else if(this.constant.HotelId!=0){
        this.reqparam.hotelId=this.constant.HotelId;
        this.Hotel_Name = this.constant.hotelName;
        // console.log("not static");
      }
    }else if (this.userData.roleId==2){
     this.reqparam.hotelId=this.userData.hotelId;
     this.Hotel_Name = this.constant.capitalHotelName;
    //  console.log(this.reqparam.hotelId,this.Hotel_Name);
    }else if (this.userData.roleId==5){
      this.reqparam.hotelId=this.userData.hotelId;
     this.Hotel_Name = this.constant.hotelName;
    //  console.log(this.reqparam.hotelId,this.Hotel_Name);
    }else if (this.userData.roleId==6){
      this.reqparam.hotelId=this.userData.hotelId;
     this.Hotel_Name = this.constant.hotelName;
    //  console.log(this.reqparam.hotelId,this.Hotel_Name);
    }else if (this.userData.roleId==7){
      this.reqparam.hotelId=this.userData.hotelId;
     this.Hotel_Name = this.constant.hotelName;
    //  console.log(this.reqparam.hotelId,this.Hotel_Name);
    }
    this.reqparam.roleId=this.userData.roleId;
    this.reqparam.userId=this.userData.userId;
  }
  
  ionViewWillEnter(){
    this.reqparam.page = 0;
    this.getManageSurvery();
  }

  ngOnInit() {
  
  }

  gotoNotification(){
    this.router.navigate(['/pm-notification']);
  }
  addPmSurvey(){
    this.router.navigate(['/pm-survey2']);
  }
  
  getManageSurvery()
  {
    this.constant.LoadingPresent();
    this.service.getPMAllSurveryAPI(this.reqparam).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        this.message = result.setting.message;
        this.message_title = result.setting.message_title;
        this.getSurveyList = result.data.surveyArr;
        // console.log(this.getSurveyList);
        if (result.data.surveyArr < 20) {
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

  InfinitScrollingAPI(event) {
    // console.log(event);
    if (this.getSurveyList.length > 0) {
      this.reqparam.page += 20;
    }
    // this.getNotification();
    this.constant.LoadingPresent();
    this.service.getPMAllSurveryAPI(this.reqparam).subscribe((result) => {
      this.constant.LoadingHide();
      event.target.complete();
      if (result.status) {
        var getSurveyList = result.data.surveyArr;
        // console.log(getSurveyList);
        for (let index = 0; index < getSurveyList.length; index++) {
          this.getSurveyList.push(getSurveyList[index]);
        }
       
         if (getSurveyList.length < 20) {
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
  sorting()
  {
    if(this.hide){
      this.hide=!this.hide;
      this.getSurveyList= this.getSurveyList.sort(function (a, b) {
        return a.surveyDate < b.surveyDate ? 1 : a.surveyDate > b.surveyDate ? -1 : 0;
      });
    }
    else{
      this.hide=!this.hide;
      this.getSurveyList = this.getSurveyList.sort(function (a, b) {
        return a.surveyDate > b.surveyDate ? 1 : a.surveyDate < b.surveyDate ? -1 : 0;
      });
    }
  }

  async openSignModel() {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: AddsignaturePage,
        cssClass: 'custom-modal'
      });
    modal.onDidDismiss().then((detail) => {
    });
    return await modal.present();
  }

  viewSurvey(item)
  {
    // console.log(item);
     let navigationExtras: NavigationExtras = {
      state: {
        surveyId: item.surveyId,
        hotelId: this.reqparam.hotelId,
        itemall:item,
      }
    };
    // console.log("1->>>",navigationExtras);
    // this.navCtrl.navigateForward("/view-pm-survey",NavigationExtras);
    this.navCtrl.navigateForward(["/view-pm-survey"], navigationExtras);
    //this.router.navigate(['/view-pm-survey',{surveyId: item.surveyId}]);

  }

  UpdateSurvey(item){
    // console.log(item);
     let navigationExtras: NavigationExtras = {
      state: {
        surveyId: item.surveyId,
        hotelId: this.reqparam.hotelId,
        itemall:item
      }
    };
    // console.log("1->>>",navigationExtras);
    // this.navCtrl.navigateForward("/view-pm-survey",NavigationExtras);
    this.navCtrl.navigateForward(["/update-pm-survey2"], navigationExtras);
    //this.router.navigate(['/view-pm-survey',{surveyId: item.surveyId}]);
  }
  async openComponent(ev: any,checkvalue,item) {
    var array = [];

    if(checkvalue == 1){
      array=['View Survey'];
    }else  if(checkvalue == 2){
      array=['Edit Survey','View Survey'];
    }else  if(checkvalue == 3){

    }

     
   const popover = await this.popoverController.create({
     component: ManageTeamsEditDeleteComponent,
     event: ev,
     translucent: true,
     cssClass: "popover-delete-edit",
     componentProps: {
       arrayoflist: array
     }
   });
   await popover.present();
   popover.onDidDismiss().then(async response => {
    //  console.log(response);
     if (response.data) {
       if (response.data.status == "Edit Survey") {
         // this.editEvent();
        //  await this.saveSurvey();
        this.UpdateSurvey(item);
       } else if (response.data.status == "View Survey") {
         // this.confirmationDelele();
        //  await this.ClearField();
          this.viewSurvey(item);
       }
     }
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
