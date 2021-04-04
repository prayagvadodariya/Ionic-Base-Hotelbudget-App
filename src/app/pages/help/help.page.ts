import { Component, OnInit } from '@angular/core';
import { webServicenew } from 'src/services/webServicenew';
import { Constant } from 'src/services/constant';
import { ModalController, AlertController, Events, ActionSheetController, NavController } from '@ionic/angular';
import { GetMediaHelper } from "src/helper/get-media-helper/get-media-helper";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  userData: any;
  hotelId: any;
 
  ImageData = [];
  descriptiondata:any;

  filesToUpload: Array<File> = [];
  constructor(public service: webServicenew, public modelCtrl: ModalController,public navCtrl: NavController,
    public alertCtrl: AlertController, public constant: Constant,public webview: WebView,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
     public events: Events) {

    this.userData = this.constant.getUserData();
      this.hotelId = this.constant.HotelId;
      console.log(this.userData);
  }

  ngOnInit() {
  }
  removeImg(){
    console.log("removeimg")
  }

  async addNewImg(){
    const alertmes = await this.alertCtrl.create({
      header: 'Profile Photo',
      // subHeader: 'Subtitle',
      //  message: 'Are you sure want to sign out?',
      backdropDismiss: false,
      cssClass: 'profile-main-pc',
      buttons: [
        {
          text: '',
          cssClass: 'profile-pic gallery-pic',
          handler: () => {
            this.UploadImageMethod('gallery');
          }
        },
        {
          text: '',
          cssClass: 'profile-pic camera-pic',
          handler: () => {
            this.UploadImageMethod('camera');
          }
        },
        // {
        //   text: 'Remove Photo',
        //   cssClass: 'done-btn btnsize1',
        //   handler: () => {
        //     this.UploadImageMethod('camera');
        //   }
        // },
        {
          text: '',
          // role: 'cancel',
          cssClass: 'icon-cancel',

          // handler: () => {
          //   this.UploadImageMethod('gallery');
          // }
        },
      ]
    });
    return await alertmes.present();
  }
  
  async  UploadImageMethod(mediaType){
  
    let modal = await this.modelCtrl.create(
      {
        component: GetMediaHelper,
        componentProps: {
          type: mediaType,
          page: 'HelpPage'
        }
      });
    await modal.present();
    modal.onDidDismiss().then((response) => {
      console.log("data",response);
      // localStorage.setItem("userData", JSON.stringify(response.data.JsonParseObj.data.user_data));
      // this.events.publish("userloggedin", { data: response.data.JsonParseObj.data.user_data,image: response.data.JsonParseObj.setting});

      if (response) {

        // tslint:disable-next-line: triple-equals
        if (response.data.JsonParseObj.status == true) {
        //   this.v_profile_image = response.data.JsonParseObj.data.user_data.profileimg;
        //   this.profileimg = this.webview.convertFileSrc(response.data.FilePath);
        //   this.constant.ToastCustom('Profile photo updated', 'top');
        //   // console.log("Create image url link",this.profileimg);
        //    console.log("2",response.data.FilePath);

          let tempdata = {
            urlmy: response.data.JsonParseObj.setting.imgPath_temp,
            name: response.data.JsonParseObj.data.image_name
          };
        this.ImageData.push(tempdata);
        }

      }

    });
    
    await modal.onDidDismiss();
  } 

  DeleteImage(i){
    // console.log(i);
    
    var senddata = {
      userId: this.userData.userId,
      image_name:[this.ImageData[i].name]
    }
    this.service.ImagedelteArray(senddata).subscribe(result => {
      //this.constant.LoadingHide();
      console.log(result);
      if (result) {
        this.ImageData.splice(i,1);
        this.constant.ToastCustom(result.message, 'top');
        // this.modalCtrl.dismiss({status:true});
      }else{
        this.constant.LogoutSession(result.status_key);
      }
    });
    // this.filesToUpload.splice(i,1);
    // console.log(this.ImageData);
  }

  HelpSubmit(){
    // if(this.descriptiondata != ''){
        
         var nameImagesend = [];
         this.ImageData.forEach(item => {
           nameImagesend.push(item.name);
         });
         var dic = { 
                          userId: this.userData.userId,
                          roleId: this.userData.roleId,
                          enquiry: this.descriptiondata,
                          attachmentFile: nameImagesend,
                          emailAddress: this.userData.emailAddress,
                          firstName: this.userData.firstName,
                          lastName: this.userData.lastName,
                          hotelName: this.constant.hotelName
        }
        console.log(dic);
    if(dic.enquiry== null){
          this.constant.ToastCustom('Description is required', 'top');
    }else{
      this.constant.LoadingPresent();
      this.service.HelpAdd(dic).subscribe(result => {
        this.constant.LoadingHide();
        console.log(result);
        if (result.status) {
          // this.ImageData = [];
          // this.descriptiondata = "";
          if(this.userData.roleId==1){
            this.navCtrl.navigateRoot('/dashboard');
          }else if(this.userData.roleId==2){
            this.navCtrl.navigateRoot('/gmdashboard');
          }
          this.constant.ToastCustom(result.message, 'top');
          // this.modalCtrl.dismiss({status:true});
        }else{
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      });
    }
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave');
    var nameImagesend = [];
    this.ImageData.forEach(item => {
      nameImagesend.push(item.name);
    });
    if(nameImagesend.length > 0) {
          var senddata = {
            userId: this.userData.userId,
            image_name:nameImagesend
          }
          this.service.ImagedelteArray(senddata).subscribe(result => {
            //this.constant.LoadingHide();
            console.log(result);
            if (result) {
              // this.constant.ToastCustom(result.message, 'top');
              // this.modalCtrl.dismiss({status:true});
            }else{
              this.constant.LogoutSession(result.status_key);
            }
          });
    }
 
  }

}
