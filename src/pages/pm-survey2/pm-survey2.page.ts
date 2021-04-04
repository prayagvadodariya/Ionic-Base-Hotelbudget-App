import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ModuleSignPagePage } from './../../models/module-sign-page/module-sign-page.page';
import { ModuleImagePagePage } from './../../models/module-image-page/module-image-page.page';
import { AlertController, ModalController, Events, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Constant } from 'src/services/constant';
import { webServicenew } from 'src/services/webServicenew';
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
  selector: 'app-pm-survey2',
  templateUrl: './pm-survey2.page.html',
  styleUrls: ['./pm-survey2.page.scss'],
})
export class PmSurvey2Page implements OnInit {

  userData: any;
  hotelName: string;
  roomList: any = [];
  date: any;
  quater: any;
  roomId = '';
  pmNotification: any;
  authForm: FormGroup;
  selectedradiobtncount = 0;

  Imageurl = '';
  imgPath_temp = '';
  showprograssbar = 0;

  resdataall:any;
  countlist = 1;

  optionType:any;
  categories = [];
  allItemdata = [];

  

  constructor(
    public constant: Constant,
    private camera: Camera,
    public modalCtrl: ModalController,
    public fb: FormBuilder,
    public popoverController: PopoverController,
    public service: webServicenew,public Event: Events,
    public alertCtrl: AlertController,
    private router: Router,
    private navCtrl:NavController
  )
   { 
    this.FormValtion();
    this.pmNotification = JSON.parse(localStorage.getItem("pm_notifivation"));
    this.userData = this.constant.getUserData();
    this.hotelName = this.constant.hotelName;
    this.getRoomlist();
  }

  ngOnInit() {
  }
  async openViewer(val){
    localStorage.setItem("viewimg", this.imgPath_temp);
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
  
  gotoNotification(){
    this.router.navigate(['/pm-notification']);
  }
  FormValtion() {
    this.authForm = this.fb.group({
      additem: ['', Validators.compose([Validators.required])]
    });
  }
  //Room get 
  async getRoomlist() {

     var dic = {
        hotelId: this.userData.hotelId == 0 ? this.constant.HotelId : this.userData.hotelId ,
        userId: this.userData.userId
      };

    this.constant.LoadingPresent2();
    this.service.getPMSurveyRoomList(dic).subscribe(
      async result => {
        // this.constant.LoadingHide();
        // console.log(result);
        if (result.data) {
          if(result.data.surveyRoomArr.length > 0 ) {
            this.roomList = result.data.surveyRoomArr;
            this.date = result.data.currentDate;
            this.quater = result.data.currentQuarter;
            this.constant.ToastCustom(result.message, 'top');
            await this.PMgetCategoryItems();
          } else {
             this.navCtrl.back();
            this.constant.ToastCustom('Room Not Available', 'top');
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
  }
  async PMgetCategoryItems(){
  var dic = {
        hotelId: this.userData.hotelId == 0 ? this.constant.HotelId : this.userData.hotelId ,
        userId: this.userData.userId
      };

    // this.constant.LoadingPresent(); 
    // this.constant.LoadingHide();

    this.service.getPMSurveyNewapione(dic).subscribe(
      async result => {
        this.constant.LoadingHide();
        // console.log(result);
        if (result.data) {
         
          //Image show URL
          this.Imageurl = result.setting.imgPath;
          this.imgPath_temp = result.setting.imgPath_temp;   
          this.resdataall = result.data.categories;
          this.optionType = result.data.optionType;
          for(let item of this.resdataall){
            var temp = {
              categoryId:item.categoryId,
              category:item.category,
              optionsTypeId:item.optionsTypeId
            };
            this.categories.push(temp);
            this.allItemdata.push(item.items);

            //progressbar count 
            this.showprograssbar = this.countlist / this.categories.length ;
          }
          // console.log('optionType',this.optionType);
          // console.log('categories',this.categories);
          // console.log('allItemdata',this.allItemdata);

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


  forwardgo(){
    this.countlist++;
    this.showprograssbar = this.countlist / this.categories.length ;
    // console.log(this.allItemdata);
  }
  backgot(){
    this.countlist--;
    this.showprograssbar = this.countlist / this.categories.length ;
    // console.log(this.allItemdata);

  }
  handleImgError(ev: any, item : any){
    let source = ev.srcElement;
    let imgSrc = this.imgPath_temp + item;
 
    source.src = imgSrc; 
 }

 //count radio button

 radioChecked() {
  this.selectedradiobtncount = 0;
  for(var temp of this.allItemdata[this.countlist - 1]){
      if(temp.status){
          this.selectedradiobtncount++;
      }
  }
}

 // Save Serve Module
 async saveSurvey() {
  const modal = await this.modalCtrl.create(
    {
      component: ModuleSignPagePage,
     
    });
  await modal.present();
  modal.onDidDismiss().then(async (response) => {
    // console.log(response);
    // console.log(response.data);
    if (response.data) {
      // this.checkSurvey = true;
        await this.saveapicallapi(response.data.signbase64);
    }

  });

  await modal.onDidDismiss();
}
saveapicallapi(base64data){
   // tslint:disable-next-line: prefer-const
   if(base64data){   
     var surveydatamy = [];
     for(var i=0;i<this.allItemdata.length;i++){
        var temp = {
          categoryId:this.categories[i].categoryId,
          itemData:this.allItemdata[i]
        };
        surveydatamy.push(temp);
     }
   let dic = { 
      userId: this.userData.userId,
      hotelId: this.userData.hotelId == 0 ? this.constant.HotelId : this.userData.hotelId,
      roomId:this.roomId,
      signatureImage:base64data,
      surveydata:surveydatamy
     };
   this.service.PMSurveyitemAddNew(dic).subscribe(
     result => {
       // console.log(result);
       if (result.data) {
         if(result.status){
            
          this.constant.ToastCustom(result.message, 'top');
          this.Event.publish('pm-survey-dashboard');
         }else{
          this.constant.ToastCustom(result.message, 'top');
         }
          // console.log(result);
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
}

 //comment add 
 async onAddComment(item,i,check) {
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
          value: this.allItemdata[this.countlist - 1][i].comment,
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
              this.allItemdata[this.countlist - 1][i].comment = data.Comment;
            } else {
              this.constant.ToastCustom('Blank Comment not allow ', 'top');
              this.allItemdata[this.countlist - 1][i].comment = null;
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
              this.allItemdata[this.countlist - 1][i].comment = data.Comment;
            } else {
              this.constant.ToastCustom('Blank Comment not allow ', 'top');
              this.allItemdata[this.countlist - 1][i].comment = null;
              
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
            this.allItemdata[this.countlist - 1][i].comment = data.Comment;
          } else {
            this.constant.ToastCustom('Blank Comment not allow ', 'top');
            this.allItemdata[this.countlist - 1][i].comment = null;
          }
          // this.onLogoutApiFunction();
        }
      }
    ]
  });
  return await alertmes.present();
}


//update Image for item 
async UploadItemImage(main, i) {
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

    this.constant.LoadingPresent2(); 
    
  this.service.PMSurveyitemImageAdd(dic).subscribe(
    result => {
      // console.log(result);
      this.constant.LoadingHide();
      if (result.data) {
        this.allItemdata[this.countlist - 1][i].itemImage =  result.data.image_name;
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

async ClearField() {
  for (let i = 0; i < this.allItemdata[this.countlist - 1].length; i++) {
    if (this.allItemdata[this.countlist - 1][i].status) {
      this.allItemdata[this.countlist - 1][i].status = '';
    }
    if (this.allItemdata[this.countlist - 1][i].comment) {
      this.allItemdata[this.countlist - 1][i].comment = '';
    }
    if (this.allItemdata[this.countlist - 1][i].itemImage) {
      this.allItemdata[this.countlist - 1][i].itemImage = '';
    }
  }
}


  //add item to list 


  async onAddItem() {
    const alertmes = await this.alertCtrl.create({
      header: 'Add Item',
      cssClass: 'add-item-alert roomadd addcomment',
      message: this.categories[this.countlist - 1].category,
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
            // console.log(data);
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
  
  pmSurveyItemAdd(itemmy) {
    // console.log('adddata', this.authForm.valid);

    const dic = {
      userId: this.userData.userId,
      hotelId: this.userData.hotelId == 0 ? this.constant.HotelId : this.userData.hotelId ,
      categoryId: this.categories[this.countlist - 1].categoryId,
      item: itemmy
    };
    //  if(this.authForm.valid==true){
    // console.log("not null")
    this.constant.LoadingPresent();
    this.service.addPMItem(dic).subscribe(
      result => {
        // console.log(result);
        this.constant.LoadingHide();
        if (result.data) {
          this.constant.ToastCustom(result.message, 'top');
          // this.constant.ToastCustom(result.data.message, 'top');
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

            this.allItemdata[this.countlist - 1].push(temp);
          }
          //  console.log(this.categoryType);
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


}
