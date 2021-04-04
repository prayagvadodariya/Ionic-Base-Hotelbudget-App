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
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from "@angular/forms";
var VendorComponent = /** @class */ (function () {
    function VendorComponent(modelCtrl, fb) {
        this.modelCtrl = modelCtrl;
        this.fb = fb;
        this.FormValtion();
    }
    VendorComponent.prototype.FormValtion = function () {
        this.vendorForm = this.fb.group({
            vnd_name: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]'), Validators.required])],
        });
    };
    VendorComponent.prototype.ngOnInit = function () { };
    VendorComponent.prototype.demo = function () {
        this.modelCtrl.dismiss();
    };
    VendorComponent = __decorate([
        Component({
            selector: 'app-vendor',
            templateUrl: './vendor.component.html',
            styleUrls: ['./vendor.component.scss'],
        }),
        __metadata("design:paramtypes", [ModalController, FormBuilder])
    ], VendorComponent);
    return VendorComponent;
}());
export { VendorComponent };
//# sourceMappingURL=vendor.component.js.map