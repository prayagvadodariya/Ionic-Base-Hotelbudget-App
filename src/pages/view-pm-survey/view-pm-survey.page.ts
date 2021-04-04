import { ModuleSignPagePage } from './../../models/module-sign-page/module-sign-page.page';
import { ModuleImagePagePage } from './../../models/module-image-page/module-image-page.page';
import { Component, OnInit } from '@angular/core';
import { SurveyByPopupPage } from '../../models/survey-by-popup/survey-by-popup.page';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Constant} from "../../services/constant";
import { webServicenew } from '../../services/webServicenew';


@Component({
  selector: 'app-view-pm-survey',
  templateUrl: './view-pm-survey.page.html',
  styleUrls: ['./view-pm-survey.page.scss'],
})
export class ViewPmSurveyPage implements OnInit {
  hotelName: string;
  surveyId:any;
  userData:any=[];
  surveyStatusArr:any=[];
  surveyItemArr:any=[];
  index=0; 
  categoryCount=0;
  surveyItemData:any;
  surveyItem:any;
  totalStatusCount=0;
  hotelId: any;
  hotelList: any;
  Hotel_Name: any;
  maindateshow="";
  RoomNumber="";

  Imageurl = "";
  // getSurveyList: any;
  roomId:any;

  surveydataall:any;

  optionType:any;
  
  
   constructor(public modalCtrl: ModalController,public constant: Constant, 
    public service: webServicenew,public activatedRoute: ActivatedRoute,
    public alertCtrl: AlertController,
    public router:Router) { 

   this.userData= this.constant.getUserData();
   this.hotelName = this.constant.hotelName;
    // console.log(this.userData);
     this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.surveyId = this.router.getCurrentNavigation().extras.state.surveyId;
        this.hotelId = this.router.getCurrentNavigation().extras.state.hotelId;
        // console.log(this.surveyId); 
        // console.log(this.hotelId); 
        this.getSurveyData();
      }
    })
    if(this.userData.roleId==1){
     
      if(this.constant.HotelId==0){
        this.hotelList = JSON.parse(localStorage.getItem("HotelList"));
        this.Hotel_Name  =this.hotelList[0].hotelName; 
        // console.log("static");
      }else if(this.constant.HotelId!=0){
        this.Hotel_Name = this.constant.hotelName;
        // console.log("not static");
      }
    }else if (this.userData.roleId==2){
     this.Hotel_Name = this.constant.capitalHotelName;
    //  console.log(this.Hotel_Name);
    }else if (this.userData.roleId==6){
     this.Hotel_Name = this.constant.hotelName;
    //  console.log(this.Hotel_Name);
    }

  }

  ngOnInit() {
   }

  //  async openViewer() {
  //   const modal = await this.modalCtrl.create({
  //     component: ViewerModalComponent,
  //     componentProps: {
  //       src: "./assets/img/demo.jpg"
  //     },
  //     cssClass: 'ion-img-viewer',
  //     keyboardClose: true,
  //     showBackdrop: true
  //   });

  //   return await modal.present();
  // }
  async openViewer(val){
    console.log("imge",val);
    let modal = await this.modalCtrl.create(
      {
        component: ModuleImagePagePage,
        componentProps: {
          dataservey: val,
          statuscheck: 0
        }
      });
    await modal.present();
    modal.onDidDismiss().then(async (response) => {
      // console.log(response);
      // console.log(response.data);
      if (response.data) {
          
      }

    });

    await modal.onDidDismiss();
  }

  getSurveyData()
  {
    let dic={};
    dic['surveyId'] = this.surveyId;
    dic['hotelId'] = this.hotelId;
    dic['userId'] = this.userData.userId;
    this.index=0;
    this.constant.LoadingPresent();
    this.service.getPMViewSurveyAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        this.surveydataall = result.data.survey;
       this.surveyStatusArr = result.data.surveyStatus;
       this.optionType = result.data.optionType;
       this.surveyItemData=result.data.surveyItem;
       this.surveyItem = this.surveyItemData[this.index];
       this.surveyItemArr=this.surveyItemData[this.index].items;
       this.roomId = 0;
       console.log(this.surveyItemArr);
      //  console.log(this.surveyItemData);
      //  console.log(this.surveydataall);
       this.RoomNumber = this.surveydataall.room;
       this.maindateshow = this.surveydataall.surveyDate;
       this.Imageurl = result.setting.imgPath;
       localStorage.setItem("viewimg",this.Imageurl);
      //  this.categoryCount =this.surveyItemData[this.index].items.length;
      //  this.totalCountFunction(this.surveyItemArr);
      //  console.log(this.categoryCount);
       this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
   
  }

  //show survey Data sign and data 

  async Showdatasurvey(){

    let modal = await this.modalCtrl.create(
      {
        component: ModuleSignPagePage,
        componentProps: {
          dataservey: this.surveydataall,
          statuscheck: 0
        }
      });
    await modal.present();
    modal.onDidDismiss().then(async (response) => {
      // console.log(response);
      // console.log(response.data);
      if (response.data) {
          
      }

    });

    await modal.onDidDismiss();
  }


  //show comment 

  async showComment(comment){
    var alerbtn  = await this.alertCtrl.create({
      header: 'Comment',
      message: comment,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          cssClass: 'done-btn btnsize1',
          handler: () => {
            
          }
        }
      ]
    });
    alerbtn.present();
  }

  //change data category vis 
  selectcategory(id){
    // console.log("select Category ",id);
    this.surveyItemArr=this.surveyItemData[id].items;
    // console.log(this.surveyItemArr);
  }

  getSurveyStatus(status) {
    // console.log(status);
    if(status)
    {
      // console.log(this.constant.getstatus(status));
      return this.constant.getstatus(status);  
    }
  }

  totalCountFunction(SurveyItems) {
    this.totalStatusCount = 0;
    for (var i = 0; i < SurveyItems.length; i++) {
      if (SurveyItems[i].status >= '0') {
        this.totalStatusCount++;
      } else {

       }
    }
    // console.log(this.totalStatusCount);
  }


  // previousPMSurvey()
  // {
  //   this.index--;
  //   this.surveyItem = this.surveyItemData[this.index];
  //   this.surveyItemArr=this.surveyItemData[this.index].items;
  //   console.log(this.surveyItemArr);
  //   this.categoryCount =this.surveyItemData[this.index].items.length;
  //   this.totalCountFunction(this.surveyItemArr);

  // }

  // nextPMSurvey()
  // {
  //   this.index++;
  //   this.surveyItem = this.surveyItemData[this.index];
  //   this.surveyItemArr=this.surveyItemData[this.index];
  //   console.log(this.surveyItemArr);
  //   this.categoryCount =this.surveyItemData[this.index].items.length;
  //   this.totalCountFunction(this.surveyItemArr);
  // }

  // async surveyByPopup() {
  //   const modal: HTMLIonModalElement =
  //   await this.modalCtrl.create({
  //     component: SurveyByPopupPage,
  //     componentProps: {
  //       type: 'vendorModel'
  //     }
  //   }); 
  //   modal.onDidDismiss().then((detail) => {
  //     console.log(detail);
  //     //this.getCapitalExpenseAccount();
  //   });
  //   return await modal.present();
  // }

}
