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
import { NavController, NavParams } from '@ionic/angular';
import { Constant } from '../../services/constant';
import { Market } from '@ionic-native/market/ngx';
var UpdateAppPage = /** @class */ (function () {
    function UpdateAppPage(navCtrl, navParams, constant, market) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.constant = constant;
        this.market = market;
        this.updateListArray = [];
        this.updateListArray = this.constant.VERSION_UPDATE_DATA;
    }
    UpdateAppPage.prototype.updateAppClick = function () {
        var self = this;
        if (this.updateListArray.forceUpdate) {
            self.market.open('com.gainbuzz.advertiser');
        }
    };
    UpdateAppPage = __decorate([
        Component({
            selector: 'page-update-app',
            templateUrl: 'update-app.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Constant, Market])
    ], UpdateAppPage);
    return UpdateAppPage;
}());
export { UpdateAppPage };
//# sourceMappingURL=update-app.js.map