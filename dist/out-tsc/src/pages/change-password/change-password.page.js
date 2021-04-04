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
import { NavController, ModalController, ActionSheetController, Events } from '@ionic/angular';
import { webServicenew } from '../../services/webServicenew';
var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(fb, constant, service, actionSheetCtrl, modelCtrl, navCtrl, events) {
        this.fb = fb;
        this.constant = constant;
        this.service = service;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modelCtrl = modelCtrl;
        this.navCtrl = navCtrl;
        this.events = events;
        this.userData = this.constant.getUserData();
        console.log(this.userData.userId);
        this.formPasswordValidation();
    }
    ChangePasswordPage.prototype.formPasswordValidation = function () {
        this.passwordForm = this.fb.group({
            old_password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator, Validators.required])],
            new_password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), this.noWhitespaceValidator, Validators.required])],
            cofpassword: ['', Validators.compose([Validators.required, this.equalto('new_password')])],
        });
    };
    //--------------------------------Blank Space Method--------------------------------------//
    ChangePasswordPage.prototype.noWhitespaceValidator = function (control) {
        console.log(control);
        var isWhitespace = (control.value || '').trim().length === 0;
        var isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    };
    //--------------------------------Password Match Method--------------------------------------//
    ChangePasswordPage.prototype.equalto = function (field_name) {
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
    ChangePasswordPage.prototype.ngOnInit = function () {
    };
    ChangePasswordPage.prototype.userEditPassword = function () {
        var _this = this;
        if (this.passwordForm.valid) {
            console.log(this.passwordForm.value);
            var dic = {};
            var userData = JSON.parse(localStorage.getItem("userData"));
            dic["userId"] = parseInt(this.userData.userId);
            dic["password"] = this.passwordForm.value.new_password;
            dic["old_password"] = this.passwordForm.value.old_password;
            this.service.changePasswordAPI(dic).subscribe(function (result) {
                _this.constant.LoadingHide();
                if (result.status) {
                    console.log(result);
                    _this.constant.ToastCustom(result.message, 'top');
                    _this.events.publish("LogoutSession", { data: result });
                    // this.navCtrl.navigateRoot('/login');
                }
                else {
                    _this.constant.ToastCustom(result.message, 'top');
                }
            }, function (error) {
                _this.constant.Logout(error);
            });
        }
        else {
            console.log("else===");
        }
    };
    ChangePasswordPage = __decorate([
        Component({
            selector: 'app-change-password',
            templateUrl: './change-password.page.html',
            styleUrls: ['./change-password.page.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder, Constant, webServicenew, ActionSheetController,
            ModalController, NavController, Events])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());
export { ChangePasswordPage };
//# sourceMappingURL=change-password.page.js.map