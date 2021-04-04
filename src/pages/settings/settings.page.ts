import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl} from "@angular/forms";
import { Constant } from '../../services/constant';
import {NavController ,ModalController,MenuController, AlertController,ActionSheetController,ToastController} from '@ionic/angular';
import { WebService } from '../../services/webService';
import { GetMediaHelper } from "../../helper/get-media-helper/get-media-helper";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  authForm: FormGroup;
  passwordForm: FormGroup;
  details: string;
  profile: any = true;
  password: any;
  activeSegment: any = 'profile';
  userData: any;
  UserDetailsArry: any = [];
  constructor(public fb: FormBuilder, public constant: Constant, public service: WebService,public actionSheetCtrl: ActionSheetController,
    public modelCtrl: ModalController,public menu:MenuController) {
    this.userData = this.constant.getUserData();
    // console.log(this.userData.userId);
    this.FormValtion();
    this.details = 'profile';

  }

  ngOnInit() {
    // console.log("khjk");
    this.menu.enable(true);
    this.getUserProfile();
  }
  ionViewDidLoad()
  {
    // console.log("khjk");
    this.menu.enable(true);
  }
  ionViewWillEnter()
  {
    // console.log("khjk");
    this.menu.enable(true);
  }
  FormValtion() {
    this.authForm = this.fb.group({
      first_name: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]'), Validators.required])],
      last_name: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('[A-Z0-9.a-z0-9._]+@[a-z0-9.-]+\\.[a-z]{2,3}$'), Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      fax: ['', Validators.compose([Validators.pattern('^\\+[0-9]{1,1}-[0-9]{3}-[0-9]{7}$'), Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.minLength(5), Validators.required])],
    });
  }
  profileTabClick() {
    this.profile = true;
    this.password = false;
  }
  passwordTabClick() {
    this.profile = false;
    this.password = true;
    this.formPasswordValidation()
  }
  formPasswordValidation() {
    this.passwordForm = this.fb.group({
      old_password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator, Validators.required])],
      new_password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator, Validators.required])],
      cofpassword: ['', Validators.compose([Validators.required, this.equalto('new_password')])],
    });
  }

  //--------------------------------Blank Space Method--------------------------------------//
  public noWhitespaceValidator(control: FormControl) {
    // console.log(control);
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  //--------------------------------Password Match Method--------------------------------------//
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      let isValid = control.root.value[field_name] == input
      if (!isValid) {
        return { 'equalTo': { isValid } }
      } else {
        return null;
      }
    };
  }


  getUserProfile() {
    let dic = { userId: this.userData.userId };
    this.constant.LoadingPresent();
    // console.log(dic);
    this.service.getUserProfileAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        this.UserDetailsArry = result.data;
        this.constant.ToastCustom(result.message, 'top');
        //  this.navCtrl.navigateRoot('/dashboard');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  
  userEditProfileClick() {
    // console.log(this.UserDetailsArry);
    let dic = {};
    dic['userId'] = this.UserDetailsArry.userId,
      dic['firstName'] = this.UserDetailsArry.firstName,
      dic['lastName'] = this.UserDetailsArry.lastName,
      dic['emailAddress'] = this.UserDetailsArry.emailAddress,
      dic['phone'] = this.UserDetailsArry.phone,
      dic['cellPhone'] = this.UserDetailsArry.cellPhone,
      dic['fax'] = this.UserDetailsArry.fax,
      dic['address'] = this.UserDetailsArry.address,
      dic['state'] = this.UserDetailsArry.state,
      dic['city'] = this.UserDetailsArry.city,
      dic['zip'] = this.UserDetailsArry.zip,
      dic['profileimg'] = this.UserDetailsArry.profileimg;
    // console.log(dic);

    this.constant.LoadingPresent();
    // console.log(dic);
    this.service.updateUserProfileAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        this.UserDetailsArry = result.data;
        this.constant.ToastCustom(result.message, 'top');
        //  this.navCtrl.navigateRoot('/dashboard');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  
  // async userProfileUpdate() {
  //   let actionSheet = await this.actionSheetCtrl.create({
  //     header:  'Select Image Source',
  //     buttons: [
  //       {
  //         text: 'Load from Library',
  //         handler: () => {
  //           this.UploadImageMethod('gallery');
  //         }
  //       },
  //       {
  //         text: 'Use Camera',
  //         handler: () => {
  //           this.UploadImageMethod('camera');
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //   return await actionSheet.present();
  // }
  //   async  UploadImageMethod(mediaType)
  // {
  //   let modal = await  this.modelCtrl.create(
  //     {
  //       component:GetMediaHelper,
  //       componentProps: { type: mediaType, uploadUrl: URL
  //      } });
  //  return await  modal.present();
  //  await modal.onDidDismiss();
  // }

  
}
