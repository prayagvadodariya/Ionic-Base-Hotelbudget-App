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
import { ModalController } from '@ionic/angular';
import { Constant } from "../../services/constant";
import { WebService } from '../../services/webService';
var RelloacateAmountPage = /** @class */ (function () {
    function RelloacateAmountPage(modelCtrl, constant, service) {
        this.modelCtrl = modelCtrl;
        this.constant = constant;
        this.service = service;
        this.isCheckEmptyField = false;
        this.getDepartmentList = [];
        this.GetCategoryList = [];
        this.userData = this.constant.getUserData();
    }
    RelloacateAmountPage.prototype.ngOnInit = function () {
        this.getDepartmentListClick();
    };
    RelloacateAmountPage.prototype.modelClose = function () {
        this.modelCtrl.dismiss();
    };
    RelloacateAmountPage.prototype.getDepartmentListClick = function () {
        var _this = this;
        var dic = { i_hotel_id: 1, i_user_id: this.userData.i_user_id };
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
    RelloacateAmountPage.prototype.getCategoryList = function (event) {
        var _this = this;
        console.log(event);
        console.log(event.target.value);
        if (event) {
            var department_id = event.target.value;
            var dic = { i_hotel_department_id: department_id, i_hotel_id: 1 };
            this.constant.LoadingPresent();
            this.service.getCategoryListAPI(dic).subscribe(function (result) {
                _this.constant.LoadingHide();
                if (result.status) {
                    console.log(result);
                    _this.GetCategoryList = result.data;
                    console.log(_this.GetCategoryList);
                    //this.constant.ToastCustom(result.message, 'top');
                }
                else {
                    _this.constant.ToastCustom(result.message, 'top');
                }
            }, function (error) {
                _this.constant.Logout(error);
            });
        }
    };
    RelloacateAmountPage.prototype.reallocationAmount = function () {
        this.isCheckEmptyField = true;
        if (this.reallocationAmountClick()) {
            console.log(this.reallocationAmountClick());
        }
        else {
        }
    };
    RelloacateAmountPage.prototype.reallocationAmountClick = function () {
        var checkValid = false;
        if (this.department == null || this.department == "") {
            checkValid = true;
        }
        if (this.date == null || this.date == "") {
            checkValid = true;
        }
        if (this.category == null || this.category == "") {
            checkValid = true;
        }
        if (this.amount == null || this.amount == "") {
            checkValid = true;
        }
        if (this.toCategory == null || this.toCategory == "") {
            checkValid = true;
        }
        if (this.toAmount == null || this.toAmount == "") {
            checkValid = true;
        }
        if (this.transAmount == null || this.transAmount == "") {
            checkValid = true;
        }
        if (checkValid) {
            return 1;
        }
        else {
            return 0;
        }
    };
    RelloacateAmountPage = __decorate([
        Component({
            selector: 'app-relloacate-amount',
            templateUrl: './relloacate-amount.page.html',
            styleUrls: ['./relloacate-amount.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController, Constant, WebService])
    ], RelloacateAmountPage);
    return RelloacateAmountPage;
}());
export { RelloacateAmountPage };
//# sourceMappingURL=relloacate-amount.page.js.map