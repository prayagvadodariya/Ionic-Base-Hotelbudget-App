var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
var CapitalExpenseCatPage = /** @class */ (function () {
    function CapitalExpenseCatPage(modelCtrl, navParams, constant, service) {
        this.modelCtrl = modelCtrl;
        this.navParams = navParams;
        this.constant = constant;
        this.service = service;
        this.isCheckEmptyField = false;
        this.userData = this.constant.getUserData();
        this.hotelId = navParams.get("hotelId");
    }
    CapitalExpenseCatPage.prototype.ngOnInit = function () {
    };
    CapitalExpenseCatPage.prototype.modelClose = function () {
        this.modelCtrl.dismiss();
    };
    CapitalExpenseCatPage.prototype.expenseSubmit = function () {
        var checkValid = false;
        if (this.account_no == null || this.account_no == "") {
            checkValid = true;
        }
        if (this.account_name == null || this.account_name == "") {
            checkValid = true;
        }
        if (checkValid) {
            console.log(checkValid);
            return 0;
        }
        else {
            console.log(checkValid);
            return 1;
        }
    };
    CapitalExpenseCatPage.prototype.accountAddClick = function () {
        var _this = this;
        this.isCheckEmptyField = true;
        if (this.expenseSubmit()) {
            console.log(this.expenseSubmit());
            // v_color, 
            var dic = {};
            dic['userId'] = this.userData.userId;
            dic['hotelId'] = this.hotelId;
            dic['expenseAccountName'] = this.account_name;
            dic['expenseAccountNumber'] = this.account_no;
            dic['createdByUserId'] = this.userData.userId;
            console.log(dic);
            this.constant.LoadingPresent();
            this.service.AddCapitalExpenseAccountAPI(dic).subscribe(function (result) {
                _this.constant.LoadingHide();
                if (result.status) {
                    _this.modelCtrl.dismiss();
                    _this.constant.ToastCustom(result.message, 'top');
                }
                else {
                    _this.constant.ToastCustom(result.data.message, 'top');
                }
            }, function (error) {
                _this.constant.Logout(error);
            });
        }
        else {
        }
    };
    CapitalExpenseCatPage = __decorate([
        Component({
            selector: 'app-capital-expense-cat',
            templateUrl: './capital-expense-cat.page.html',
            styleUrls: ['./capital-expense-cat.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController, NavParams, Constant, webServicenew])
    ], CapitalExpenseCatPage);
    return CapitalExpenseCatPage;
}());
export { CapitalExpenseCatPage };
//# sourceMappingURL=capital-expense-cat.page.js.map