var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VendorListPage } from './vendor-list.page';
import { ComponentsModule } from "../../components/components.module";
//import { AddVendorPageModule } from '../add-vendor/add-vendor.module';
var routes = [
    {
        path: '',
        component: VendorListPage
    }
];
var VendorListPageModule = /** @class */ (function () {
    function VendorListPageModule() {
    }
    VendorListPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ComponentsModule,
                //AddVendorPageModule,
                RouterModule.forChild(routes)
            ],
            declarations: [VendorListPage]
        })
    ], VendorListPageModule);
    return VendorListPageModule;
}());
export { VendorListPageModule };
//# sourceMappingURL=vendor-list.module.js.map