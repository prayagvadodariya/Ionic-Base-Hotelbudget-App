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
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CapitalExpenseCatPage } from '../../models/capital-expense-cat/capital-expense-cat.page';
import { VendorListPage } from '../vendor-list/vendor-list.page';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
var AddCapitalExpensePage = /** @class */ (function () {
    //expense: { cap_date: any, cap_invoice: any, cap_vendor: any, cap_cost: any, cap_category: any, cap_description: any } ;
    function AddCapitalExpensePage(alertCtrl, fb, router, modelCtrl, constant, service, activatedRoute, navCtrl) {
        this.alertCtrl = alertCtrl;
        this.fb = fb;
        this.router = router;
        this.modelCtrl = modelCtrl;
        this.constant = constant;
        this.service = service;
        this.activatedRoute = activatedRoute;
        this.navCtrl = navCtrl;
        this.isCheckEmptyField = false;
        this.getExpenseList = [];
        this.userData = [];
        this.expense = [];
        this.userData = this.constant.getUserData();
        this.HotelName = this.constant.hotelName;
        // if (this.activatedRoute.snapshot.paramMap.get('hotelData')) {
        //   this.hotelData = JSON.parse(this.activatedRoute.snapshot.paramMap.get('hotelData'));
        //   console.log(this.hotelData);
        if (this.activatedRoute.snapshot.paramMap.get('expUpdate')) {
            this.expense = JSON.parse(this.activatedRoute.snapshot.paramMap.get('expUpdate'));
            console.log(this.expense);
            if (this.activatedRoute.snapshot.paramMap.get('expense')) {
                this.params = JSON.parse(this.activatedRoute.snapshot.paramMap.get('expense'));
                console.log(this.params);
            }
        }
        // }
    }
    AddCapitalExpensePage.prototype.ngOnInit = function () {
        this.FormValtion();
        this.getCapitalExpenseAccount();
        // this.getEditCapitalExpense();
    };
    //---------------------------- Validation Function -------------------------------------------------//
    AddCapitalExpensePage.prototype.FormValtion = function () {
        this.ExpenseForm = this.fb.group({
            date: ['', Validators.compose([Validators.required])],
            invoiceNo: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(15), Validators.required])],
            vendor: ['', Validators.compose([Validators.required])],
            capitalExpenseAccountId: ['', Validators.compose([Validators.required])],
            cost: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
        });
    };
    //------------------------------Get CapitalExpense Account List-----------------------------------//
    AddCapitalExpensePage.prototype.getCapitalExpenseAccount = function () {
        var _this = this;
        var dic = { hotelId: this.constant.HotelId, userId: this.userData.userId };
        // this.constant.LoadingPresent();
        this.service.getCapitalExpenseAccountListAPI(dic).subscribe(function (result) {
            // this.constant.LoadingHide();
            if (result.status) {
                _this.getExpenseList = result.data.expenseAccountData;
                console.log(_this.getExpenseList);
                // this.constant.ToastCustom(result.message, 'top');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    //--------------------------------------Add CapitalExpense-------------------------------------//
    AddCapitalExpensePage.prototype.capitalExpenseAddClick = function () {
        var _this = this;
        console.log(this.ExpenseForm);
        if (this.ExpenseForm.valid) {
            var dic = {};
            dic['createdByUserId'] = this.userData.userId;
            dic['date'] = this.ExpenseForm.value.date;
            dic['capitalExpenseAccountId'] = this.ExpenseForm.value.capitalExpenseAccountId;
            dic['userId'] = this.userData.userId;
            dic['hotelId'] = this.constant.HotelId;
            dic['vendorId'] = this.vendorId;
            dic['invoiceNo'] = this.ExpenseForm.value.invoiceNo;
            dic['cost'] = this.ExpenseForm.value.cost;
            dic['description'] = this.ExpenseForm.value.description;
            console.log(dic);
            this.constant.LoadingPresent();
            this.service.AddCapitalExpenseAPI(dic).subscribe(function (result) {
                _this.constant.LoadingHide();
                if (result.status) {
                    console.log(result);
                    _this.constant.ToastCustom(result.data.message, 'top');
                }
                else {
                    _this.constant.ToastCustom(result.message, 'top');
                }
            }, function (error) {
                _this.constant.Logout(error);
            });
        }
        else {
            this.constant.ToastCustom('Please All * Fields are Required', 'top');
        }
        // var self = this;
        // this.isCheckEmptyField = true;
        // if (this.expenseSubmitClick()) {
        //   console.log(this.expenseSubmitClick());
        //   var dic = {};
    };
    //------------------------------Vendor Model Open-----------------------------------//
    AddCapitalExpensePage.prototype.selectVendorModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelCtrl.create({
                            component: VendorListPage,
                            componentProps: {
                                type: 'vendorListModel',
                                hotelId: this.constant.HotelId
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (detail) {
                            if (detail) {
                                console.log('The result:', detail.data.vendorCompany);
                                _this.expense.vendorCompany = detail.data.vendorCompany;
                                _this.vendorId = detail.data.vendorId;
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
    //------------------------------Add Expense Category Model-----------------------------------//
    AddCapitalExpensePage.prototype.addExpense = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelCtrl.create({
                            component: CapitalExpenseCatPage,
                            componentProps: {
                                hotelId: this.constant.HotelId
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (detail) {
                            console.log(detail);
                            _this.getCapitalExpenseAccount();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AddCapitalExpensePage.prototype.addExpense1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alertmes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Add Expense',
                            cssClass: 'add-exp-pop',
                            // subHeader: 'Subtitle',
                            //  message: 'Name',
                            backdropDismiss: false,
                            inputs: [
                                {
                                    label: "Single Rooms (3)",
                                    name: 'Single Rooms (3)',
                                    placeholder: 'Enter Account No.'
                                },
                                {
                                    name: 'name',
                                    placeholder: 'Enter Account Name'
                                },
                            ],
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
                                    text: 'Add',
                                    cssClass: 'done-btn btnsize1',
                                    handler: function () {
                                        // this.onLogoutApiFunction();
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
    //------------------------------Old Validation Code-----------------------------------//
    AddCapitalExpensePage.prototype.expenseSubmitClick = function () {
        console.log(this.expense.cap_invoice.length);
        var checkValid = false;
        var checklength = false;
        if (this.expense.cap_date == null || this.expense.cap_date == "") {
            checkValid = true;
        }
        if (this.expense.cap_invoice == null || this.expense.cap_invoice == "") {
            checkValid = true;
        }
        if (this.expense.cap_invoice.length < 3) {
            console.log("dsdhshs");
            var checklength_1 = true;
        }
        if (this.expense.cap_vendor == null || this.expense.cap_vendor == "") {
            checkValid = true;
        }
        if (this.expense.cap_category == null || this.expense.cap_category == "") {
            checkValid = true;
        }
        if (this.expense.cap_cost == null || this.expense.cap_cost == "") {
            checkValid = true;
        }
        if (this.expense.cap_description == null || this.expense.cap_description == "") {
            checkValid = true;
        }
        if (checkValid && checklength) {
            console.log(checkValid);
            return 0;
        }
        else {
            console.log(checkValid);
            return 1;
        }
    };
    //------------------------------Edit Capital Expense-----------------------------------//
    AddCapitalExpensePage.prototype.updateCapitalExpClick = function () {
        var _this = this;
        if (this.ExpenseForm.valid) {
            var dic = {};
            dic['createdByUserId'] = this.userData.userId;
            dic['date'] = this.ExpenseForm.value.date;
            dic['capitalExpenseAccountId'] = this.ExpenseForm.value.capitalExpenseAccountId;
            dic['userId'] = this.userData.userId;
            dic['hotelId'] = this.constant.HotelId;
            if (this.vendorId) {
                dic['vendorId'] = this.vendorId;
            }
            else {
                dic['vendorId'] = this.expense.vendorId;
            }
            dic['invoiceNo'] = this.ExpenseForm.value.invoiceNo;
            dic['cost'] = this.ExpenseForm.value.cost;
            dic['description'] = this.ExpenseForm.value.description;
            dic['capitalExpenseId'] = this.expense.capitalexpenseId;
            console.log(dic);
            this.constant.LoadingPresent();
            this.service.updateCapitalExpenseAPI(dic).subscribe(function (result) {
                _this.constant.LoadingHide();
                if (result.status) {
                    console.log(result);
                    _this.constant.ToastCustom(result.data.message, 'top');
                    // this.router.navigate(['/CapitalExpenseInner',{expense: JSON.stringify(this.params) }]);
                    _this.navCtrl.navigateForward(['/CapitalExpenseInner', { expense: JSON.stringify(_this.params) }]);
                }
                else {
                    _this.constant.ToastCustom(result.message, 'top');
                }
            }, function (error) {
                _this.constant.Logout(error);
            });
        }
        else {
            this.constant.ToastCustom('Please All * Fields are Required', 'top');
        }
    };
    AddCapitalExpensePage = __decorate([
        Component({
            selector: 'app-add-capital-expense',
            templateUrl: './add-capital-expense.page.html',
            styleUrls: ['./add-capital-expense.page.scss'],
        }),
        __metadata("design:paramtypes", [AlertController, FormBuilder, Router, ModalController, Constant, webServicenew, ActivatedRoute, NavController])
    ], AddCapitalExpensePage);
    return AddCapitalExpensePage;
}());
export { AddCapitalExpensePage };
//# sourceMappingURL=add-capital-expense.page.js.map