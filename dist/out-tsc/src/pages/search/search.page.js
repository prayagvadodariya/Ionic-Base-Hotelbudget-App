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
import { Constant } from "../../services/constant";
import { webServicenew } from '../../services/webServicenew';
import { NavController, ModalController, } from '@ionic/angular';
import { VendorListPage } from '../vendor-list/vendor-list.page';
import { Router } from '@angular/router';
var SearchPage = /** @class */ (function () {
    function SearchPage(constant, navCtrl, service, modalCtrl, router) {
        this.constant = constant;
        this.navCtrl = navCtrl;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.router = router;
        this.fromDatevalue = false;
        this.todatevalue = false;
        this.dateflag = true;
        this.category = '';
        this.userData = [];
        this.getDepartmentList = [];
        this.GetCategoryList = [];
        this.req = { expenseAccountId: 0, vendor: '', fromDate: '', toDate: '', hotelId: 0, departmentId: 0, userId: 0 };
        this.userData = this.constant.getUserData();
        this.HotelName = this.constant.hotelName;
        console.log(this.userData);
        var currentYear = this.constant.currentYear();
        this.maxValue = currentYear + 1 + '-' + '12';
        this.req.userId = this.userData.userId;
        this.req.hotelId = this.constant.HotelId;
    }
    SearchPage.prototype.ngOnInit = function () {
        this.getDepartmentListClick();
    };
    SearchPage.prototype.getDepartmentListClick = function () {
        var _this = this;
        var dic = {
            hotel_id: this.constant.HotelId,
            userId: this.userData.userId
        };
        console.log(dic);
        this.constant.LoadingPresent();
        this.service.getDepartmentListAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                console.log(result);
                _this.getDepartmentList = result.data;
                console.log(_this.getDepartmentList);
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
                _this.constant.LogoutSession(result.status_key);
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    SearchPage.prototype.getCategoryList = function (event) {
        var _this = this;
        if (event.target.value) {
            this.category = '';
            var department_id = event.target.value;
            this.req.departmentId = department_id;
            var dic = { departmentId: department_id, hotelId: this.constant.HotelId, userId: this.userData.userId };
            console.log(dic);
            this.constant.LoadingPresent();
            this.service.getCategoryListAPI(dic).subscribe(function (result) {
                _this.constant.LoadingHide();
                if (result.status) {
                    console.log(result);
                    _this.GetCategoryList = result.data;
                    console.log(_this.GetCategoryList);
                }
                else {
                    _this.constant.ToastCustom(result.message, 'top');
                    _this.constant.LogoutSession(result.status_key);
                }
            }, function (error) {
                _this.constant.Logout(error);
            });
        }
    };
    SearchPage.prototype.checkConfirmExpense = function (event) {
        this.req.expenseAccountId = event.target.value;
    };
    SearchPage.prototype.selectVendorModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: VendorListPage,
                            componentProps: {
                                type: 'vendorListModel'
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (detail) {
                            if (detail) {
                                if (detail.data) {
                                    console.log(detail);
                                    console.log('The result:', detail.data.vendorCompany);
                                    _this.vendor = detail.data.vendorCompany;
                                    _this.req.vendor = _this.vendor;
                                    console.log(_this.req.vendor);
                                }
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchPage.prototype.searchClick = function () {
        this.fromDatevalue = false;
        this.todatevalue = false;
        if (!this.fromDate) {
            this.fromDatevalue = true;
        }
        else if (!this.toDate) {
            this.todatevalue = true;
        }
        else if (this.dateflag) {
            this.req.fromDate = this.fromDate;
            this.req.toDate = this.toDate;
            // this.constant.LoadingPresent();
            console.log(this.req);
            this.router.navigate(['/SearchList', { serachParam: JSON.stringify(this.req) }]);
        }
    };
    SearchPage.prototype.fromDateClick = function (fromDate, data) {
        console.log(fromDate);
        console.log(this.fromDate);
        console.log(this.toDate);
        this.dateflag = true;
        if (data === 'fromDate') {
            this.req.fromDate = fromDate;
            this.fromDatevalue = false;
        }
        if (data === 'toDate') {
            this.todatevalue = false;
            this.req.toDate = fromDate;
        }
        if (this.fromDate > this.toDate) {
            this.dateflag = false;
            console.log(this.dateflag);
        }
        console.log(this.dateflag);
    };
    SearchPage = __decorate([
        Component({
            selector: 'app-search',
            templateUrl: './search.page.html',
            styleUrls: ['./search.page.scss'],
        }),
        __metadata("design:paramtypes", [Constant, NavController, webServicenew, ModalController, Router])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.page.js.map