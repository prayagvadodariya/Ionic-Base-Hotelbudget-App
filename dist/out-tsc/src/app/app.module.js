var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//--------------------------------Service-----------------------------------//
import { Constant } from "../services/constant";
import { WebService } from "../services/webService";
import { webServicenew } from "../services/webServicenew";
import { WebServiceHandler } from "../services/webServiceHandler";
//Plugin
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { Network } from '@ionic-native/network/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Camera } from "@ionic-native/camera/ngx";
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Push } from '@ionic-native/push/ngx';
//Helpers
import { NoInternetConnectionPage } from "../helper/no-internet-connection/no-internet-connection";
import { UpdateAppPage } from "../helper/update-app/update-app";
import { VendorComponent } from "../helper/vendor/vendor.component";
import { AuthGuard } from '../authguard/auth.guard';
import { GetMediaHelper } from "../helper/get-media-helper/get-media-helper";
import { AddVendorPage } from "../pages/add-vendor/add-vendor.page";
//Component
import { ComponentsModule } from "../components/components.module";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddVendorPageModule } from '../pages/add-vendor/add-vendor.module';
import { VendorListPageModule } from '../pages/vendor-list/vendor-list.module';
import { VendorListPage } from '../pages/vendor-list/vendor-list.page';
//Models
import { CapitalExpenseCatPage } from '../models/capital-expense-cat/capital-expense-cat.page';
import { RelloacateAmountPage } from '../models/relloacate-amount/relloacate-amount.page';
import { SurveyByPopupPage } from '../models/survey-by-popup/survey-by-popup.page';
import { PromptMessageComponent } from '../components/prompt-message/prompt-message';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [AppComponent, NoInternetConnectionPage, UpdateAppPage, GetMediaHelper, CapitalExpenseCatPage, VendorComponent, RelloacateAmountPage, SurveyByPopupPage],
            entryComponents: [NoInternetConnectionPage, UpdateAppPage, GetMediaHelper, AddVendorPage, VendorComponent,
                CapitalExpenseCatPage, VendorListPage, RelloacateAmountPage, PromptMessageComponent, SurveyByPopupPage],
            imports: [
                BrowserModule,
                HttpClientModule,
                HttpModule,
                IonicModule.forRoot(), AppRoutingModule,
                ComponentsModule,
                ReactiveFormsModule,
                FormsModule,
                AddVendorPageModule,
                VendorListPageModule,
                NgCircleProgressModule.forRoot()
            ],
            providers: [
                StatusBar,
                SplashScreen,
                Constant, WebService, WebServiceHandler, AuthGuard, webServicenew,
                Network,
                Market, Push,
                Device, Camera, File, FileTransfer,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map