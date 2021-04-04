import { ModuleShowNotificationComment2PageModule } from './module-show-notification-comment2/module-show-notification-comment2.module';
import { ModalFilteringPageModule } from '../models/modal-filtering/modal-filtering.module';
import { ModuleShowNotificationCommentPageModule } from '../models/module-show-notification-comment/module-show-notification-comment.module';

import { NetworkProviderService } from './../services/network-provider.service';
import { ModuleSignPagePageModule } from '../models/module-sign-page/module-sign-page.module';
import { ModuleImagePagePageModule } from '../models/module-image-page/module-image-page.module';
import { ManageTeamsEditDeleteComponent } from '../components/manage-teams-edit-delete/manage-teams-edit-delete.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy,NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//--------------------------------Service-----------------------------------//
import {Constant} from "../services/constant"
import {WebService} from "../services/webService";
import {webServicenew} from "../services/webServicenew";
import {WebServiceHandler} from "../services/webServiceHandler"

//Plugin
import { HttpModule } from '@angular/http';
import {HttpClientModule,HttpClient} from "@angular/common/http";
import { Network } from '@ionic-native/network/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Device } from '@ionic-native/device/ngx';
import {Camera} from "@ionic-native/camera/ngx";
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
//Helpers
import { NoInternetConnectionPage } from "../helper/no-internet-connection/no-internet-connection";
import { UpdateAppPage } from "../helper/update-app/update-app";
import { VendorComponent } from "../helper/vendor/vendor.component";

import { AuthGuard } from '../authguard/auth.guard';
import {ActivatedRoute, Router} from '@angular/router';
import { GetMediaHelper } from "../helper/get-media-helper/get-media-helper";
import { AddVendorPage } from  "../pages/add-vendor/add-vendor.page"


//Component
import {ComponentsModule} from "../components/components.module";
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NgCircleProgressModule } from 'ng-circle-progress';


import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';

import { AddVendorPageModule } from '../pages/add-vendor/add-vendor.module';
import { VendorListPageModule } from '../pages/vendor-list/vendor-list.module';
import { VendorListPage } from '../pages/vendor-list/vendor-list.page';
import {AddsignaturePageModule } from '../pages/addsignature/addsignature.module';
import { AddcategotyPageModule} from '../pages/addcategoty/addcategoty.module'
import { AddItemPageModule } from '../pages/add-item/add-item.module';
import { AddRoomPageModule } from '../pages/add-room/add-room.module';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { from } from 'rxjs';
import { CapitalExpenseCatPageModule } from '../models/capital-expense-cat/capital-expense-cat.module';
// import { CapitalExpenseCatPage } from '../models/capital-expense-cat/capital-expense-cat.page';
//Models
 
import { RelloacateAmountPage } from '../models/relloacate-amount/relloacate-amount.page';
// import { SurveyByPopupPage } from '../models/survey-by-popup/survey-by-popup.page';
// import {CapitalExpenseCatPage } from '../models/survey-by-popup/survey-by-popup.page';


import  { PromptMessageComponent} from '../components/prompt-message/prompt-message';



import { DatePicker } from '@ionic-native/date-picker/ngx';

import { SignaturePadModule } from 'angular2-signaturepad';
import { ViewProgressPageModule } from '../models/view-progress/view-progress.module';
import { ModulViewProgressNewPageModule } from 'src/models/modul-view-progress-new/modul-view-progress-new.module';
import { RelloacateAmountPageModule } from 'src/models/relloacate-amount/relloacate-amount.module';
import { ModuleNotificationPenddingPageModule } from 'src/models/module-notification-pendding/module-notification-pendding.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@NgModule({
  declarations: [
    AppComponent,
    NoInternetConnectionPage,
    UpdateAppPage,
    GetMediaHelper,
    VendorComponent,
    ManageTeamsEditDeleteComponent
    // CapitalExpenseCatPage,
    // RelloacateAmountPage,
    // SurveyByPopupPage,   
  ],

  entryComponents: 
  [
    NoInternetConnectionPage,
    UpdateAppPage,
    GetMediaHelper,
    AddVendorPage,
    VendorComponent,
    VendorListPage,
    PromptMessageComponent,
    ManageTeamsEditDeleteComponent
    // CapitalExpenseCatPage,
    // RelloacateAmountPage,
    // SurveyByPopupPage,  
  ],

  imports:
   [
     BrowserModule,
     HttpClientModule,
     HttpModule,
      IonicModule.forRoot(), AppRoutingModule, 
      ComponentsModule,
      ReactiveFormsModule,
      FormsModule ,
      AddVendorPageModule,
      VendorListPageModule,
      CapitalExpenseCatPageModule,
      ViewProgressPageModule,
      AddsignaturePageModule,
      AddcategotyPageModule,
      AddItemPageModule,
      AddRoomPageModule,
      ModuleSignPagePageModule,
      ModuleImagePagePageModule,
      RelloacateAmountPageModule,
      ModuleShowNotificationCommentPageModule,
      NgCircleProgressModule.forRoot(),
      SignaturePadModule,
      ModulViewProgressNewPageModule,
      ModalFilteringPageModule,
      ModuleNotificationPenddingPageModule,
      ModuleShowNotificationComment2PageModule
    ],

  providers: [
    StatusBar,
    SplashScreen,
    Constant, WebService, WebServiceHandler,AuthGuard,webServicenew,NetworkProviderService,
    Network,
    Market,Push,
    Device,Camera,File,FileTransfer,
    ScreenOrientation,
    WebView,
    FileChooser,
    FilePath,
    IOSFilePicker,
    DatePicker,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
