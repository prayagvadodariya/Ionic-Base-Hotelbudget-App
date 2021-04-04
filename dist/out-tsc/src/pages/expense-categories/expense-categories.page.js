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
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from "../../services/constant";
var ExpenseCategoriesPage = /** @class */ (function () {
    function ExpenseCategoriesPage(activatedRoute, router, service, constant) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.service = service;
        this.constant = constant;
        this.categoryData = [];
        this.requestParam = { userId: 0, departmentId: 0, hotelId: 0, year: '', month: '', toMonth: '', page: 0 };
        this.infiniteScrollEnable = false;
        if (this.activatedRoute.snapshot.paramMap.get('deptData')) {
            this.deptData = JSON.parse(this.activatedRoute.snapshot.paramMap.get('deptData'));
            console.log(this.deptData);
        }
        this.userData = this.constant.getUserData();
        console.log(this.userData);
    }
    ExpenseCategoriesPage.prototype.ngOnInit = function () {
        this.setParamFunction();
    };
    ExpenseCategoriesPage.prototype.setParamFunction = function () {
        this.requestParam.userId = this.userData.userId;
        this.requestParam.year = this.constant.year;
        this.requestParam.month = this.constant.month;
        this.requestParam.toMonth = this.constant.toMonth;
        this.requestParam.hotelId = this.constant.HotelId;
        this.requestParam.departmentId = this.deptData.departmentId;
        this.Hotelname = this.constant.hotelName;
        console.log(this.requestParam);
        this.getCategotytList();
    };
    ExpenseCategoriesPage.prototype.getCategotytList = function () {
        var _this = this;
        console.log(this.requestParam);
        this.constant.LoadingPresent();
        this.service.getCategotyListAPI(this.requestParam).subscribe(function (result) {
            _this.constant.LoadingHide();
            console.log(result);
            if (result.status) {
                var categoryData = result.data;
                console.log(categoryData.length);
                for (var index = 0; index < categoryData.length; index++) {
                    _this.categoryData.push(categoryData[index]);
                }
                console.log(_this.categoryData);
                if (categoryData.length < 20) {
                    _this.infiniteScrollEnable = false;
                }
                else {
                    _this.infiniteScrollEnable = true;
                }
                console.log(_this.categoryData);
                // this.deptDetail = result.data;
                // console.log(this.departmentData);
                // this.MQYsegment = this.deptDetail.current_filter;
            }
            else {
                _this.constant.ToastCustom(result.response.message, 'top');
                _this.constant.LogoutSession(result.status_key);
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    ExpenseCategoriesPage.prototype.InfinitScrollingAPI = function (event) {
        var _this = this;
        console.log(event);
        if (this.categoryData.length > 0) {
            this.requestParam.page += 10;
        }
        //this.getNotification();
        this.constant.LoadingPresent();
        this.service.getCategotyListAPI(this.requestParam).subscribe(function (result) {
            _this.constant.LoadingHide();
            event.target.complete();
            console.log(result);
            if (result.status) {
                var categoryData = result.data;
                console.log(categoryData.length);
                for (var index = 0; index < categoryData.length; index++) {
                    _this.categoryData.push(categoryData[index]);
                }
                console.log(_this.categoryData);
                if (categoryData.length < 20) {
                    _this.infiniteScrollEnable = false;
                }
                else {
                    _this.infiniteScrollEnable = true;
                }
            }
            else {
                _this.constant.LogoutSession(result.status_key);
                _this.constant.ToastCustom(result.data.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    ExpenseCategoriesPage.prototype.getExpenseClick = function (data) {
        console.log(data);
        this.router.navigate(['/showExpense', { deptData: JSON.stringify(data), departmentId: JSON.stringify(this.deptData.departmentId) }]);
    };
    ExpenseCategoriesPage = __decorate([
        Component({
            selector: 'app-expense-categories',
            templateUrl: './expense-categories.page.html',
            styleUrls: ['./expense-categories.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute, Router, webServicenew, Constant])
    ], ExpenseCategoriesPage);
    return ExpenseCategoriesPage;
}());
export { ExpenseCategoriesPage };
//# sourceMappingURL=expense-categories.page.js.map