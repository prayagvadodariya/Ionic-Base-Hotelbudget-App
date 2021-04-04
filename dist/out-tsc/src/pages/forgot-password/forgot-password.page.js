var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { Constant } from "../../services/constant";
import { WebService } from "../../services/webService";
import { NavController } from '@ionic/angular';
import { FormBuilder, Validators } from "@angular/forms";
var ForgotPasswordPage = /** @class */ (function () {
    function ForgotPasswordPage(constant, service, changeDetect, navCtrl, fb) {
        this.constant = constant;
        this.service = service;
        this.changeDetect = changeDetect;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.emailModel = '';
        this.isSelectedPhoneEmail = 1;
        this.getStartedButtonEnable = true;
        this.getStartedOtp = false;
        this.getStartedNewPassword = false;
        this.getStartedUsername = true;
        this.FormValtion();
    }
    ForgotPasswordPage.prototype.ngOnInit = function () {
        this.opt = Math.round((Math.random() * 100) * 100);
        console.log(this.opt);
    };
    ForgotPasswordPage.prototype.FormValtion = function () {
        this.passwordForm = this.fb.group({
            new_password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator, Validators.required])],
            cofpassword: ['', Validators.compose([Validators.required, this.equalto('new_password')])],
        });
    };
    //--------------------------------Blank Space Method--------------------------------------//
    ForgotPasswordPage.prototype.noWhitespaceValidator = function (control) {
        console.log(control);
        var isWhitespace = (control.value || '').trim().length === 0;
        var isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    };
    //--------------------------------Password Match Method--------------------------------------//
    ForgotPasswordPage.prototype.equalto = function (field_name) {
        return function (control) {
            var input = control.value;
            var isValid = control.root.value[field_name] == input;
            if (!isValid) {
                return { 'equalTo': { isValid: isValid } };
            }
            else {
                return null;
            }
        };
    };
    ForgotPasswordPage.prototype.EmailvalidCheckEvent = function () {
        if (this.constant.isValidEmail(this.userNameModel)) {
            this.getStartedButtonEnable = false;
            this.changeDetect.detectChanges();
            return false;
        }
        else {
            this.getStartedButtonEnable = true;
            this.changeDetect.detectChanges();
            return true;
        }
    };
    ForgotPasswordPage.prototype.getLoginClick = function () {
        this.navCtrl.navigateRoot('/login');
    };
    //----------------------------Get started--------------------------//
    ForgotPasswordPage.prototype.generateOptClick = function () {
        var _this = this;
        var dic = {};
        dic['v_email'] = this.userNameModel;
        // dic['t_device_token'] = this.constant.getDeviceId();
        // dic['i_version_id'] = this.constant.APP_VERSION;
        // dic['v_device_name'] = this.constant.SetplatFormName();
        // dic['v_ip'] = '';
        this.constant.LoadingPresent();
        console.log(dic);
        this.service.GetForgotPasswordAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                _this.getStartedOtp = true;
                _this.getStartedUsername = false;
                _this.getStartedNewPassword = false;
                console.log(result);
                _this.responseData = result.data;
                localStorage.setItem('v_access_token', JSON.stringify(_this.responseData.v_access_token));
                _this.constant.ToastCustom(result.message, 'top');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    ForgotPasswordPage.prototype.subminOtpClick = function () {
        console.log(this.otpModel);
        if (this.otpModel.length == 4) {
            if (this.otpModel == this.responseData.otp) {
                this.getStartedNewPassword = true;
                this.getStartedOtp = false;
                this.getStartedUsername = false;
                console.log(this.otpModel);
            }
            else {
                this.constant.ToastCustom('Wrong OTP', 'top');
            }
        }
        else {
            this.constant.ToastCustom('Please Enter 4 digit code', 'Top');
        }
    };
    ForgotPasswordPage.prototype.getPasswordClick = function () {
        var _this = this;
        var dic = {};
        dic['i_user_id'] = this.responseData.i_user_id,
            dic['v_password'] = this.passwordForm.value.new_password,
            dic['t_device_token'] = this.constant.getDeviceId(),
            dic['i_version_id'] = this.constant.APP_VERSION,
            dic['v_ip'] = '',
            dic['v_device_name'] = this.constant.SetplatFormName();
        dic['v_access_token'] = this.responseData.v_access_token;
        this.constant.LoadingPresent();
        console.log(dic);
        this.service.GetResetPasswordAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                _this.getStartedOtp = true;
                _this.getStartedUsername = false;
                _this.getStartedNewPassword = false;
                console.log(result);
                localStorage.setItem("userData", JSON.stringify(result.data));
                localStorage.setItem('v_access_token', JSON.stringify(result.data.v_access_token));
                localStorage.setItem("setting", JSON.stringify(result.setting));
                _this.responseData = result.data;
                _this.constant.ToastCustom(result.message, 'top');
                _this.navCtrl.navigateRoot('/login');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    ForgotPasswordPage = __decorate([
        Component({
            selector: 'app-forgot-password',
            templateUrl: './forgot-password.page.html',
            styleUrls: ['./forgot-password.page.scss'],
        }),
        __metadata("design:paramtypes", [Constant, WebService, ChangeDetectorRef, NavController, FormBuilder])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());
export { ForgotPasswordPage };
//# sourceMappingURL=forgot-password.page.js.map