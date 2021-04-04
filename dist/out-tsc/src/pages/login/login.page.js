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
import { NavController, Events, MenuController } from '@ionic/angular';
import { Constant } from '../../services/constant';
//import { WebService } from '../../services/webService';
import { webServicenew } from "../../services/webServicenew";
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, constant, menu, service, events) {
        this.navCtrl = navCtrl;
        this.constant = constant;
        this.menu = menu;
        this.service = service;
        this.events = events;
        this.rememberChecked = false;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    // presentModal()
    // {
    //   this.navCtrl.navigateRoot('/dashboard');
    // }
    // presentModal1()
    // {
    //   this.navCtrl.navigateBack('/dashboard');
    // }
    LoginPage.prototype.presentModal2 = function () {
        this.navCtrl.navigateForward('/dashboard');
    };
    LoginPage.prototype.userLoginClick = function () {
        var _this = this;
        console.log(this.rememberChecked);
        console.log(this.username);
        console.log(this.password);
        if (this.username == undefined || this.username == '' || this.password == undefined || this.password == '') {
            var message = "Username or Password can't be blank";
            this.constant.ToastCustom(message, 'top');
        }
        else {
            console.log(this.constant.getDeviceId());
            var dic = {};
            dic["userName"] = this.username;
            dic["password"] = this.password;
            dic["deviceType"] = 'Android';
            // dic["i_version_id"] = parseFloat(this.constant.APP_VERSION);
            dic["deviceIp"] = 111;
            dic["deviceToken"] = 1234567891;
            this.constant.LoadingPresent();
            console.log(dic);
            this.service.GetLoginPageApi(dic).subscribe(function (result) {
                _this.constant.LoadingHide();
                console.log(result);
                _this.menu.enable(true);
                if (result.status) {
                    console.log(result.data.user_data.deviceToken);
                    _this.constant.ToastCustom(result.message, 'top');
                    localStorage.setItem("userData", JSON.stringify(result.data.user_data));
                    localStorage.setItem('v_access_token', JSON.stringify(result.data.user_data.deviceToken));
                    localStorage.setItem("rememberChecked", JSON.stringify(_this.rememberChecked));
                    _this.events.publish("userloggedin", { data: result.data.user_data });
                    if (result.data.user_data.roleId == 1) {
                        _this.navCtrl.navigateRoot('/dashboard');
                    }
                    else {
                        _this.navCtrl.navigateRoot('/gmdashboard');
                    }
                }
                else {
                    _this.constant.ToastCustom(result.message, 'top');
                    _this.constant.LogoutSession(result.status_key);
                }
            }, function (error) {
                _this.constant.Logout(error);
            });
        }
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
            styles: ["\n      ion-item {\n          background:transparent;\n      }\n  "]
        }),
        __metadata("design:paramtypes", [NavController, Constant, MenuController, webServicenew, Events])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map