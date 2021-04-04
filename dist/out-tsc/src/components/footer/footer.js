var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Constant } from "../../services/constant";
var FooterComponent = /** @class */ (function () {
    function FooterComponent(navCtrl, router, constant) {
        this.navCtrl = navCtrl;
        this.router = router;
        this.constant = constant;
        this.markers = [];
        this.ParamData = [];
        console.log('Hello MapComponent Component');
        this.hotelId = this.constant.HotelId;
        console.log(this.hotelId);
        this.authForm = true;
    }
    FooterComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log(this.step);
        setTimeout(function () {
            if (_this.step) {
                if (_this.step == 'dashboard')
                    _this.active = 'dashboard';
                else if (_this.step == 'expense')
                    _this.active = 'expense';
                else if (_this.step == 'vendor')
                    _this.active = 'vendor';
                else if (_this.step == 'search') {
                    _this.active = 'search';
                }
                else if (_this.step == 'notification')
                    _this.active = 'notification';
            }
        }, 500);
    };
    FooterComponent.prototype.tab = function (data) {
        console.log(data);
        if (data == 'dashboard') {
            this.navCtrl.navigateRoot('/dashboard');
            this.active = 'dashboard';
        }
        else if (data == 'expense')
            //this.router.navigate(['/edit-profile',{userInfo:JSON.stringify(this.UserDetailsArry)}]);
            this.navCtrl.navigateRoot('/gmdashboard');
        else if (data == 'vendor') {
            // this.navCtrl.navigateRoot('/add-vendor');
            this.router.navigate(['/vendor-list', { type: 'vendorListPage' }]);
        }
        else if (data == 'search') {
            this.active = 'search';
            this.navCtrl.navigateRoot('/search');
        }
        else if (data == 'notification')
            this.navCtrl.navigateRoot('/notifications');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FooterComponent.prototype, "step", void 0);
    FooterComponent = __decorate([
        Component({
            selector: 'footer',
            templateUrl: 'footer.html'
        }),
        __metadata("design:paramtypes", [NavController, Router, Constant])
    ], FooterComponent);
    return FooterComponent;
}());
export { FooterComponent };
//# sourceMappingURL=footer.js.map