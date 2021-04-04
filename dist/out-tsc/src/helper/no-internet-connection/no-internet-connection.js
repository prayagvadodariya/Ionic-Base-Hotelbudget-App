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
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Constant } from "../../services/constant";
var NoInternetConnectionPage = /** @class */ (function () {
    function NoInternetConnectionPage(navCtrl, navParams, network, constant, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.network = network;
        this.constant = constant;
        this.modalCtrl = modalCtrl;
    }
    NoInternetConnectionPage.prototype.ionViewDidLoad = function () {
        var self = this;
        var connectSubscription = this.network.onConnect().subscribe(function () {
            console.log('network connected!');
            self.modalCtrl.dismiss();
        });
    };
    NoInternetConnectionPage.prototype.TryAgainClick = function () {
        this.ionViewDidLoad();
        this.constant.ToastCustom('No internet connection found please try again.', 'top');
    };
    NoInternetConnectionPage = __decorate([
        Component({
            selector: 'page-no-internet-connection',
            templateUrl: 'no-internet-connection.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Network,
            Constant, ModalController])
    ], NoInternetConnectionPage);
    return NoInternetConnectionPage;
}());
export { NoInternetConnectionPage };
//# sourceMappingURL=no-internet-connection.js.map