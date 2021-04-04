import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Constant } from "../../services/constant"
import { WebService } from "../../services/webService";
import { Platform, NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {


  emailModel: any = '';
  isSelectedPhoneEmail = 1;
  getStartedButtonEnable = true;
  getOtpButtonEnable = true;
  passwordForm: FormGroup;
  
  userNameModel: any;
  responseData: any;
  getStartedOtp: boolean = false;
  getStartedNewPassword: boolean = false;
  getStartedUsername: boolean = true;
  otpModel: any;
  constructor(public constant: Constant, public service: WebService, public changeDetect: ChangeDetectorRef, public navCtrl: NavController, public fb: FormBuilder) {
    this.FormValtion();
  }

  ngOnInit() {
    // this.opt = Math.round((Math.random() * 100) * 100);
    // this.opt = Math.floor(1000 + Math.random() * 9000);
    // console.log("otp -->",this.opt);
  }
  FormValtion() {
    this.passwordForm = this.fb.group({
      new_password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator, Validators.required])],
      cofpassword: ['', Validators.compose([Validators.required, this.equalto('new_password')])],
      otp: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.pattern('^[0-9]{6}$'), this.noWhitespaceValidator])]
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
   EmailvalidCheckEvent(){
    if (this.constant.isValidEmail(this.userNameModel)) {
      this.getStartedButtonEnable = false;
      this.changeDetect.detectChanges();
     
    }else{
      this.getStartedButtonEnable = true;
      this.changeDetect.detectChanges();
      return true;
    }
  }
  OtpEvent(){
    if(this.otpModel.length == 4) {
      this.getOtpButtonEnable = false;
      this.changeDetect.detectChanges();
    }else {
      this.getOtpButtonEnable = true;
      this.changeDetect.detectChanges();
    }
  }

  getLoginClick() {
    this.navCtrl.navigateRoot('/login');
  }
  //----------------------------Get started--------------------------//

  generateOptClick() {
    var dic = {};
    dic['emailAddress'] = this.userNameModel;
    // dic['otp'] = this.opt;
  

    this.constant.LoadingPresent();
    this.service.GetForgotPasswordAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        this.getStartedNewPassword = true;
        this.getStartedOtp = false;
        this.getStartedUsername = false;  
        this.responseData = result.data;
        this.constant.ToastCustom(result.message, 'top');
        localStorage.setItem('v_access_token', JSON.stringify(this.responseData.v_access_token));
      
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  // subminOtpClick() {
  //   console.log(this.otpModel);
  //   if (this.otpModel.length == 4) {
  //     console.log("this.responseData ==> ",this.responseData);
      
  //     if (this.otpModel == this.opt) {
  //       this.getStartedNewPassword = true;
  //       this.getStartedOtp = false;
  //       this.getStartedUsername = false;
  //       console.log(this.otpModel);
  //     }
  //     else {
  //       this.constant.ToastCustom('Wrong OTP', 'top');
  //     }
  //   }
  //   else {
  //     this.constant.ToastCustom('Please Enter 4 digit code', 'Top');
  //   }
  // }
  getPasswordClick() {
    let dic = {};
    // dic['userId'] = this.responseData.i_user_id,
    dic['userId'] = JSON.parse(this.responseData.res.userId),
    dic['password'] = (this.passwordForm.value.new_password),
    dic['otp'] = JSON.parse(this.passwordForm.value.otp),
      // dic['t_device_token'] = this.constant.getDeviceId(),
      // dic['i_version_id'] = this.constant.APP_VERSION,
      // dic['v_ip'] = '',
      // dic['v_device_name'] = this.constant.SetplatFormName();
      // dic['v_access_token']=this.responseData.v_access_token;

      // console.log("getpassword->>",dic);

    this.constant.LoadingPresent();
    // console.log(dic);
    this.service.GetResetPasswordAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        // this.getStartedOtp = false;
        // this.getStartedUsername = true;
        // this.getStartedNewPassword = true;
        // console.log(result);
        // localStorage.setItem("userData", JSON.stringify(result.data));
        // localStorage.setItem('v_access_token',JSON.stringify(result.data.v_access_token));
        // localStorage.setItem("setting", JSON.stringify(result.setting));
        // this.responseData = result.data;
        this.constant.ToastCustom(result.message, 'top');
        // console.log("resetpasswordcomplte->>>",result);
        this.navCtrl.navigateRoot('/login');
      } else {
        this.constant.LogoutSession(result.status_key);
        this.constant.ToastCustom(result.message, 'top');
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
}
