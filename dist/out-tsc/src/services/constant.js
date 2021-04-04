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
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController, Events, Platform } from '@ionic/angular';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device/ngx';
//import { WebService } from '../services/webService';
var Constant = /** @class */ (function () {
    function Constant(loadCtrl, toastCtrl, alertController, http, Event, Platform, device) {
        this.loadCtrl = loadCtrl;
        this.toastCtrl = toastCtrl;
        this.alertController = alertController;
        this.http = http;
        this.Event = Event;
        this.Platform = Platform;
        this.device = device;
        this.APP_VERSION = '1';
        //BASE_URL ='http://54.201.33.139/IBA_API/';
        //BASE_URL ='http://staging.ancubate.com/hotel-budget-services/api/';
        this.BASE_URL = 'http://54.213.26.62/api/';
        // BASE_URL_NEW='https://www.hotelbudget.us/testing/api/';
        this.BASE_URL_NEW = 'http://192.168.0.36/hotel_budget_api/api/';
        this.locationget = [];
        this.locationArr = [];
        this.dateFilterData = [];
        this.isNetworkAvailablePage = false;
        this.getDepartmentList = [];
        this.CurrentViewActive = '';
        this.SliderResponceArry = [];
        this.APPLICATION_PLATFORM = 'android';
        this.APPLICATION_VERSION = '1.0.0';
        this.RoomArrySelection = [];
        this.DEVICE_TOKEN = '';
        this.CurrentActivePage = '';
        this.year = '';
        this.month = '';
        this.toMonth = '';
        this.HotelId = 0;
        this.hotelName = '';
        this.MonthObj = function () {
            var MonthObj = [
                { id: "Jan", value: "January" }, { id: "Feb", value: "February" }, { id: "Mar", value: "March" }, { id: "Apr", value: "April" }, { id: "May", value: "May" }, { id: "Jun", value: "June" },
                { id: "Jul", value: "July" }, { id: "Aug", value: "August" }, { id: "Sep", value: "September" }, { id: "Oct", value: "October" }, { id: "Nov", value: "November" }, { id: "Dec", value: "December" },
            ];
            return MonthObj;
        };
        this.Quater = function () {
            var quarters = [{ id: "Q1", value: "Q1" }, { id: "Q2", value: "Q2" }, { id: "Q3", value: "Q3" }, { id: "Q4", value: "Q4" }];
            return quarters;
        };
        this.MonthName = function () {
            var monthNames = [
                "Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct",
                "Nov", "Dec"
            ];
            return monthNames;
        };
        this.yearList = function () {
            var dateObj = new Date();
            var newdate = new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth());
            var year = newdate.getFullYear();
            var yearObj = [];
            for (var i = year - 2; i < year + 3; i++) {
                yearObj.push({ 'id': i, 'value': i });
            }
            return yearObj;
        };
    }
    //Alert
    // async AlertCustom(Titles, Message){
    //     const alert = await this.alertController.create({
    //         header: 'Alert',
    //         subHeader: Titles,
    //         message: Message,
    //         buttons: ['OK']
    //         });
    //         return await alert.present();
    // }
    Constant.prototype.AlertCustom = function (Titles, Message, BtnTitle) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: Titles,
                            //subHeader: 'Subtitle',
                            message: Message,
                            buttons: [BtnTitle]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Toast Message
    Constant.prototype.ToastCustom = function (message, positions) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: message,
                            duration: 3000,
                            showCloseButton: false,
                            position: positions,
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Loading
    Constant.prototype.LoadingPresent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadCtrl.create({
                            //  message: loadmsg
                            })];
                    case 1:
                        _a.loader = _b.sent();
                        return [4 /*yield*/, this.loader.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Constant.prototype.LoadingHide = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadCtrl.dismiss()];
                    case 1:
                        _a.loader = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Logout
    Constant.prototype.Logout = function (error) {
        this.LoadingHide();
        console.log(error);
        if (error._body) {
            var responceData = JSON.parse(error._body);
            console.log(responceData);
            console.log(responceData.responce);
            if (responceData.response == 'Unvalid token.') {
                this.Event.publish('Logout');
            }
        }
    };
    Constant.prototype.SetplatForm = function () {
        if (this.Platform.is('android')) {
            return 1;
        }
        else if (this.Platform.is('ios')) {
            return 2;
        }
        else {
            return 0;
            console.log("i am not exits");
        }
    };
    Constant.prototype.SetplatFormName = function () {
        if (this.Platform.is('android')) {
            return 'android';
        }
        else if (this.Platform.is('ios')) {
            return 'ios';
        }
        else {
            return 0;
            console.log("i am not exits");
        }
    };
    // Get current User data
    Constant.prototype.getUserData = function () {
        var data = JSON.parse(localStorage.getItem('userData'));
        if (data) {
            return data;
        }
        else {
            return null;
        }
    };
    //
    Constant.prototype.getHotelData = function () {
        var data = JSON.parse(localStorage.getItem('hotelId'));
        if (data) {
            return data;
        }
        else {
            return null;
        }
    };
    Constant.prototype.getDeviceId = function () {
        console.log(this.device);
        if (this.device.uuid) {
            console.log(this.device.uuid);
            return this.device.uuid;
        }
        else {
            var uuid = 123456;
            return uuid;
        }
    };
    //Session Expired
    Constant.prototype.LogoutSession = function (status) {
        console.log(status);
        if (status == 'session_expired') {
            this.Event.publish('LogoutSession', { data: 'session_expired' });
        }
    };
    // InternetConnectionAlert(){
    //     this.CurrentViewActive = 'Internat Error.'
    //     var alert:any;
    //     alert = this.alertCtrl.create({
    //         title: 'Internet Connection',
    //         message: 'Please check your internet connection and try again.' ,
    //         buttons: [
    //         {
    //             text: 'Try Again',
    //             handler: (TeamMemberID) => {
    //             }
    //         }
    //         ]
    //     });
    //     alert.present();
    // }
    // CheckInternetConnection(){
    //     this.LoadingPresent();
    //     var URL = this.BASE_URL + 'api/user/VerifyForgotPasswordOTP?emailAddress=' + 'email' + '&otpCode=' + '';
    //      this.http.get(URL).map(data => {
    //         console.log(data);
    //         this.LoadingHide();
    //         data.json();
    //     }, error => {
    //         this.LoadingHide();
    //         if (error.error.status == 0) {
    //             this.InternetConnectionAlert();
    //         }
    //     });
    // }
    // Mobile Validation
    Constant.prototype.isValidMobile = function (mobile) {
        var regExp = /^[0-9]{10}$/;
        if (!regExp.test(mobile)) {
            return false;
        }
        return true;
    };
    //Fax Number Validation
    Constant.prototype.isValidFax = function (fax) {
        var re = /^\+[0-9]{1,1}-?[0-9]{3}-?[0-9]{7,7}$/;
        if (re.test(fax)) {
            return true;
        }
        else {
            return false;
        }
    };
    Constant.prototype.isValidEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            return false;
        }
        else {
            return true;
        }
    };
    Constant.prototype.currentYear = function () {
        var dateObj = new Date();
        var newdate = new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth());
        var year = newdate.getFullYear();
        return year;
    };
    Constant.prototype.dateFormat = function (d) {
        console.log(d);
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dateObj = new Date(d);
        var day = dateObj.getDate();
        var monthIndex = dateObj.getMonth();
        var year = dateObj.getFullYear();
        var a = monthNames[monthIndex] + ' ' + day + ',' + year;
        console.log(a);
        return a;
    };
    Constant.prototype.quaterFormat = function (quarterModel) {
        var month;
        var toMonth;
        if (quarterModel === "Q1") {
            month = "1";
            toMonth = "3";
            var res = { month: month, toMonth: toMonth };
            return res;
        }
        else if (quarterModel === "Q2") {
            month = "4";
            toMonth = "6";
            var res = { month: month, toMonth: toMonth };
            return res;
        }
        else if (quarterModel === "Q3") {
            month = "7";
            toMonth = "9";
            var res = { month: month, toMonth: toMonth };
            return res;
        }
        else if (quarterModel === "Q4") {
            month = "10";
            toMonth = "12";
            var res = { month: month, toMonth: toMonth };
            return res;
        }
    };
    Constant = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LoadingController, ToastController, AlertController, Http,
            Events, Platform, Device])
    ], Constant);
    return Constant;
}());
export { Constant };
//# sourceMappingURL=constant.js.map