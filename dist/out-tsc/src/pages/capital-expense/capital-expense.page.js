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
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
import { Router } from '@angular/router';
import { IonSelect } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
var CapitalExpensePage = /** @class */ (function () {
    function CapitalExpensePage(service, constant, router, activatedRoute) {
        this.service = service;
        this.constant = constant;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.reqParam = { year: 2019, month: '', toMonth: '' };
        this.yearDataList = [];
        this.quarterDataList = [];
        this.weekDataList = [];
        this.monthDataList = [];
        this.MQYsegment = 'month';
    }
    CapitalExpensePage.prototype.ionViewWillEnter = function () {
        if (this.activatedRoute.snapshot.paramMap.get('params')) {
            this.params = JSON.parse(JSON.parse(JSON.stringify(this.activatedRoute.snapshot.paramMap.get('params'))));
            console.log(this.params);
            this.reqParam.month = this.params.month;
            this.reqParam.toMonth = this.params.toMonth;
            this.reqParam.year = this.params.year;
            this.CurrentDate = this.reqParam.month + '-' + this.reqParam.year;
            this.getCapitalExpense();
        }
    };
    CapitalExpensePage.prototype.ngOnInit = function () {
        var _this = this;
        console.log("asrasr");
        this.currentYear = this.constant.currentYear();
        this.yearDataList = this.constant.dateFilterData;
        this.reqParam.year = this.currentYear;
        if (this.yearDataList) {
            var index = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.quarterDataList = this.yearDataList[index].quarter; //this.constant.QuaterObject();
            var index1 = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.monthDataList = this.yearDataList[index1].months; //this.constant.QuaterObject();
            if (this.monthDataList) {
                for (var i = 0; i < this.monthDataList.length; i++) {
                    if (this.monthDataList[i].current == true) {
                        this.reqParam.month = this.monthDataList[i].name;
                        this.reqParam.toMonth = this.monthDataList[i].name;
                    }
                }
            }
            console.log(this.reqParam.month);
            var index2 = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.weekDataList = this.yearDataList[index2].weeks;
        }
        this.CurrentDate = this.reqParam.month + ',' + this.currentYear;
        this.getCapitalExpense();
    };
    CapitalExpensePage.prototype.getCapitalExpense = function () {
        var _this = this;
        this.constant.LoadingPresent();
        console.log(this.reqParam);
        this.service.getCapitalExpenseAPI(this.reqParam).subscribe(function (result) {
            console.log(result);
            if (result.status) {
                _this.constant.LoadingHide();
                _this.getCapitalExpList = result.data;
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    CapitalExpensePage.prototype.onselectChangeYear = function (data) {
        console.log(this.yearmodel);
        if (data == 'year') {
            this.reqParam.year = this.yearmodel.id;
            this.reqParam.toMonth = 'Dec';
            this.reqParam.month = 'Jan';
            if (this.yearmodel) {
                this.quarterModel = '';
                this.monthModel = '';
                this.weekmodel = '';
                this.constant.year = this.yearmodel;
                this.getCapitalExpense();
            }
        }
        this.oldMQYsegment = data;
    };
    CapitalExpensePage.prototype.onselectChangeQuarter = function (data) {
        console.log(this.quarterModel);
        if (this.quarterModel.name == 'Q1') {
            this.reqParam.month = 'Jan';
            this.reqParam.toMonth = 'Mar';
        }
        else if (this.quarterModel.name == 'Q2') {
            this.reqParam.month = 'Apr';
            this.reqParam.toMonth = 'Jun';
        }
        else if (this.quarterModel.name == 'Q3') {
            this.reqParam.month = 'Jul';
            this.reqParam.toMonth = 'Sep';
        }
        else if (this.quarterModel.name == 'Q4') {
            this.reqParam.month = 'Oct';
            this.reqParam.toMonth = 'Dec';
        }
        if (this.quarterModel) {
            this.monthModel = '';
            this.yearmodel = '';
            this.weekmodel = '';
            this.getCapitalExpense();
        }
        this.oldMQYsegment = data;
    };
    CapitalExpensePage.prototype.onselectChangeMonth = function (data) {
        this.reqParam.month = this.monthModel.name;
        this.reqParam.toMonth = this.monthModel.name;
        if (this.monthModel) {
            this.yearmodel = '';
            this.quarterModel = '';
            this.weekmodel = '';
            this.getCapitalExpense();
        }
        this.oldMQYsegment = data;
    };
    CapitalExpensePage.prototype.selectsegment = function () {
        var _this = this;
        console.log(this.MQYsegment);
        if (this.MQYsegment == 'year') {
            this.title = 'Year';
            setTimeout(function () { _this.yearselectRef.open(); }, 500);
            //  this.MQYsegment = this.oldMQYsegment;
        }
        else if (this.MQYsegment == 'quater') {
            var index = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.quarterDataList = this.yearDataList[index].quarter; //this.constant.QuaterObject();
            console.log(this.quarterDataList);
            this.title = 'Quarter';
            setTimeout(function () { _this.quaterselectref.open(); }, 500);
            //this.MQYsegment = this.oldMQYsegment;
        }
        else if (this.MQYsegment == 'month') {
            var index = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.monthDataList = this.yearDataList[index].months; //this.constant.QuaterObject();
            console.log(this.monthDataList);
            this.title = 'Month';
            setTimeout(function () { _this.monthselectRef.open(); }, 500);
            // this.MQYsegment = this.oldMQYsegment;
        }
        else if (this.MQYsegment == 'week') {
            var index = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
            this.weekDataList = this.yearDataList[index].weeks; //this.constant.QuaterObject();
            console.log(this.weekDataList);
            this.title = 'Week';
            setTimeout(function () { _this.weekselectRef.open(); }, 500);
            //this.MQYsegment = this.oldMQYsegment;
        }
    };
    CapitalExpensePage.prototype.onSelectChangeCancel = function () {
        this.MQYsegment = this.oldMQYsegment;
    };
    CapitalExpensePage.prototype.getxpenseDetailClick = function (exp) {
        console.log(exp);
        console.log(this.reqParam);
        this.constant.HotelId = exp.hotelId;
        this.constant.hotelName = exp.hotelName;
        this.router.navigate(['/CapitalExpenseInner', { expense: JSON.stringify(this.reqParam) }]);
    };
    __decorate([
        ViewChild('quaterSelect'),
        __metadata("design:type", IonSelect)
    ], CapitalExpensePage.prototype, "quaterselectref", void 0);
    __decorate([
        ViewChild('yearSelect'),
        __metadata("design:type", IonSelect)
    ], CapitalExpensePage.prototype, "yearselectRef", void 0);
    __decorate([
        ViewChild('weekSelect'),
        __metadata("design:type", IonSelect)
    ], CapitalExpensePage.prototype, "weekselectRef", void 0);
    __decorate([
        ViewChild('monthSelect'),
        __metadata("design:type", IonSelect)
    ], CapitalExpensePage.prototype, "monthselectRef", void 0);
    CapitalExpensePage = __decorate([
        Component({
            selector: 'app-capital-expense',
            templateUrl: './capital-expense.page.html',
            styleUrls: ['./capital-expense.page.scss'],
        }),
        __metadata("design:paramtypes", [webServicenew, Constant, Router, ActivatedRoute])
    ], CapitalExpensePage);
    return CapitalExpensePage;
}());
export { CapitalExpensePage };
//# sourceMappingURL=capital-expense.page.js.map