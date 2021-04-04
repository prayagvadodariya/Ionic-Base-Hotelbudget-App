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
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
import { Router } from '@angular/router';
var CapitalExpenseInnerPage = /** @class */ (function () {
    function CapitalExpenseInnerPage(activatedRoute, actionSheetController, service, constant, router, alertCtrl) {
        this.activatedRoute = activatedRoute;
        this.actionSheetController = actionSheetController;
        this.service = service;
        this.constant = constant;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.req = { hotelId: 0, month: "", toMonth: "", year: " ", userId: '' };
        this.getexpenseData = [];
        this.userData = this.constant.getUserData();
        console.log(this.userData.userId);
        this.hotelName = this.constant.hotelName;
    }
    CapitalExpenseInnerPage.prototype.ngOnInit = function () {
    };
    CapitalExpenseInnerPage.prototype.ionViewWillEnter = function () {
        this.getexpenseData = [];
        this.totalExpense = 0;
        console.log("ryteryery");
        if (this.activatedRoute.snapshot.paramMap.get('expense')) {
            this.params = JSON.parse(JSON.parse(JSON.stringify(this.activatedRoute.snapshot.paramMap.get('expense'))));
            console.log(this.params);
            this.req.hotelId = this.constant.HotelId;
            this.req.month = this.params.month;
            this.req.toMonth = this.params.toMonth;
            this.req.year = this.params.year;
            this.req.userId = this.userData.userId;
            this.getcapitalExpensehotelDetail();
        }
    };
    CapitalExpenseInnerPage.prototype.getcapitalExpensehotelDetail = function () {
        var _this = this;
        //this.constant.LoadingPresent();
        console.log(this.req);
        this.service.getCapitalHotelExpAPI(this.req).subscribe(function (result) {
            if (result.status) {
                var getexpenseData = result.data.expenseData;
                console.log(getexpenseData);
                var totalExpense = 0;
                if (getexpenseData.length > 0) {
                    for (var i = 0; i < getexpenseData.length; i++) {
                        totalExpense = totalExpense + parseFloat(getexpenseData[i].cost);
                    }
                    console.log(totalExpense);
                    _this.totalExpense = totalExpense.toFixed(2);
                    console.log(_this.totalExpense);
                    _this.getexpenseData = result.data.expenseData;
                }
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
            //this.constant.LoadingHide();
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    CapitalExpenseInnerPage.prototype.openActionSheet = function (exp) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            var _this = this;
            return __generator(this, function (_a) {
                console.log(exp);
                req = { capitalExpenseId: exp.capitalexpenseId, roleId: this.userData.roleId, userId: this.userData.userId };
                this.service.getCapitalExpDataAPI(req).subscribe(function (result) {
                    console.log(result);
                    if (result.status) {
                        _this.openActionFunction(exp);
                    }
                    else {
                        _this.constant.AlertCustom('Alert', result.data.message, 'Ok');
                    }
                    //this.constant.LoadingHide();
                }, function (error) {
                    _this.constant.Logout(error);
                });
                return [2 /*return*/];
            });
        });
    };
    CapitalExpenseInnerPage.prototype.addCapitalExpense = function () {
        this.router.navigate(['/addCapitalExpense']);
    };
    CapitalExpenseInnerPage.prototype.openActionFunction = function (exp) {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            // header: 'Albums',
                            buttons: [{
                                    text: 'Update Expense',
                                    role: '',
                                    icon: 'trash',
                                    handler: function () {
                                        _this.router.navigate(['/addCapitalExpense', { expUpdate: JSON.stringify(exp), expense: JSON.stringify(_this.params) }]);
                                    }
                                }, {
                                    text: 'Delete Expense',
                                    icon: 'trash',
                                    handler: function () {
                                        _this.expenceDelete(exp);
                                    }
                                }, {
                                    text: 'Invoice Progress',
                                    icon: 'eye',
                                    handler: function () {
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CapitalExpenseInnerPage.prototype.expenceDelete = function (exp) {
        return __awaiter(this, void 0, void 0, function () {
            var alertmes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Confirm',
                            // subHeader: 'Subtitle',
                            message: 'Are you sure want to delete this Expense?',
                            backdropDismiss: false,
                            buttons: [
                                {
                                    text: '',
                                    cssClass: 'icon-cancel',
                                    handler: function () {
                                        //this.navCtrl.navigateRoot('/dashboard');
                                    }
                                },
                                {
                                    text: 'Yes',
                                    cssClass: 'done-btn btnsize1',
                                    handler: function () {
                                        _this.expDelApiFunction(exp);
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
    CapitalExpenseInnerPage.prototype.expDelApiFunction = function (exp) {
        var _this = this;
        var dic = {};
        dic['hotelId'] = this.hotelData.hotelId;
        dic['userId'] = this.userData.userId;
        dic['capitalExpenseId'] = exp.capitalexpenseId;
        dic['roleId'] = this.userData.roleId;
        this.service.deleteCapitalExpAPI(dic).subscribe(function (result) {
            console.log(result);
            if (result.status) {
            }
            else {
                _this.constant.AlertCustom('Alert', result.data.message, 'Ok');
            }
            //this.constant.LoadingHide();
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    CapitalExpenseInnerPage.prototype.back = function () {
        this.router.navigate(['/capitalExpense', { params: JSON.stringify(this.params) }]);
    };
    CapitalExpenseInnerPage = __decorate([
        Component({
            selector: 'app-capital-expense-inner',
            templateUrl: './capital-expense-inner.page.html',
            styleUrls: ['./capital-expense-inner.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute, ActionSheetController, webServicenew, Constant, Router, AlertController])
    ], CapitalExpenseInnerPage);
    return CapitalExpenseInnerPage;
}());
export { CapitalExpenseInnerPage };
//# sourceMappingURL=capital-expense-inner.page.js.map