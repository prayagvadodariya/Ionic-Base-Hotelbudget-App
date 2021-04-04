import { Push } from '@ionic-native/push/ngx';
import { async } from '@angular/core/testing';
import { ModuleSignPagePage } from './../../models/module-sign-page/module-sign-page.page';
import { Component, OnInit } from '@angular/core';
import { AlertController , ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Constant } from 'src/services/constant';
import { webServicenew } from 'src/services/webServicenew';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormControl
} from '@angular/forms';

import { PopoverController } from '@ionic/angular';
import { ManageTeamsEditDeleteComponent } from 'src/components/manage-teams-edit-delete/manage-teams-edit-delete.component';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-update-pm-survey',
  templateUrl: './update-pm-survey.page.html',
  styleUrls: ['./update-pm-survey.page.scss'],
})
export class UpdatePmSurveyPage implements OnInit {
  userData: any;
  hotelName: string;
  roomList: any = [];
  date: any;
  quater: any;
  categoryType = [];
  surveyData: any = [];
  categoryName: any;
  categoryalldata = [];
  showprograssbar = 0;
  count: any;
  authForm: FormGroup;

  categoryId = '';

  checkprogressbar = 1;
  surveyId = '';


  backdatacollect = [];
  mainSurveyId = '';


  CheckAllAddorEdit = false;
  CheckAllAddorEdit2 = false;


  signatureImage = '';

  // new
  hotelList: any;
  hotelId: any;
  surveyStatusArr: any = [];
  surveyItemArr: any = [];
  index = 0; 
  categoryCount = 0;
  surveydataall: any;
  surveyItemData: any;
  surveyItem: any;
  totalStatusCount = 0;
  maindateshow = '';
  RoomNumber = '';

  Imageurl = '';
  imgPath_temp = '';
  // getSurveyList: any;
  roomId: any;
  roomName: any;

  backalldata: any;

  selectedradiobtncount = 0;


  statuscategory = [];

  showstatusmy =  '';

  constructor(
    public constant: Constant,
    private camera: Camera,
    public modalCtrl: ModalController,
    public fb: FormBuilder,
    public popoverController: PopoverController,
    public service: webServicenew,
    public alertCtrl: AlertController,
    private router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
    this.FormValtion();
    this.userData = this.constant.getUserData();
    this.hotelName = this.constant.hotelName;
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.surveyId = this.router.getCurrentNavigation().extras.state.surveyId;
        this.hotelId = this.router.getCurrentNavigation().extras.state.hotelId;
        this.backalldata = this.router.getCurrentNavigation().extras.state.itemall;
        this.mainSurveyId = this.surveyId;
        this.roomId = this.backalldata.roomId;
        this.roomName = this.backalldata.room;
        // console.log('signatureImage', this.signatureImage);
        // console.log(this.hotelId);
        // console.log(this.backalldata);
        // console.log(this.categoryalldata);
        this.getRoomlist();
      }
    });
    // tslint:disable-next-line: triple-equals
    if (this.userData.roleId == 1) {
      // tslint:disable-next-line: triple-equals
      if (this.constant.HotelId == 0) {
        this.hotelList = JSON.parse(localStorage.getItem('HotelList'));
        this.hotelName  = this.hotelList[0].hotelName;
        // console.log('static');
      // tslint:disable-next-line: triple-equals
      } else if (this.constant.HotelId != 0) {
        this.hotelName = this.constant.hotelName;
        // console.log('not static');
      }
    // tslint:disable-next-line: triple-equals
    } else if (this.userData.roleId == 2) {
     this.hotelName = this.constant.capitalHotelName;
    //  console.log(this.hotelName);
    // tslint:disable-next-line: triple-equals
    } else if (this.userData.roleId == 6) {
     this.hotelName = this.constant.hotelName;
    //  console.log(this.hotelName);
    }
  }

  ngOnInit() {}
  async openComponent(ev: any) {
     // tslint:disable-next-line: prefer-const
     let array = ['Save'];
    const popover = await this.popoverController.create({
      component: ManageTeamsEditDeleteComponent,
      event: ev,
      translucent: true,
      cssClass: 'popover-delete-edit',
      componentProps: {
        arrayoflist: array
      }
    });
    await popover.present();
    popover.onDidDismiss().then(async response => {
      // console.log(response);
      if (response.data) {
        // tslint:disable-next-line: triple-equals
        if (response.data.status == 'Save') {
          // this.editEvent();
          await this.saveSurvey();
        // tslint:disable-next-line: triple-equals
        } else if (response.data.status == 'Clear') {
          // this.confirmationDelele();
          await this.ClearField();
        }
      }
    });
  }
  FormValtion() {
    this.authForm = this.fb.group({
      additem: ['', Validators.compose([Validators.required])]
    });
  }

  gotoNotification() {
    this.router.navigate(['/pm-notification']);
  }

  async getRoomlist() {
    const dic = {
      hotelId: this.userData.hotelId == 0 ? this.constant.HotelId : this.userData.hotelId,
      userId: this.userData.userId
    };
    this.constant.LoadingPresent();
    this.service.getPMSurveyRoomList(dic).subscribe(
      async result => {
        this.constant.LoadingHide();
        // console.log(result);
        if (result.data) {
          this.roomList = result.data.surveyRoomArr;
          this.date = result.data.currentDate;
          this.quater = result.data.currentQuarter;
          this.constant.ToastCustom(result.message, 'top');
          //  console.log(this.backalldata.roomId);
          // this.roomId = this.backalldata.roomId;
          // await this.PMSurveyCategoryType();
          // this.getSurveyData();
          // await this.PMSurveyCategoryAndItem();
         await this.getSurveyData();
         await this.PMSurveyCategoryType();
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

  getSurveyData() {
    const dic = {};
    dic['surveyId'] = this.surveyId;
    dic['hotelId'] = this.hotelId;
    dic['userId'] = this.userData.userId;
    this.index = 0;
    this.constant.LoadingPresent();
    this.service.getPMViewSurveyAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        this.surveydataall = result.data.survey;
       this.surveyStatusArr = result.data.surveyStatus;
       this.surveyItemData = result.data.surveyItem;

       // Count show type 
       this.categoryType = result.data.optionType;
       
       console.log(this.categoryType);
      //  this.statuscategory = result.data.surveyItemData.optionsTypeId;

       // Count show type 

       this.surveyItem = this.surveyItemData[this.index];
       this.surveyItemArr = this.surveyItemData[this.index].items;
      //  this.roomId = 0;
      //  console.log(this.surveyItemArr);
      //  console.log(this.surveyItemData);
      //  console.log(this.surveydataall);
       this.RoomNumber = this.surveydataall.room;
       this.maindateshow = this.surveydataall.surveyDate;
       this.Imageurl = result.setting.imgPath;
       this.imgPath_temp = result.setting.imgPath_temp;
       this.signatureImage = this.surveydataall.signatureImage;

      //  my Code
      this.categoryalldata = [];
      this.backdatacollect = [];
      for (let itemdata of this.surveyItemData) {
        // tslint:disable-next-line: prefer-const
        let temp = {
          category: itemdata.category,
          categoryId: itemdata.categoryId,
          optionsTypeId:itemdata.optionsTypeId
        };
        // let temp2 ={
        //   optionsTypeId:itemdata.optionsTypeId
        // }
        this.statuscategory.push(itemdata.optionsTypeId);
        this.categoryalldata.push(temp);
        this.backdatacollect.push(itemdata.items);
        this.CheckAllAddorEdit = false;
      }


      // console.log(this.categoryalldata);
      // console.log(this.backdatacollect);
      this.showprograssbar = this.checkprogressbar / this.categoryalldata.length;
       this.constant.ToastCustom(result.message, 'top');
       this.showstatusmy = this.categoryType[this.statuscategory[this.checkprogressbar - 1] - 1].name;
      //  console.log(this.categoryType[this.statuscategory[this.checkprogressbar - 1] - 1].name);
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }

  handleImgError(ev: any, item : any){
    let source = ev.srcElement;
    let imgSrc = this.imgPath_temp + item;
 
    source.src = imgSrc; 
 }
  async PMSurveyCategoryType() {
    const dic = {
      username: localStorage.getItem('UserName'),
      password: localStorage.getItem('Password')
    };

    this.service.PMSurveyCategoryType(dic).subscribe(
      result => {
        // console.log(result);
        if (result.data) {
          this.categoryType = result.data.categoryType[0].name;
          // console.log(this.categoryType);
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

  PMSurveyCategoryAndItem() {
    let dic = {};
    // tslint:disable-next-line: triple-equals
    if (this.categoryId == '') {
      dic = {
        userId: this.userData.userId,
        hotelId: this.userData.hotelId
      };
    } else {
      dic = {
        userId: this.userData.userId,
        hotelId: this.userData.hotelId,
        categoryId: this.categoryId
      };
    }
    this.service.PMSurveyCategoryAndItem(dic).subscribe(
      result => {
        // console.log(result);
        if (result.data) {
          // tslint:disable-next-line: triple-equals
          if (this.mainSurveyId == '') {
            this.categoryalldata = result.data.surveyData.categories;
            this.showprograssbar =
              this.checkprogressbar / this.categoryalldata.length;
          }
          this.categoryId =  result.data.surveyData.categoryId;
          this.categoryName = result.data.surveyData.category;
          this.surveyData = result.data.surveyData.items;
          // tslint:disable-next-line: triple-equals
          if (this.categoryalldata.length != this.backdatacollect.length) {
            this.backdatacollect.push(this.surveyData);
            this.CheckAllAddorEdit = false;
          }
          // console.log(this.categoryName);
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

  PMSurveyCategoryAndItemadditemtime() {
    this.constant.LoadingPresent();

    let dic = {};
    // tslint:disable-next-line: triple-equals
    if (this.categoryId == '') {
      dic = {
        userId: this.userData.userId,
        hotelId: this.userData.hotelId
      };
    } else {
      dic = {
        userId: this.userData.userId,
        hotelId: this.userData.hotelId,
        categoryId: this.categoryId
      };
    }
    this.service.PMSurveyCategoryAndItem(dic).subscribe(
      result => {
        this.constant.LoadingHide();

        // console.log(result);
        if (result.data) {
          this.categoryId =  result.data.surveyData.categoryId;
          this.categoryName = result.data.surveyData.category;
          this.surveyData = result.data.surveyData.items;

          this.backdatacollect[this.checkprogressbar - 1].push(this.surveyData[this.surveyData.length - 1]);
            this.CheckAllAddorEdit = false;
          // console.log(this.categoryalldata);
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

  pmSurveyItemAdd(itemmy) {
    // console.log("adddata", this.authForm.valid);
    this.constant.LoadingPresent();

    const dic = {
      userId: this.userData.userId,
      hotelId: this.hotelId,
      categoryId: this.categoryalldata[this.checkprogressbar - 1].categoryId,
      item: itemmy
    };
    //  if(this.authForm.valid==true){
    // console.log("not null")
    this.service.addPMItem(dic).subscribe(
      result => {
        // console.log(result);
        this.constant.LoadingHide();

        if (result.data) {
          this.constant.ToastCustom(result.message, 'top');
          // tslint:disable-next-line: triple-equals
          if (result.status_code == 400) {
            this.constant.ToastCustom(result.message, 'top');
          // tslint:disable-next-line: triple-equals
          } else if (result.status_code == 200) {

            var temp = {
              itemId: result.data.itemId,
              item: result.data.item,
              categoryId: result.data.categoryId,
              status: result.data.status
            }

            this.backdatacollect[this.checkprogressbar - 1].push(temp);
            // this.PMSurveyCategoryAndItemadditemtime();
          }
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
    //  }else{
    //   console.log(" null")
    //  }
  }


  ionSelect(val) {
    let total = val;
    this.count = total++;
    // let count = tem++;

    // this.count[0].checked = true;
    // console.log('count', this.count);
  }

  async onAddItem() {
    const alertmes = await this.alertCtrl.create({
      header: 'Add Item',
      cssClass: 'add-item-alert roomadd addcomment',
      message: this.categoryalldata[this.checkprogressbar - 1].category,
      backdropDismiss: false,
      inputs: [
        {
          name: 'item',
          type: 'text',
          placeholder: 'Enter your Item here...'
        }
      ],
      buttons: [
        {
          text: '',
          // role: 'cancel',
          cssClass: 'icon-cancel',

          handler: () => {
            // this.navCtrl.navigateRoot('/dashboard');
          }
        },
        {
          text: 'Add',
          cssClass: 'done-btn btnsize1',
          handler: async data => {
                //  console.log(data);
            if (data.item) {
              await this.pmSurveyItemAdd(data.item);
            }else{
              this.constant.ToastCustom('Add Item blank not allow ', 'top');
            }
            // this.onLogoutApiFunction();
          }
        }
      ]
    });
    return await alertmes.present();
  }

  async onAddComment(item, mainarr, i, check) {
    // tslint:disable-next-line: triple-equals
    if (check == 1) {
      const alertmes = await this.alertCtrl.create({
        header: 'Edit Comment',
        cssClass: 'add-item-alert roomadd addcomment',
        message: item,
        backdropDismiss: false,
        inputs: [
          {
            name: 'Comment',
            type: 'text',
            value: this.backdatacollect[mainarr][i].comment,
            placeholder: 'Enter your Comment here...'
          }
        ],
        buttons: [
          {
            text: '',
            // role: 'cancel',
            cssClass: 'icon-cancel',

            handler: () => {
              // this.navCtrl.navigateRoot('/dashboard');
            }
          },
          {
            text: 'Ok',
            cssClass: 'done-btn btnsize1',
            handler: async data => {
              if (data.Comment) {
                this.backdatacollect[mainarr][i].comment = data.Comment;
              } else {
                this.constant.ToastCustom('Blank Comment not allow ', 'top');
                this.backdatacollect[mainarr][i].comment = '';
              }
              // this.onLogoutApiFunction();
            }
          }
        ]
      });
      return await alertmes.present();
    // tslint:disable-next-line: triple-equals
    } else if (check == 2) {
      // tslint:disable-next-line: no-shadowed-variable
      const alertmes = await this.alertCtrl.create({
        header: 'Add Comment',
        cssClass: 'add-item-alert roomadd addcomment',
        message: item,
        backdropDismiss: false,
        inputs: [
          {
            name: 'Comment',
            type: 'text',
            placeholder: 'Enter your Comment here...'
          }
        ],
        buttons: [
          {
            text: '',
            // role: 'cancel',
            cssClass: 'icon-cancel',

            handler: () => {
              // this.navCtrl.navigateRoot('/dashboard');
            }
          },
          {
            text: 'Ok',
            cssClass: 'done-btn btnsize1',
            handler: async data => {
              if (data.Comment) {
                this.backdatacollect[mainarr][i].comment = data.Comment;
              } else {
                this.constant.ToastCustom('Blank Comment not allow ', 'top');
                this.backdatacollect[mainarr][i].comment = null;
              }
              // this.onLogoutApiFunction();
            }
          }
        ]
      });
      return await alertmes.present();
    }
    const alertmes = await this.alertCtrl.create({
      header: 'Add Comment',
      cssClass: 'add-item-alert roomadd addcomment',
      message: item,
      backdropDismiss: false,
      inputs: [
        {
          name: 'Comment',
          type: 'text',
          placeholder: 'Enter your Comment here...'
        }
      ],
      buttons: [
        {
          text: '',
          // role: 'cancel',
          cssClass: 'icon-cancel',

          handler: () => {
            // this.navCtrl.navigateRoot('/dashboard');
          }
        },
        {
          text: 'Ok',
          cssClass: 'done-btn btnsize1',
          handler: async data => {
            if (data.Comment) {
              this.surveyData[i].comment = data.Comment;
            } else {
              this.constant.ToastCustom('Blank Comment not allow ', 'top');
              this.surveyData[i].comment = null;
            }
            // this.onLogoutApiFunction();
          }
        }
      ]
    });
    return await alertmes.present();
  }

  async userProfileUpdate(main, i) {
    const alertmes = await this.alertCtrl.create({
      header: 'Select Image Source',
      backdropDismiss: false,
      cssClass: 'profile-main-pc',
      buttons: [
        {
          text: '',
          cssClass: 'profile-pic gallery-pic',
          handler: async () => {
            // console.log('gallery');
            this.uploadPhotoByItem(
              this.camera.PictureSourceType.PHOTOLIBRARY, main,
              i
            );
            //  await this.pmSurveyItemAdd(data.item);
          }
        },
        {
          text: '',
          cssClass: 'profile-pic camera-pic',
          handler: async () => {
            // console.log('camera');
            this.uploadPhotoByItem(this.camera.PictureSourceType.CAMERA, main, i);
            //  await this.pmSurveyItemAdd(data.item);
          }
        },
        {
          text: '',
          cssClass: 'icon-cancel'
        }
      ]
    });
    return await alertmes.present();
  }

  radioChecked() {
    // this.CheckAllAddorEdit2 = true;
    // this.CheckAllAddorEdit = true;
    this.selectedradiobtncount = 0;
    for(var temp of this.backdatacollect[this.checkprogressbar - 1]){
        if(temp.status){
            this.selectedradiobtncount++;
        }
    }
  }
  // Next Page Go
  async nextgo() {
    if (this.roomId) {
      // this.showprograssbar = Math.round(1 * this.checkprogressbar / this.categoryalldata.length);
      // console.log(this.surveyData);
      // if(this.CheckAllAddorEdit){
        
        await this.AddItemSurveyData(this.signatureImage, 0);
       
        this.checkprogressbar++;
        this.showprograssbar = this.checkprogressbar / this.categoryalldata.length;
        var tempcheckvalue = this.statuscategory[this.checkprogressbar - 1];
        var passvalue = tempcheckvalue == '2' ? 1:0;
        this.showstatusmy = this.categoryType[passvalue].name;
      // }else{
      //   this.categoryId = this.categoryalldata[this.checkprogressbar - 1].categoryId;
      //   await this.PMSurveyCategoryAndItem();
      // }
    } else {
      this.constant.ToastCustom('Room No. is required ', 'top');
    }
  }

  // Back Page Go
  backgo() {
   
    this.checkprogressbar--;
    this.showprograssbar = this.checkprogressbar / this.categoryalldata.length;
    var tempcheckvalue = this.statuscategory[this.checkprogressbar - 1];
    var passvalue = tempcheckvalue == '2' ? 1:0;
    this.showstatusmy = this.categoryType[passvalue].name;
    
  

    //  this.showprograssbar = Math.round(1 * this.checkprogressbar / this.categoryalldata.length);
    // console.log(this.showprograssbar);
    this.CheckAllAddorEdit = false;
  }

  async uploadPhotoByItem(check, main, i) {
    const options: CameraOptions = {
      quality: 50,
      sourceType: check,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      async imageData => {
        // console.log('ImageData=>', imageData);
        await this.uploadSurveyItem(i, main, imageData);
      },
      err => {
        // console.log('Camera_Cancel_err=>', err);
      }
    );
  }
  async uploadSurveyItem(i, main, base64data) {
    // tslint:disable-next-line: prefer-const
    let dic = { userId: this.userData.userId, itemImage: base64data };
    this.service.PMSurveyitemImageAdd(dic).subscribe(
      result => {
        // console.log(result);
        if (result.data) {
          this.backdatacollect[main][i].itemImage =  result.data.image_name;
          // this.surveyData[i].itemImage =;
          // console.log(this.categoryName);
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


  // Add survey Item
  async AddItemSurveyData(signatureImage1, value) {
    // console.log("add time my code ",this.backdatacollect[this.checkprogressbar - 1]);
    // console.log("signatureImage",signatureImage1);
    // console.log("value",value);
    this.constant.LoadingPresent();
    let dic = {};
    if (signatureImage1) {
      dic = {
        userId: this.userData.userId,
        hotelId:this.userData.hotelId == 0 ? this.constant.HotelId : this.userData.hotelId,
        roomId: this.roomId,
        surveyId: this.mainSurveyId,
        arr: this.backdatacollect[this.checkprogressbar - 1],
        signatureImage: signatureImage1
      };
      // console.log('send time passdata',dic);
        this.service.PMSurveyAdd(dic).subscribe(
          async result => {
            this.constant.LoadingHide();
            // console.log(result);
            if (result.data) {
              // tslint:disable-next-line: triple-equals
              if (this.mainSurveyId == '') {
                this.mainSurveyId = result.data.surveyId;
              }
              this.categoryId = this.categoryalldata[this.checkprogressbar - 1].categoryId;
              // tslint:disable-next-line: triple-equals
              if (value == 1) {
                this.constant.ToastCustom(result.message, 'top');
                this.router.navigate(['/pm-survey-dashboard']);
              } else {
                // await this.PMSurveyCategoryAndItem();
              }
              // console.log(this.categoryName);
            } else {
              this.constant.ToastCustom(result.message, 'top');
              this.constant.LogoutSession(result.status_key);
            }
          },
          error => {
            // this.constant.LoadingHide();
            this.constant.Logout(error);
          }
        );
    }
  }

  async opensaveandrecent() {
  }

  // Clear All Field
  async ClearField() {
    for (let i = 0 ; i < this.backdatacollect[this.checkprogressbar - 1].length; i++) {
      if (this.backdatacollect[this.checkprogressbar - 1][i].status) {
        this.backdatacollect[this.checkprogressbar - 1][i].status = '8' ;
      }
      if (this.backdatacollect[this.checkprogressbar - 1][i].comment) {
        this.backdatacollect[this.checkprogressbar - 1][i].comment = '';
      }
      if (this.backdatacollect[this.checkprogressbar - 1][i].itemImage) {
        this.backdatacollect[this.checkprogressbar - 1][i].itemImage = '';
      }
    }
    // console.log(this.backdatacollect[this.checkprogressbar - 1]);
    // this.CheckAllAddorEdit = false;
  }

  // Save Serve Module
  async saveSurvey() {
    const modal = await this.modalCtrl.create(
      {
        component: ModuleSignPagePage,
        componentProps: {
          dataservey: this.surveydataall,
          statuscheck: 1
        }
      });
    await modal.present();
    modal.onDidDismiss().then(async (response) => {
      // console.log(response);
      // console.log(response.data);
      if (response.data) {
          await this.AddItemSurveyData(response.data.signbase64, 1);
      }

    });

    await modal.onDidDismiss();
  }
}
