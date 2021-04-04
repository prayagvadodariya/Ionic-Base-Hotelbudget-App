var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from "../../services/constant";
import { IonSelect } from '@ionic/angular';
var GMDashboardPage = /** @class */ (function () {
    function GMDashboardPage(nacCtrl, router, service, constant) {
        this.nacCtrl = nacCtrl;
        this.router = router;
        this.service = service;
        this.constant = constant;
        this.yearDataList = [];
        this.quarterDataList = [];
        this.weekDataList = [];
        this.monthDataList = [];
        this.userData = [];
        this.infiniteScrollEnable = false;
        this.requestParam = { userId: 0, roleId: 0, hotel_id: 0, year: '', month: '', toMonth: '', page: 0 };
        this.departmentData = [];
        this.HotelList = [];
        this.userData = this.constant.getUserData();
        this.HotelList = JSON.parse(localStorage.getItem("HotelList"));
    }
    GMDashboardPage.prototype.ngOnInit = function () {
    };
    GMDashboardPage.prototype.next = function () {
        this.router.navigate(['/expense-categories']);
    };
    GMDashboardPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.setParamFunction();
        this.currentYear = this.constant.currentYear();
        this.yearDataList = this.constant.dateFilterData;
        if (this.yearDataList) {
            var index = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.quarterDataList = this.yearDataList[index].quarter; //this.constant.QuaterObject();
            var index1 = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.monthDataList = this.yearDataList[index1].months; //this.constant.QuaterObject();
            var index2 = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.weekDataList = this.yearDataList[index2].weeks;
        }
    };
    GMDashboardPage.prototype.setParamFunction = function () {
        this.requestParam.userId = this.userData.userId;
        this.requestParam.roleId = this.userData.roleId;
        this.requestParam.year = this.constant.year;
        this.requestParam.month = this.constant.month;
        this.requestParam.toMonth = this.constant.toMonth;
        this.requestParam.hotel_id = this.constant.HotelId;
        this.Hotelname = this.constant.HotelId;
        //this.getDepartmentList();
    };
    GMDashboardPage.prototype.selectsegment = function () {
        var _this = this;
        if (this.MQYsegment == 'year') {
            this.title = 'Year';
            setTimeout(function () { _this.yearselectRef.open(); }, 500);
            //  this.MQYsegment = this.oldMQYsegment;
        }
        else if (this.MQYsegment == 'quarter') {
            var index = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.quarterDataList = this.yearDataList[index].quarter; //this.constant.QuaterObject();
            this.title = 'Quarter';
            setTimeout(function () { _this.quaterselectref.open(); }, 500);
            //this.MQYsegment = this.oldMQYsegment;
        }
        else if (this.MQYsegment == 'month') {
            var index = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.monthDataList = this.yearDataList[index].months; //this.constant.QuaterObject();
            this.title = 'Month';
            setTimeout(function () { _this.monthselectRef.open(); }, 500);
            // this.MQYsegment = this.oldMQYsegment;
        }
        else if (this.MQYsegment == 'week') {
            var index = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.weekDataList = this.yearDataList[index].weeks; //this.constant.QuaterObject();
            this.title = 'Week';
            setTimeout(function () { _this.weekselectRef.open(); }, 500);
            //this.MQYsegment = this.oldMQYsegment;
        }
    };
    GMDashboardPage.prototype.onselectChangeYear = function (data) {
        if (data == 'year') {
            this.requestParam.year = this.yearmodel;
            this.requestParam.toMonth = '';
            this.requestParam.month = '';
            if (this.yearmodel) {
                this.quarterModel = '';
                this.monthModel = '';
                this.weekmodel = '';
                this.constant.year = this.yearmodel;
                this.getDepartmentList();
            }
        }
        this.oldMQYsegment = data;
    };
    GMDashboardPage.prototype.onselectChangeQuarter = function (data) {
        var response = this.constant.quaterFormat(this.quarterModel);
        this.requestParam.month = response.month;
        this.requestParam.toMonth = response.toMonth;
        if (this.quarterModel) {
            this.monthModel = '';
            this.yearmodel = '';
            this.weekmodel = '';
            this.getDepartmentList();
        }
        this.oldMQYsegment = data;
    };
    GMDashboardPage.prototype.onselectChangeMonth = function (data) {
        this.requestParam.month = this.monthModel;
        this.requestParam.toMonth = '';
        if (this.monthModel) {
            this.yearmodel = '';
            this.quarterModel = '';
            this.weekmodel = '';
            this.getDepartmentList();
        }
        this.oldMQYsegment = data;
    };
    GMDashboardPage.prototype.onSelectChangeCancel = function () {
        this.MQYsegment = this.oldMQYsegment;
    };
    GMDashboardPage.prototype.getDepartmentList = function () {
        var _this = this;
        this.constant.LoadingPresent();
        this.service.getDashboardDataAPI(this.requestParam).subscribe(function (result) {
            _this.constant.LoadingHide();
            console.log(result);
            if (result.status) {
                _this.departmentData = result.data.department_data;
                console.log(result.data.department_data.length);
                if (result.data.department_data.length < 10) {
                    _this.infiniteScrollEnable = false;
                }
                else {
                    _this.infiniteScrollEnable = true;
                }
                // this.departmentData = result.data.department_data;
                _this.deptDetail = result.data;
                _this.MQYsegment = _this.deptDetail.current_filter;
            }
            else {
                _this.constant.ToastCustom(result.response.message, 'top');
                _this.constant.LogoutSession(result.status_key);
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    GMDashboardPage.prototype.InfinitScrollingAPI = function (event) {
        var _this = this;
        console.log(event);
        if (this.departmentData.length > 0) {
            this.requestParam.page += 10;
        }
        //this.getNotification();
        this.constant.LoadingPresent();
        this.service.getDashboardDataAPI(this.requestParam).subscribe(function (result) {
            _this.constant.LoadingHide();
            event.target.complete();
            if (result.status) {
                var department = result.data.department_data;
                for (var index = 0; index < department.length; index++) {
                    _this.departmentData.push(department[index]);
                }
                if (department.length < 10) {
                    _this.infiniteScrollEnable = false;
                }
                else {
                    _this.infiniteScrollEnable = true;
                }
                _this.deptDetail = result.data;
                _this.MQYsegment = _this.deptDetail.current_filter;
            }
            else {
                _this.constant.ToastCustom(result.data.message, 'top');
                _this.constant.LogoutSession(result.status_key);
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    GMDashboardPage.prototype.selectDashboardClick = function (event) {
        var hotelId = event.detail.value;
        this.requestParam.hotel_id = hotelId;
        this.getDepartmentList();
    };
    GMDashboardPage.prototype.getDeptExpense = function (dept) {
        console.log(dept);
        this.router.navigate(['/expenseCategories', { deptData: JSON.stringify(dept) }]);
    };
    __decorate([
        ViewChild('quaterSelect'),
        __metadata("design:type", IonSelect)
    ], GMDashboardPage.prototype, "quaterselectref", void 0);
    __decorate([
        ViewChild('yearSelect'),
        __metadata("design:type", IonSelect)
    ], GMDashboardPage.prototype, "yearselectRef", void 0);
    __decorate([
        ViewChild('weekSelect'),
        __metadata("design:type", IonSelect)
    ], GMDashboardPage.prototype, "weekselectRef", void 0);
    __decorate([
        ViewChild('monthSelect'),
        __metadata("design:type", IonSelect)
    ], GMDashboardPage.prototype, "monthselectRef", void 0);
    GMDashboardPage = __decorate([
        Component({
            selector: 'app-gmdashboard',
            templateUrl: './gmdashboard.page.html',
            styleUrls: ['./gmdashboard.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController, Router, webServicenew, Constant])
    ], GMDashboardPage);
    return GMDashboardPage;
}());
export { GMDashboardPage };
//# sourceMappingURL=gmdashboard.page.js.map