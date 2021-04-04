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
import { Constant } from '../../services/constant';
import { NavController } from '@ionic/angular';
import { webServicenew } from '../../services/webServicenew';
import { Router } from '@angular/router';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(constant, service, navCtrl, router) {
        this.constant = constant;
        this.service = service;
        this.navCtrl = navCtrl;
        this.router = router;
        this.UserDetailsArry = [];
        this.userData = this.constant.getUserData();
    }
    ProfilePage.prototype.ngOnInit = function () {
        // this.getUserProfile();
    };
    ProfilePage.prototype.ionViewDidEnter = function () {
        this.getUserProfile();
    };
    ProfilePage.prototype.getUserProfile = function () {
        var _this = this;
        var dic = { userId: this.userData.userId };
        this.constant.LoadingPresent();
        console.log(dic);
        this.service.getUserProfileAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                console.log(result);
                _this.UserDetailsArry = result.data.data;
                // this.constant.ToastCustom(result.message, 'top');
                //  this.navCtrl.navigateRoot('/dashboard');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    ProfilePage.prototype.goToCHhangePasswordCLick = function () {
        this.navCtrl.navigateForward('/change-password');
    };
    ProfilePage.prototype.goToEditProfileCLick = function () {
        //this.router.navigate(['/edit-profile',{userInfo:JSON.stringify(this.UserDetailsArry)}]);
        this.navCtrl.navigateForward('/edit-profile');
    };
    ProfilePage = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        __metadata("design:paramtypes", [Constant, webServicenew, NavController,
            Router])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map