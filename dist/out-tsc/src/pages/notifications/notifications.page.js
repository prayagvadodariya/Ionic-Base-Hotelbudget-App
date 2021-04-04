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
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Constant } from "../../services/constant";
import { webServicenew } from '../../services/webServicenew';
var NotificationsPage = /** @class */ (function () {
    function NotificationsPage(alertCtrl, constant, service) {
        this.alertCtrl = alertCtrl;
        this.constant = constant;
        this.service = service;
        this.hideme = [];
        this.MQYsegment = 'pending';
        this.getNotificationList = [];
        this.infiniteScrollEnable = false;
        this.erroMsg = false;
        this.reqParameter = { notificationStatus: 1, userId: 1, page: 0, userRoleId: 1 };
    }
    NotificationsPage.prototype.ngOnInit = function () {
        this.getNotification();
    };
    NotificationsPage.prototype.getNotification = function () {
        var _this = this;
        console.log(this.reqParameter);
        this.constant.LoadingPresent();
        this.service.getNotificationListAPI(this.reqParameter).subscribe(function (result) {
            _this.constant.LoadingHide();
            console.log(result);
            if (result.data.status) {
                console.log(result);
                _this.notificationdata = result.data;
                var getNotificationList = result.data.notifications;
                for (var index = 0; index < getNotificationList.length; index++) {
                    _this.getNotificationList.push(getNotificationList[index]);
                }
                console.log(getNotificationList.length);
                console.log(_this.getNotificationList);
                if (getNotificationList.length < 20) {
                    _this.infiniteScrollEnable = false;
                }
                else {
                    _this.infiniteScrollEnable = true;
                }
                console.log(_this.infiniteScrollEnable);
            }
            else {
                _this.constant.ToastCustom(result.data.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    NotificationsPage.prototype.InfinitScrollingAPI = function (event) {
        var _this = this;
        console.log(event);
        if (this.getNotificationList.length > 0) {
            this.reqParameter.page += 10;
        }
        //this.getNotification();
        this.constant.LoadingPresent();
        this.service.getNotificationListAPI(this.reqParameter).subscribe(function (result) {
            _this.constant.LoadingHide();
            event.target.complete();
            console.log(result);
            if (result.data.status) {
                console.log(result);
                var getNotificationList = result.data.notifications;
                for (var index = 0; index < getNotificationList.length; index++) {
                    _this.getNotificationList.push(getNotificationList[index]);
                }
                console.log(getNotificationList.length);
                console.log(_this.getNotificationList);
                if (getNotificationList.length < 20) {
                    _this.infiniteScrollEnable = false;
                }
                else {
                    _this.infiniteScrollEnable = true;
                }
                console.log(_this.infiniteScrollEnable);
            }
            else {
                _this.constant.ToastCustom(result.data.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    NotificationsPage.prototype.segmentChanged = function () {
        console.log(this.MQYsegment);
        if (this.MQYsegment == 'pending') {
            this.getNotificationList = [];
            this.reqParameter.notificationStatus = 1;
            this.reqParameter.page = 0;
        }
        else if (this.MQYsegment == 'approved') {
            this.getNotificationList = [];
            this.reqParameter.notificationStatus = 2;
            this.reqParameter.page = 0;
        }
        else if (this.MQYsegment == 'rejected') {
            this.getNotificationList = [];
            this.reqParameter.notificationStatus = 3;
            this.reqParameter.page = 0;
        }
        this.getNotification();
    };
    NotificationsPage.prototype.acceptPendingAlert = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Pending Request?',
                                message: 'Are you sure you want to accept over expense request?',
                                cssClass: 'msg-reject',
                                // enableBackdropDismiss: false,
                                buttons: [
                                    {
                                        text: '',
                                        cssClass: 'icon-cancel',
                                        role: 'cancel',
                                        handler: function () {
                                            _this.backButtonAlertModel = null;
                                        }
                                    },
                                    {
                                        text: '',
                                        cssClass: 'icon-bk',
                                        handler: function () {
                                            var dic = { expenseId: 1, notificationId: data.notificationId, notificationStatus: data.notificationStatus, userId: 1 };
                                            _this.acceptPendingRequest(dic);
                                        }
                                    }
                                ],
                            })];
                    case 1:
                        _a.backButtonAlertModel = _b.sent();
                        this.backButtonAlertModel.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationsPage.prototype.acceptPendingRequest = function (dic) {
        var _this = this;
        this.constant.LoadingPresent();
        this.service.approveNotificationAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            console.log(result);
            if (result.data.status) {
                _this.constant.ToastCustom(result.data.message, 'top');
            }
            else {
                _this.constant.ToastCustom(result.data.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    //------------------------------Back Button Alert-----------------------------------//
    NotificationsPage.prototype.rejectRejectAlert = function (data, event) {
        return __awaiter(this, void 0, void 0, function () {
            var d, d, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(event);
                        if (this.erroMsg)
                            d = "Are you sure you want to reject over expense request?" + '<p class="error" *ngIf="erroMsg">Reject reason is required!</p>';
                        else
                            d = "Are you sure you want to reject over expense request?";
                        _a = this;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Reject Request?',
                                message: d,
                                cssClass: 'msg-reject',
                                backdropDismiss: false,
                                // enableBackdropDismiss: false,  
                                inputs: [
                                    {
                                        name: 'name',
                                        type: 'text',
                                        placeholder: 'Reason to Reject',
                                    },
                                ],
                                buttons: [
                                    {
                                        text: '',
                                        cssClass: 'icon-cancel',
                                        role: 'cancel',
                                        handler: function () {
                                            _this.backButtonAlertModel = null;
                                        }
                                    },
                                    {
                                        text: '',
                                        cssClass: 'icon-bk',
                                        handler: function (item) {
                                            console.log(item);
                                            console.log(event);
                                            // handler:_=> event(false)
                                            if (item.name == "" || item.name == null) {
                                                console.log(event);
                                                _this.backButtonAlertModel.onDidDismiss(false);
                                                return false;
                                                setTimeout(function () {
                                                    return this.erroMsg = true;
                                                }, 500);
                                            }
                                            else {
                                                var dic = { expenseId: 1, notificationId: data.notificationId, notificationStatus: data.notificationStatus, userId: 1, comment: item.name };
                                                _this.acceptPendingRequest(dic);
                                            }
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
    NotificationsPage = __decorate([
        Component({
            selector: 'app-notifications',
            templateUrl: './notifications.page.html',
            styleUrls: ['./notifications.page.scss'],
        }),
        __metadata("design:paramtypes", [AlertController, Constant, webServicenew])
    ], NotificationsPage);
    return NotificationsPage;
}());
export { NotificationsPage };
//# sourceMappingURL=notifications.page.js.map