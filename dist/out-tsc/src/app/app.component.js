var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ViewChildren, QueryList } from '@angular/core';
import { Platform, AlertController, ModalController, NavController, MenuController, Events, IonRouterOutlet } from '@ionic/angular';
// import { ViewController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Push } from '@ionic-native/push/ngx';
//Services
import { Constant } from "../services/constant";
import { webServicenew } from "../services/webServicenew";
//Helpers
import { NoInternetConnectionPage } from "../helper/no-internet-connection/no-internet-connection";
import { Router } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, alertCtrl, network, constant, modalCtrl, router, service, navCtrl, menu, screenOrientation, events, push) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.constant = constant;
        this.modalCtrl = modalCtrl;
        this.router = router;
        this.service = service;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.screenOrientation = screenOrientation;
        this.events = events;
        this.push = push;
        this.lastTimeBackPress = 0;
        this.timePeriodToExit = 2000;
        this.budgetSegment = true;
        this.scrollclass = false;
        this.userdata = [];
        this.activeSegment = "budgetModule";
        this.pages = [
            { title: 'Dashboard', url: '/dashboard', icon: 'icon-dashboard', class: "icon-dashboard" },
            // { title: 'Login', url: '/login', icon: 'home' },
            { title: 'Pm Survey Dashboard', url: '/pm-survey-dashboard', icon: 'home' },
            // { title: 'forgotpassword', url: '/forgotpassword', icon: 'home' },
            // { title: 'Settings', url: '/settings', icon: 'home' },
            { title: 'GM Dashboard', url: '/gmdashboard', icon: 'home' },
            { title: 'Expense Categories', url: '/expenseCategories', icon: 'home' },
            { title: 'Expense List', url: '/show-expense', icon: 'home' },
            { title: 'Add Expense', url: '/add-expense', icon: 'home' },
            { title: 'Add vendor', url: '/add-vendor', icon: 'home' },
            //{ title: 'vendor list', url: '/vendor-list', icon: 'home' },
            // { title: 'Update Vendor', url: '/update-vendor', icon: 'home' },
            { title: 'Update Forecast', url: '/update-forecast', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'Search', url: '/search', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'Search Inner', url: '/Search_inner', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'Department', url: '/Department', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'Update Expense', url: '/update-expense', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'capitalExpense', url: '/capitalExpense', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'capital-expense-inner', url: '/CapitalExpenseInner', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'add-capital-expense', url: '/add-capital-expense', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'export-invoices', url: '/export-invoices', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'Exported Invoice List', url: '/export-invoice-inner', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'Change Password', url: '/change-password', icon: 'icon-dashboard', class: "icon-dashboard" },
            //  { title: 'edit-profile', url: '/edit-profile', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'profile', url: '/profile', icon: 'icon-dashboard', class: "icon-dashboard" },
            // { title: 'search-invoices', url: '/search-invoices', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'search-invoices-results', url: '/search-invoices-results', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'invoice-progress', url: '/invoice-progress', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'notifications', url: '/notifications', icon: 'icon-dashboard', class: "icon-dashboard" },
            { title: 'View PM Survey', url: '/view-pm-survey', icon: 'icon-dashboard', class: "icon-dashboard" }
        ];
        // public PMPageslist = [
        //   { title: 'Dashboard', icon: 'home', sub: [{ subtitle: "dash" }] },
        //   { title: 'login', url: '/login', icon: 'home' },
        //   // { title: 'pm-survey-dashboard', url: '/pm-survey-dashboard', icon: 'home' },
        //   // { title: 'forgotpassword', url: '/forgotpassword', icon: '' },
        //   //  { path: '', redirectTo: '/tabs/(tab1:tab1)', pathMatch: 'full' }
        // ];
        this.PMPageslist = [
            {
                title: 'Budget Dashboard',
                url: '/dashboard',
                icon: 'home'
            },
            {
                title: ' PM Dashboard',
                children: [
                    {
                        title: 'Ionic',
                        url: '/change-password',
                        icon: 'logo-ionic'
                    },
                    {
                        title: 'Flutter',
                        url: '/change-password',
                        icon: 'logo-google'
                    },
                ]
            }
        ];
        console.log(this.constant.APP_VERSION);
        this.getDataFilterClick();
        this.checkEventSubcribe();
        //this.PushNotificationInit();
        platform.ready().then(function () {
            localStorage.removeItem("isNotificationAlert");
            _this.statusBar.styleDefault();
            _this.statusBar.overlaysWebView(false);
            _this.screenOrientationClick();
            // back button event handle
            _this.platform.backButton.subscribe(function () {
                _this.backButtonEvent();
            });
            _this.CheckInternetConnection();
            setTimeout(function () {
                _this.CheckLoginSession();
            }, 500);
            // this.GetAppVersion();
            splashScreen.hide();
        });
    }
    //------------------------------Screen Orientation-----------------------------------//
    AppComponent.prototype.screenOrientationClick = function () {
        var _this = this;
        console.log(this.screenOrientation.type);
        if (this.screenOrientation.type == 'landscape-primary') {
            this.scrollclass = true;
            console.log(this.scrollclass);
        }
        else {
            this.scrollclass = false;
        }
        // if(this.device.platform)
        // {
        //   console.log("platformmmm");
        //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        // }
        this.screenOrientation.onChange().subscribe(function () {
            console.log(_this.screenOrientation.type);
            console.log("Orientation Changed");
            if (_this.screenOrientation.type == 'landscape-primary') {
                _this.scrollclass = true;
                console.log(_this.scrollclass);
            }
            else {
                _this.scrollclass = false;
            }
        });
    };
    AppComponent.prototype.getDataFilterClick = function () {
        var _this = this;
        // DateFilterApi
        this.service.DateFilterApi().subscribe(function (result) {
            console.log(result);
            if (result.status) {
                _this.constant.dateFilterData = result.data;
                console.log(_this.constant.dateFilterData);
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
                _this.constant.LogoutSession(result.status_key);
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    //------------------------------Event Subcribe-----------------------------------//
    AppComponent.prototype.checkEventSubcribe = function () {
        var _this = this;
        this.events.subscribe('userloggedin', function (data) {
            if (data) {
                console.log(data);
                _this.userdata = data.data;
                console.log(_this.userdata);
                // this.userName = this.userdata.v_full_name;
                // if (this.userdata.v_profile_image) {
                //   this.Profile = data.image.profile_image_url + this.userdata.v_profile_image;
                // }
                // else {
                //   this.Profile = 'assets/icon/default-thumb.svg';//this.constant.getFirstLastCharacter(this.userdata.v_full_name);
                // }
            }
        });
    };
    //------------------------------Internet Connection-----------------------------------//
    AppComponent.prototype.CheckInternetConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            var _this = this;
            return __generator(this, function (_a) {
                self = this;
                this.network.onDisconnect().subscribe(function () {
                    console.log('network was disconnected :-(');
                    if (!_this.constant.isNetworkAvailablePage) {
                        self.presentPaiementModal();
                    }
                });
                if (this.platform.is('cordova')) {
                    if (this.network.type === 'wifi' || this.network.type === 'ethernet' || this.network.type === '4g' || this.network.type === 'cellular') {
                        console.log("Network error");
                    }
                    else {
                        if (!self.constant.isNetworkAvailablePage) {
                            self.presentPaiementModal();
                        }
                    }
                }
                else {
                    console.log('cordova not available');
                }
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.presentPaiementModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var profileModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: NoInternetConnectionPage })];
                    case 1:
                        profileModal = _a.sent();
                        this.constant.isNetworkAvailablePage = true;
                        return [4 /*yield*/, profileModal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //------------------------------Back Button Alert-----------------------------------//
    AppComponent.prototype.backButtonAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Exit?',
                                message: 'Do you want to exit the app?',
                                backdropDismiss: false,
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: function () {
                                            _this.backButtonAlertModel = null;
                                        }
                                    },
                                    {
                                        text: 'Exit',
                                        handler: function () {
                                            navigator['app'].exitApp();
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        _a.backButtonAlertModel = _b.sent();
                        this.backButtonAlertModel.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    //------------------------------Back Button -----------------------------------//
    AppComponent.prototype.backButtonEvent = function () {
        var _this = this;
        this.platform.backButton.subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.routerOutlets.forEach(function (outlet) {
                    console.log("204==" + _this.router.url);
                    console.log(outlet.canGoBack());
                    console.log(outlet);
                    if (outlet && outlet.canGoBack()) {
                        outlet.pop();
                    }
                    else if (_this.router.url === '/login') {
                        if (new Date().getTime() - _this.lastTimeBackPress < _this.timePeriodToExit) {
                            navigator['app'].exitApp(); // work for ionic 4
                        }
                        else {
                            console.log("elseee");
                            _this.backButtonAlert();
                        }
                    }
                    else {
                        _this.backButtonAlert();
                    }
                });
                return [2 /*return*/];
            });
        }); });
    };
    //------------------------------App Version-----------------------------------//
    // GetAppVersion() {
    //   var dic = {};
    //   dic['v_version'] = parseFloat(this.constant.APP_VERSION);
    //   dic['ti_os'] = this.constant.SetplatForm();
    //   console.log(dic);
    //   this.service.getAppVersion(dic).subscribe((result) => {
    //     console.log(result);
    //     if (result.status) {
    //       if (result.data.appVersion != this.constant.APP_VERSION) {
    //         if (result.data.forceUpdate) {
    //           this.constant.VERSION_UPDATE_DATA = result.data;
    //           console.log(this.constant.VERSION_UPDATE_DATA);
    //           this.rootPage = UpdateAppPage;
    //         } else {
    //           this.CheckLoginSession();
    //         }
    //       } else {
    //         this.CheckLoginSession();
    //       }
    //     } else {
    //       this.CheckLoginSession();
    //     }
    //   }, (error) => {
    //     this.constant.Logout(error);
    //   });
    // }
    //------------------------------Login Session-----------------------------------//
    AppComponent.prototype.CheckLoginSession = function () {
        var _this = this;
        console.log((localStorage.getItem("userData")));
        if (JSON.parse(localStorage.getItem("userData")) == null || JSON.parse(localStorage.getItem("userData")) == "") {
            this.navCtrl.navigateRoot('/login');
            this.menu.enable(false);
        }
        // else if (localStorage.getItem("isAppLaunchFirstTime") == null) {
        // } 
        else {
            this.navCtrl.navigateRoot('/dashboard');
            this.userdata = JSON.parse(localStorage.getItem("userData"));
            this.menu.enable(true);
        }
        this.events.subscribe('LogoutSession', function (data) {
            if (data) {
                // localStorage.setItem('introShow', 'true');
                localStorage.removeItem('v_access_token');
                localStorage.removeItem('userData');
                localStorage.removeItem('setting');
                localStorage.removeItem('isNotificationAlert');
                localStorage.removeItem('HotelList');
                _this.navCtrl.navigateRoot('/login');
            }
        });
    };
    //------------------------------Logout-----------------------------------//
    AppComponent.prototype.onLogout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alertmes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Sign Out',
                            // subHeader: 'Subtitle',
                            message: 'Are you sure want to sign out?',
                            backdropDismiss: false,
                            buttons: [
                                {
                                    text: '',
                                    // role: 'cancel',
                                    cssClass: 'icon-cancel',
                                    handler: function () {
                                        //this.navCtrl.navigateRoot('/dashboard');
                                    }
                                },
                                {
                                    text: 'Ok',
                                    cssClass: 'done-btn btnsize1',
                                    handler: function () {
                                        _this.onLogoutApiFunction();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alertmes = _a.sent();
                        return [4 /*yield*/, alertmes.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppComponent.prototype.onLogoutApiFunction = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem("userData"));
        var dic = {};
        dic["userLogId"] = userData.userLogId;
        dic["userId"] = userData.userId;
        this.constant.LoadingPresent();
        console.log(dic);
        this.service.onLogoutApi(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                _this.constant.ToastCustom(result.message, 'top');
                if (JSON.parse(localStorage.getItem("rememberChecked"))) {
                    localStorage.removeItem("userData");
                    localStorage.removeItem("setting");
                    localStorage.removeItem("v_access_token");
                }
                else
                    localStorage.clear();
                _this.menu.enable(false);
                _this.navCtrl.navigateRoot('/login');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    AppComponent.prototype.budgetSegmentClick = function (event) {
        console.log(event);
        this.budgetSegment = true;
    };
    AppComponent.prototype.pMSegmentClick = function () {
        this.budgetSegment = false;
    };
    AppComponent.prototype.openTab = function (data) {
        if (data.url) {
            this.M3flag = false;
        }
        else {
            this.M3flag = true;
        }
    };
    AppComponent.prototype.settingClick = function () {
        this.router.navigate(['/profile']);
        if (this.router.navigate(['/profile']))
            this.menu.enable(false);
    };
    /**
   * Push Notification code
   */
    AppComponent.prototype.PushNotificationInit = function () {
        var _this = this;
        //alert('PushNotificationInit');
        // Permission
        this.push.hasPermission().then(function (res) {
            //alert('iff');  
            //alert(JSON.stringify(res));  
            if (res.isEnabled) {
                console.log('We have permission to send push notifications');
            }
            else {
                console.log('We do not have permission to send push notifications');
            }
        });
        // init push
        var options = {
            android: {
                senderID: '1030069665506',
                clearBadge: false,
                clearNotifications: false,
            },
            ios: {
                alert: true,
                badge: false,
                sound: true,
                clearBadge: false,
                categories: {
                    "invite": {
                        "yes": { "callback": "notification", "title": "POST", "foreground": true, "destructive": false },
                        "no": { "callback": "apps.dismiss", "title": "DISMISS", "foreground": false, "destructive": false },
                    }
                }
            },
            windows: {}
        };
        // Recieve notification
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (data) {
            window.localStorage.setItem('notistatus', 'true');
            // let alert = this.alertCtrl.create({
            //   title:'Notification'+'  '+ data.title,
            //   subTitle: data.message,
            //   buttons: ['Ok']
            // });
            // alert.present();
            _this.AlertCustom(data.title, data.message, 'Top');
        });
        // Get Device Token
        pushObject.on('registration').subscribe(function (registration) {
            alert('DeviceID=>' + registration.registrationId);
            console.log('DeviceID=>' + JSON.stringify(registration.registrationId));
            localStorage.setItem('DeviceID', registration.registrationId);
            //this.convensionPushNotification(registration.registrationId);
        });
        pushObject.on('error').subscribe(function (error) {
            alert('Error with Push plugin' + error);
        });
    };
    AppComponent.prototype.AlertCustom = function (Titles, Message, BtnTitle) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Alert',
                            subHeader: 'Subtitle',
                            message: 'This is an alert message.',
                            backdropDismiss: false,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        ViewChildren(IonRouterOutlet),
        __metadata("design:type", QueryList)
    ], AppComponent.prototype, "routerOutlets", void 0);
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        __metadata("design:paramtypes", [Platform, SplashScreen, StatusBar, AlertController,
            Network, Constant, ModalController, Router,
            webServicenew, NavController, MenuController, ScreenOrientation, Events, Push])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map