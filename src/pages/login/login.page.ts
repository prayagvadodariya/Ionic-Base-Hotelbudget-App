import { Component, OnInit } from '@angular/core';
import { Platform, NavController, AlertController, NavParams,Events, MenuController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Constant } from '../../services/constant';
//import { WebService } from '../../services/webService';
import {webServicenew} from "../../services/webServicenew";
import { empty } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  styles: [`
      ion-item {
          background:transparent;
      }
  `]
})
export class LoginPage implements OnInit {

  username: any;
  password: any;
  rememberChecked:true;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  constructor(public navCtrl: NavController, public constant: Constant,public menu: MenuController, public service: webServicenew,public events: Events) { 
   
    this.username = localStorage.getItem("username");
    this.password = localStorage.getItem("password");
  
  }

  ngOnInit() {
  }
  rememberCLick(rememberChecked){
    if(rememberChecked){
      // this.rememberChecked = true;
    //  console.log("1",this.username);
     localStorage.setItem("username",this.username)
     localStorage.setItem("password",this.password);
    //  console.log("2",this.password);
     
    }else {
      // console.log("111111");
    }
  }
  hideShowPassword() {
    // console.log('hideShowPassword');
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}
  // presentModal()
  // {
  //   this.navCtrl.navigateRoot('/dashboard');
  // }
  // presentModal1()
  // {
  //   this.navCtrl.navigateBack('/dashboard');
  // }
  presentModal2() {
    this.navCtrl.navigateForward('/dashboard');
  }
  userLoginClick() {
    // console.log(this.rememberChecked);
    // console.log(this.username);
    // console.log(this.password);
    if (this.username == undefined || this.username == '' || this.password == undefined || this.password == '') {
      var message = "Username or Password can't be blank";
      this.constant.ToastCustom(message, 'top');
    }
    else {
      // console.log(this.constant.getDeviceId());
     
     let dic={};
      dic["userName"] = this.username;
      dic["password"] = this.password;
      dic["deviceType"] = 'Android';
      dic["i_version_id"] = parseFloat(this.constant.APP_VERSION);
      // dic["deviceIp"]=111;
      // dic["deviceToken"] = 1234567891

      this.constant.LoadingPresent();
      this.service.GetLoginPageApi(dic).subscribe((result) => {
        this.constant.LoadingHide();
        this.menu.enable(true);
        if (result.status) {
          this.constant.ToastCustom(result.message, 'top');
          localStorage.setItem("userData", JSON.stringify(result.data.user_data));
           localStorage.setItem('v_access_token',JSON.stringify(result.data.user_data.v_access_token));
          localStorage.setItem("rememberChecked", JSON.stringify(true));
          localStorage.setItem("profile_image",result.setting.profile_image_url);
          localStorage.setItem("UserName",this.username);
          localStorage.setItem("Password",this.password);
          localStorage.setItem("GENERAL_CLEAN_URL",result.setting.GENERAL_CLEAN_URL);
          localStorage.setItem("PM_FORMS_URL",result.setting.PM_FORMS_URL);
          this.events.publish("userloggedin", { data: result.data.user_data,image: result.setting});

          // this.events.publish("userloggedinimg", { setting: result.setting });
          if(result.data.user_data.roleId==1)
          {
            this.navCtrl.navigateRoot('/dashboard');
          }
          else if(result.data.user_data.roleId==2) {
            this.navCtrl.navigateRoot('/gmdashboard');
          }
          else if(result.data.user_data.roleId==5){
            this.navCtrl.navigateRoot('/pm-dashboard');
          }
          else if(result.data.user_data.roleId==6){
            this.navCtrl.navigateRoot('/pm-dashboard');
          }
          else if(result.data.user_data.roleId==7){
            this.navCtrl.navigateRoot('/pm-dashboard');
          }
          
        } else {
          // console.log('elseee');
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      }, error => {
        this.constant.LoadingHide();
        this.constant.Logout(error);
      });

    }
  }

}
