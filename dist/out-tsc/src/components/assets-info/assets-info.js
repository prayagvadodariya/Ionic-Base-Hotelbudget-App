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
import { Constant } from "../../services/constant";
//import { AssetDetailEnhancementPage } from '../../pages/asset-detail-enhancement/asset-detail-enhancement';
import { NavController } from '@ionic/angular';
var AssetsInfoComponent = /** @class */ (function () {
    function AssetsInfoComponent(constant, navCtrl) {
        this.constant = constant;
        this.navCtrl = navCtrl;
        this.hearder = [];
        console.log('Hello AssetsInfoComponent Component');
        this.text = 'Hello World';
    }
    AssetsInfoComponent.prototype.opeenDetailsPage = function (id, index) {
        console.log("its works", id);
        console.log("assetArrayIndex==", index);
        // this.navCtrl.push(AssetDetailEnhancementPage, { params: id, assetArrayIndex: index });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AssetsInfoComponent.prototype, "hearder", void 0);
    AssetsInfoComponent = __decorate([
        Component({
            selector: 'assets-info',
            templateUrl: 'assets-info.html'
        }),
        __metadata("design:paramtypes", [Constant, NavController])
    ], AssetsInfoComponent);
    return AssetsInfoComponent;
}());
export { AssetsInfoComponent };
//# sourceMappingURL=assets-info.js.map