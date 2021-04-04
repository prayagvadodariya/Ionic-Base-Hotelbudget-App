import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { Constant } from '../../services/constant';
import { NavController, ModalController, AlertController, ActionSheetController,Events, ToastController } from '@ionic/angular';
import { webServicenew } from '../../services/webServicenew';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  passwordForm: FormGroup;
  userData: any;

  constructor(public fb: FormBuilder, public constant: Constant, public service: webServicenew, public actionSheetCtrl: ActionSheetController,
    public modelCtrl: ModalController, public navCtrl: NavController,public events: Events) {
    this.userData = this.constant.getUserData();
    // console.log(this.userData.userId);
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

  ngOnInit() {
  }
  
  userEditPassword() {
    if (this.passwordForm.valid) {
      // console.log(this.passwordForm.value);
      var dic = {};
      let userData = JSON.parse(localStorage.getItem("userData"));
      dic["userId"] = parseInt(this.userData.userId);
      dic["password"] = this.passwordForm.value.new_password;
      dic["old_password"] = this.passwordForm.value.old_password;

      this.service.changePasswordAPI(dic).subscribe((result) => {
        this.constant.LoadingHide();
        if (result.status) {
          // console.log(result);
          this.constant.ToastCustom(result.message, 'top');
          this.navCtrl.pop();
         // this.navCtrl.navigateRoot('/login');
        } else {
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      }, error => {
        this.constant.Logout(error);
      });
    }
    else {
      // console.log("else===");
    }
  }

}
