var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Constant } from '../../services/constant';
import { ModalController, MenuController, ActionSheetController } from '@ionic/angular';
import { WebService } from '../../services/webService';
var SettingsPage = /** @class */ (function () {
    function SettingsPage(fb, constant, service, actionSheetCtrl, modelCtrl, menu) {
        this.fb = fb;
        this.constant = constant;
        this.service = service;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modelCtrl = modelCtrl;
        this.menu = menu;
        this.profile = true;
        this.activeSegment = 'profile';
        this.UserDetailsArry = [];
        this.userData = this.constant.getUserData();
        console.log(this.userData.userId);
        this.FormValtion();
        this.details = 'profile';
    }
    SettingsPage.prototype.ngOnInit = function () {
        console.log("khjk");
        this.menu.enable(true);
        this.getUserProfile();
    };
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log("khjk");
        this.menu.enable(true);
    };
    SettingsPage.prototype.ionViewWillEnter = function () {
        console.log("khjk");
        this.menu.enable(true);
    };
    SettingsPage.prototype.FormValtion = function () {
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
    };
    SettingsPage.prototype.profileTabClick = function () {
        this.profile = true;
        this.password = false;
    };
    SettingsPage.prototype.passwordTabClick = function () {
        this.profile = false;
        this.password = true;
        this.formPasswordValidation();
    };
    SettingsPage.prototype.formPasswordValidation = function () {
        this.passwordForm = this.fb.group({
            old_password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator, Validators.required])],
            new_password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator, Validators.required])],
            cofpassword: ['', Validators.compose([Validators.required, this.equalto('new_password')])],
        });
    };
    //--------------------------------Blank Space Method--------------------------------------//
    SettingsPage.prototype.noWhitespaceValidator = function (control) {
        console.log(control);
        var isWhitespace = (control.value || '').trim().length === 0;
        var isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    };
    //--------------------------------Password Match Method--------------------------------------//
    SettingsPage.prototype.equalto = function (field_name) {
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
    SettingsPage.prototype.getUserProfile = function () {
        var _this = this;
        var dic = { userId: this.userData.userId };
        this.constant.LoadingPresent();
        console.log(dic);
        this.service.getUserProfileAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                console.log(result);
                _this.UserDetailsArry = result.data;
                _this.constant.ToastCustom(result.message, 'top');
                //  this.navCtrl.navigateRoot('/dashboard');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
                _this.constant.LogoutSession(result.status_key);
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    SettingsPage.prototype.userEditProfileClick = function () {
        var _this = this;
        console.log(this.UserDetailsArry);
        var dic = {};
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
        console.log(dic);
        this.constant.LoadingPresent();
        console.log(dic);
        this.service.updateUserProfileAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                console.log(result);
                _this.UserDetailsArry = result.data;
                _this.constant.ToastCustom(result.message, 'top');
                //  this.navCtrl.navigateRoot('/dashboard');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
                _this.constant.LogoutSession(result.status_key);
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    SettingsPage = __decorate([
        Component({
            selector: 'app-settings',
            templateUrl: './settings.page.html',
            styleUrls: ['./settings.page.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder, Constant, WebService, ActionSheetController,
            ModalController, MenuController])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.page.js.map