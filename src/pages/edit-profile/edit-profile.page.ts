import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { Constant } from '../../services/constant';
import { NavController, ModalController, AlertController, ActionSheetController, ToastController, Events } from '@ionic/angular';
import { webServicenew } from '../../services/webServicenew';
import { GetMediaHelper } from "../../helper/get-media-helper/get-media-helper";
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {


  authForm: FormGroup;
  userData: any;
  UserDetailsArry: any = [];
  cryptoList: any = [];
  getCountryList: any = [];
  getStateList: any = [];
  i_country_id: any;
  country: any;
  state: any;
  fax: any;
  zipvalidationmsg:any;
  profiledata:any;
  profileimg: any = [];
  updateprofileimg: any;
  userImage: any=[];
  v_profile_image:any;
  getvalidFaxValue = false;
  getvalidFax = true;
  dic: {};


  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public constant: Constant, public service: webServicenew,
    public actionSheetCtrl: ActionSheetController, public modelCtrl: ModalController, public navCtrl: NavController, public events: Events, public changeDetect: ChangeDetectorRef,
    private router: Router, public alertCtrl: AlertController, public webview: WebView) {

  
     this.UserDetailsArry= JSON.parse(this.activatedRoute.snapshot.paramMap.get('userInfo'));
     this.profileimg= JSON.parse(this.activatedRoute.snapshot.paramMap.get('userProfile'));
    //  console.log("userdetaisArray",this.UserDetailsArry);
    //  console.log("userprofileimg",this.profileimg);
    //  console.log("v_profile_image",this.v_profile_image);
    // console.log(this.userData);
    this.FormValtion();
    // this.getStateFunction();
  }

  ionViewWillEnter()  { 
    this.userData = this.constant.getUserData(); 
   // this.getUserProfile();
  }
  ngOnInit()
  {
    
  }

  // Fax pattern ="+1-123-1234567"

  FormValtion() {
    this.authForm = this.fb.group({
      first_name: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]'), Validators.required])],
      last_name: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('[A-Z0-9.a-z0-9._]+@[a-z0-9.-]+\\.[a-z]{2,3}$'), Validators.required])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')])],
      mobile: ['', Validators.compose([Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'), Validators.required])],
      fax: ['', Validators.compose([Validators.pattern('^\\+[0-9]{1,1}-[0-9]{3}-[0-9]{7}$'), Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required, Validators.pattern('.*\\S.*[a-zA-Z]')])],
      city: ['', Validators.compose([Validators.required, Validators.pattern('.*\\S.*[a-zA-Z]')])],
      zip: ['', Validators.compose([ Validators.required, Validators.pattern('^[0-9]{6}$')])],
      //  country: ['', Validators.compose([Validators.required,  Validators.pattern('^[0-9]{10}$'])]
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

  onChangeFaxClick(fax) {
    // console.log(fax);
    var validFax = this.constant.isValidFax(fax);
    if (validFax) {
      this.getvalidFax = true;
    }
    else {
      this.getvalidFax = false;
    }
  }

  // getStateFunction() {
  //   let req={i_user_id:this.userData.i_user_id}
  //   this.service.getStateAPI(req).subscribe((result) => {
  //   //  this.constant.LoadingHide();
  //     if (result.status) {
  //       console.log(result);
  //       this.getCountryList = result.data;
  //       setTimeout(() => {
  //         this.country = 1;
  //       },200);
  //       this.changeDetect.detectChanges();
  //       setTimeout(() => {
  //         this.setStateArrayFunction(this.country);
  //       },200);

  //     } else {
  //       this.constant.ToastCustom(result.message, 'top');
  //     }
  //   }, error => {
  //     this.constant.Logout(error);
  //   });
  // }

  // onSelectChange(event) {
  //   console.log(event);
  //   this.i_country_id = event.target.value;
  //   this.getStateList = [];
  //   this.state='';
  //   this.changeDetect.detectChanges();
  //   this.setStateArrayFunction(event.target.value);
  // }

  // setStateArrayFunction(value) {
  //   console.log(value);
  //   for (var i = 0; i < this.getCountryList.length; i++) {
  //     console.log(this.getCountryList[i]);
  //     if (value == this.getCountryList[i].i_country_id) {
  //       this.getStateList.push(this.getCountryList[i].states);
  //     }
  //     console.log(this.getStateList);
  //     setTimeout(() => {
  //       this.state = 1;
  //     }, 500);
  //   }
  //   this.changeDetect.detectChanges();
  // }
  // onChangeState(event) {
  //   console.log(event);
  //   console.log(this.getStateList.length);
  //   if (this.getStateList.length == 0)
  //     this.constant.ToastCustom('Please First  of select Country', 'top');
  //   // else
  //   //this.state_id=event.target.value;
  // }
  getUserProfile() {
    let dic = { userId: this.userData.userId };
    // this.constant.LoadingPresent();
   
    this.service.getUserProfileAPI(dic).subscribe((result) => {
      // this.constant.LoadingHide();
      // console.log("updateprofile");
      this.events.publish("userloggedin", { data: result.data.data });
      this.events.publish("userloggedin", { data: result.data.user_data,image: result.setting});
      if (result.status) {
   
        this.UserDetailsArry = result.data.user_data;
        this.constant.ToastCustom(result.message, 'top');
        // this.constant.ToastCustom(result.message, 'top');
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
    this.dic = {};
    // console.log(this.authForm.value);
    this.dic['userId'] = this.UserDetailsArry.userId,
      this.dic['firstName'] = this.authForm.value.first_name,
      this.dic['lastName'] = this.authForm.value.last_name;
      this.dic['userName'] = this.userData.userName,
      this.dic['emailAddress'] = this.authForm.value.email,
      this.dic['phone'] = this.authForm.value.phone,
      this.dic['cellPhone'] = this.authForm.value.mobile,
      this.dic['fax'] = this.authForm.value.fax;
      this.dic['address'] = this.authForm.value.address,
      this.dic['state'] = this.authForm.value.state,
      this.dic['city'] = this.authForm.value.city,
      this.dic['zip'] = this.authForm.value.zip,
      this.dic['roleId']=this.userData.roleId;
      this.dic['loginStatus'] = 'Active'; 
      this.dic['profileimg'] = this.v_profile_image; 
      this.dic['modifiedByUserId']=this.UserDetailsArry.userId;
      // console.log("parameter",this.dic);
      // console.log("parameter update image->>>>>-->",this.v_profile_image);



    this.constant.LoadingPresent();
  
    this.service.updateUserProfileAPI(this.dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        this.UserDetailsArry = result.data;
        localStorage.setItem("userData", JSON.stringify(result.data.user_data));
        this.events.publish("userloggedin", { data: result.data.user_data,image: result.setting});
        this.constant.ToastCustom(result.message, 'top');
        this.navCtrl.pop();
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });

  }

  async userProfileUpdate() {
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

  async  UploadImageMethod(mediaType) {
    let modal = await this.modelCtrl.create(
      {
        component: GetMediaHelper,
        componentProps: {
          type: mediaType,
          page: 'edit_profile'
        }
      });
    await modal.present();
    modal.onDidDismiss().then((response) => {
      // console.log("data",response);
      localStorage.setItem("userData", JSON.stringify(response.data.JsonParseObj.data.user_data));
      this.events.publish("userloggedin", { data: response.data.JsonParseObj.data.user_data,image: response.data.JsonParseObj.setting});

      if (response) {

        if (response.data.JsonParseObj.status == true) {
          this.v_profile_image = response.data.JsonParseObj.data.user_data.profileimg;
          this.profileimg = this.webview.convertFileSrc(response.data.FilePath);
          this.constant.ToastCustom('Profile photo updated', 'top');
          // console.log("Create image url link",this.profileimg);
           console.log("2",response.data.FilePath);
          this.getUserProfile();

        }

      }

    });
    
    await modal.onDidDismiss();
  }
  onSelectChange(event)
  {
    // console.log(event);
  }

  // setprofiledataall(){

  // }
}
