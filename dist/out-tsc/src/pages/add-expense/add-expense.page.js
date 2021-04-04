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
import { DomSanitizer } from "@angular/platform-browser";
import { ModalController, ToastController, AlertController, } from '@ionic/angular';
import { AddVendorPage } from '../add-vendor/add-vendor.page';
import { RelloacateAmountPage } from '../../models/relloacate-amount/relloacate-amount.page';
import { VendorListPage } from '../vendor-list/vendor-list.page';
import { Router } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { ActivatedRoute } from '@angular/router';
var AddExpensePage = /** @class */ (function () {
    function AddExpensePage(modalCtrl, router, alertController, constant, activatedRoute, alertCtrl, service, toastCtrl, sanitizer) {
        this.modalCtrl = modalCtrl;
        this.router = router;
        this.alertController = alertController;
        this.constant = constant;
        this.activatedRoute = activatedRoute;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.toastCtrl = toastCtrl;
        this.sanitizer = sanitizer;
        this.expenseInputs = [];
        this.spreadExpense = false;
        this.isCheckEmptyField = false;
        this.getReallocatedExpense = false;
        this.category = [];
        this.department = [];
        this.cost = [];
        this.description = [];
        this.fromMonth = [];
        this.toMonth = [];
        this.getDepartmentList = [];
        this.GetCategoryList = [];
        this.hideme = [];
        this.spreadFlag = false;
        this.buttoncolor = '';
        this.remainingAmount = '';
        this.totalBudget = '';
        this.totalExpense = 0;
        this.checkNotificationStatus = false;
        //this.expShow=true;
        console.log(this.constant.HotelId);
        if (this.activatedRoute.snapshot.paramMap.get('data')) {
            this.pageBack = this.activatedRoute.snapshot.paramMap.get('data');
            console.log(this.pageBack);
        }
        this.userData = this.constant.getUserData();
        console.log(this.userData);
        this.inputsFunction();
    }
    AddExpensePage.prototype.ngOnInit = function () {
        this.getDepartmentListClick();
    };
    //-----------------------------------Get Department List Function----------------------------------------//
    AddExpensePage.prototype.getDepartmentListClick = function () {
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
                //this.constant.ToastCustom(result.message, 'top');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    //-----------------------------------Select Vendor Function----------------------------------------// 
    AddExpensePage.prototype.relloacateAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: RelloacateAmountPage,
                            componentProps: {
                                type: 'vendorModel'
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (detail) {
                            console.log(detail);
                            //this.getCapitalExpenseAccount();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AddExpensePage.prototype.inputsFunction = function () {
        this.expenseInputs = [{
                department: '',
                category: '',
                cost: '',
                description: '',
                fromMonth: '',
                toMonth: '',
                spreadExpense: false
            }];
    };
    //-----------------------------------Multiple Expense Model----------------------------------------//
    AddExpensePage.prototype.addInput = function () {
        if (this.expenseSubmitClick()) {
            console.log(this.expenseSubmitClick());
            this.constant.ToastCustom("Please enter all * field!", 'top');
        }
        else {
            // this.spreadFlag = 0;
            this.isCheckEmptyField = false;
            this.expenseInputs.push({
                department: '',
                category: '',
                cost: '',
                description: '',
                fromMonth: '',
                toMonth: '',
                spreadExpense: false
            });
            console.log(this.expenseInputs);
        }
    };
    //-----------------------------------Delete model----------------------------------------//
    AddExpensePage.prototype.removeInput = function (index) {
        this.expenseInputs.splice(index, 1);
        console.log(this.expenseInputs);
    };
    //-----------------------------------Spread Expense Function----------------------------------------//
    AddExpensePage.prototype.spreadExpenseClick = function (index, item) {
        console.log(index);
        console.log(item.spreadExpense);
        if (!item.spreadExpense) {
            item.fromMonth = '';
            item.toMonth = '';
        }
        console.log(item);
        // item.spreadExpense
        // if (item)
        //   item.spreadExpense = 1;
        // else {
        //   this.spreadFlag = 0;
        // }
        var currentYear = this.constant.currentYear();
        console.log(currentYear + 1);
        this.minValue = currentYear - 1 + '-' + '01';
        this.maxValue = currentYear + 1 + '-' + '12';
        console.log(this.minValue);
        console.log(this.spreadFlag);
    };
    AddExpensePage.prototype.getPurchaseOrderCLick = function (purchaseOrder) {
        console.log(purchaseOrder);
        if (purchaseOrder) {
            this.invoiceNumber = "";
            this.purchaseOrder = true;
        }
        else {
            this.purchaseOrder = false;
        }
    };
    //----------------------------------- Add Expense Function ----------------------------------------// 
    AddExpensePage.prototype.expenseAddClick = function () {
        this.department = [];
        this.category = [];
        this.cost = [];
        this.description = [];
        this.fromMonth = [];
        this.toMonth = [];
        var dic = {};
        dic['isSpread'] = false;
        var self = this;
        this.isCheckEmptyField = true;
        if (this.expenseSubmitClick()) {
            console.log(this.expenseSubmitClick());
        }
        else {
            this.getReallocatedExpense = true;
            if (this.purchaseOrder) {
                dic['purchaseOrder'] = true;
                dic['PONumber'] = '';
            }
            else {
                dic['PONumber'] = this.invoiceNumber;
            }
            dic['date'] = this.date;
            dic['vendor'] = this.vendorId;
            this.expenseInputs.forEach(function (entry) {
                self.department.push(entry.department);
                self.category.push(entry.category);
                self.cost.push(entry.cost);
                self.description.push(entry.description);
                self.fromMonth.push(entry.fromMonth);
                self.toMonth.push(entry.toMonth);
            });
            console.log(self.department);
            dic['department'] = self.department;
            dic['expenseAccount'] = self.category;
            dic['amount'] = self.cost;
            dic['itemDescription'] = self.description;
            dic['fromMonth'] = self.fromMonth;
            dic['toMonth'] = self.toMonth;
            for (var i = 0; i < self.fromMonth.length; i++) {
                if (self.fromMonth[i] != null && self.fromMonth[i] != '') {
                    dic['isSpread'] = true;
                    break;
                }
                else {
                    dic['isSpread'] = false;
                }
            }
            dic['hotelId'] = this.constant.HotelId;
            dic['hotelName'] = this.constant.hotelName;
            dic['userName'] = this.userData.userName;
            dic['isPurchaseOrder'] = '';
            dic['userId'] = this.userData.userId;
            console.log(self.fromMonth);
            console.log(dic);
            console.log(this.checkNotificationStatus);
            if (this.checkNotificationStatus) {
                this.notificationAlert(dic);
            }
            else {
                this.addExpenseClickApi(dic);
            }
        }
    };
    //-----------------------------------Notification Alert----------------------------------------//
    AddExpensePage.prototype.notificationAlert = function (dic) {
        return __awaiter(this, void 0, void 0, function () {
            var notifiAlert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Alert',
                            message: 'Would you like to send over expense request to Region Mananger',
                            backdropDismiss: false,
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                        notifiAlert = null;
                                    }
                                },
                                {
                                    text: 'Save Expense & Send Request',
                                    handler: function () {
                                        _this.addExpenseClickApi(dic);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        notifiAlert = _a.sent();
                        notifiAlert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddExpensePage.prototype.addExpenseClickApi = function (dic) {
        var _this = this;
        this.constant.LoadingPresent();
        this.service.addExpenseAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                console.log(result);
                //  this.getDepartmentList = result.data;
                //console.log(this.getDepartmentList);
                //this.constant.ToastCustom(result.message, 'top');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    //-----------------------------------Validation check----------------------------------------//
    AddExpensePage.prototype.expenseSubmitClick = function () {
        var checkValid = false;
        console.log(this.expenseInputs);
        console.log(this.spreadFlag);
        for (var i = 0; i < this.expenseInputs.length; i++) {
            if (this.expenseInputs[i].department == null || this.expenseInputs[i].department == "") {
                checkValid = true;
                break;
            }
            if (this.expenseInputs[i].category == null || this.expenseInputs[i].category == "") {
                checkValid = true;
                break;
            }
            if (this.expenseInputs[i].cost == null || this.expenseInputs[i].cost == "") {
                checkValid = true;
                break;
            }
            if (this.expenseInputs[i].description == null || this.expenseInputs[i].description == "") {
                checkValid = true;
                break;
            }
            if (this.expenseInputs[i].spreadExpense) {
                if (this.expenseInputs[i].fromMonth == null || this.expenseInputs[i].fromMonth == "") {
                    checkValid = true;
                    break;
                }
                if (this.expenseInputs[i].toMonth == null || this.expenseInputs[i].toMonth == "") {
                    checkValid = true;
                    break;
                }
            }
        }
        if (checkValid) {
            return 1;
        }
        else {
            return 0;
        }
    };
    AddExpensePage.prototype.getAddVendorModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: AddVendorPage,
                            componentProps: {
                                type: 'vendorModel'
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            console.log(data);
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AddExpensePage.prototype.selectVendorModel = function () {
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
                                    _this.vendor = detail.data.vendorCompany;
                                    _this.vendorId = detail.data.vendorId;
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
    //----------------------------------- Get Category List ----------------------------------------//
    AddExpensePage.prototype.getCategoryList = function (event, data) {
        var _this = this;
        if (this.date) {
            if (event.target.value) {
                data.category = '';
                // this.expenseInputs[i].category='';
                var department_id = event.target.value;
                var dic = { departmentId: department_id, hotelId: this.constant.HotelId, userId: this.userData.userId };
                console.log(dic);
                this.constant.LoadingPresent();
                this.service.getCategoryListAPI(dic).subscribe(function (result) {
                    _this.constant.LoadingHide();
                    if (result.status) {
                        _this.GetCategoryList = result.data;
                    }
                    else {
                        _this.constant.ToastCustom(result.message, 'top');
                    }
                }, function (error) {
                    _this.constant.Logout(error);
                });
            }
        }
        else {
            this.constant.ToastCustom('Please Select Invoice Date.! ', 'top');
        }
    };
    //----------------------------------- Change Date Function ----------------------------------------//
    AddExpensePage.prototype.changeDate = function (date) {
        console.log(date);
        var i = 0;
        this.expenseInputs.forEach(function (entry) {
            console.log(entry);
            entry.department = '';
            entry.category = '';
            entry.remainingAmount = '';
            entry.totalBudget = '';
        });
    };
    AddExpensePage.prototype.expenseShow = function (item) {
        this.expShow[item] = !this.expShow[item];
    };
    //----------------------------------- Check Confirm Expense ----------------------------------------// 
    AddExpensePage.prototype.checkConfirmExpense = function (item, index) {
        var _this = this;
        this.totalExpense = 0;
        console.log(this.expenseInputs);
        var self = this;
        this.expenseInputs.forEach(function (entry) {
            console.log(entry.cost);
            console.log(entry.category);
            if (entry.cost) {
                var a = parseFloat(entry.cost);
                self.totalExpense = a + self.totalExpense;
            }
        });
        console.log(this.totalExpense);
        console.log(item);
        console.log(index);
        if (item.category) {
            var dic = {};
            dic['userId'] = this.userData.userId;
            dic['isSpread'] = this.spreadFlag;
            if (this.expenseInputs[index].spreadExpense == 1) {
                dic['fromMonth'] = item.fromMonth;
                dic['toMonth'] = item.toMonth;
            }
            else {
                dic['fromMonth'] = '';
                dic['toMonth'] = '';
            }
            dic['hotelId'] = this.constant.HotelId;
            dic['expenseAccount'] = item.category;
            if (item.cost)
                dic['amount'] = item.cost;
            else
                dic['amount'] = 0;
            dic['date'] = this.constant.dateFormat(this.date);
            console.log(dic);
            this.constant.LoadingPresent();
            this.service.getConfirmExpenseAPI(dic).subscribe(function (result) {
                _this.constant.LoadingHide();
                console.log(result);
                _this.expenseInputs[index].remainingAmount = result.remainingAmount;
                _this.expenseInputs[index].totalBudget = result.budget;
                if (result.status == "sufficient") {
                    console.log(result);
                    _this.checkNotificationStatus = false;
                }
                else if (result.status == "unsufficient") {
                    _this.constant.AlertCustom('Over Expense', result.message, 'Ok');
                    _this.checkNotificationStatus = true;
                }
                else if (result.status == "date_not_found" || result.status == 'budgetError') {
                    _this.constant.AlertCustom('Over Expense', result.message, 'Ok');
                }
                else {
                    _this.constant.ToastCustom(result.message, 'top');
                }
            }, function (error) {
                _this.constant.Logout(error);
            });
        }
    };
    AddExpensePage.prototype.fromMonthClick = function (mindate) {
        console.log(mindate);
        this.minToDate = mindate;
    };
    AddExpensePage = __decorate([
        Component({
            selector: 'app-add-expense',
            templateUrl: './add-expense.page.html',
            styleUrls: ['./add-expense.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController, Router, AlertController,
            Constant, ActivatedRoute, AlertController, webServicenew, ToastController, DomSanitizer])
    ], AddExpensePage);
    return AddExpensePage;
}());
export { AddExpensePage };
//# sourceMappingURL=add-expense.page.js.map