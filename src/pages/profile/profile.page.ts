import { Component, OnInit } from '@angular/core';
import { Constant } from '../../services/constant';
import { NavController, ModalController, AlertController, ActionSheetController, ToastController, Events } from '@ionic/angular';
import { webServicenew } from '../../services/webServicenew';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: any;
  UserDetailsArry: any = [];
  profileimg:string ="";
  constructor(public constant: Constant, public service: webServicenew,public events: Events,public navCtrl :NavController,
     private router : Router) { 
    this.userData = this.constant.getUserData();
  }

  ngOnInit() {
   // this.getUserProfile();
  }
 
  ionViewWillEnter()
  {
    // console.log("getUserProfile");
    this.getUserProfile();
  }
 
  getUserProfile() {
    let dic = { userId: this.userData.userId };
    this.constant.LoadingPresent();
    // console.log(dic);
    this.service.getUserProfileAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        this.UserDetailsArry = result.data.user_data;
        this.profileimg = "";
        this.profileimg = result.setting.profile_image_url + this.UserDetailsArry.profileimg +"?t="+ new Date().getTime();
        localStorage.setItem("userData", JSON.stringify(result.data.user_data));
        this.events.publish("userloggedin", { data: result.data.user_data,image: result.setting});
        // console.log("profileimg-->>",result.setting.profile_image_url + this.UserDetailsArry.profileimg);
        
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  goToCHhangePasswordCLick()
  {
    this.navCtrl.navigateForward('/change-password');
  }
  goToEditProfileCLick()
  {
    this.router.navigate(['/edit-profile',{userInfo:JSON.stringify(this.UserDetailsArry),
      userProfile:JSON.stringify(this.profileimg)}]);
   
  }

}
