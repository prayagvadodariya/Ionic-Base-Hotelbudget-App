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
import { ActivatedRoute } from '@angular/router';
import { Constant } from "../../services/constant";
import { webServicenew } from '../../services/webServicenew';
import { NavController, } from '@ionic/angular';
var SearchInnerPage = /** @class */ (function () {
    function SearchInnerPage(activatedRoute, constant, navCtrl, service) {
        this.activatedRoute = activatedRoute;
        this.constant = constant;
        this.navCtrl = navCtrl;
        this.service = service;
        this.expenselist = [];
        this.totalCount = 0;
        this.infiniteScrollEnable = false;
        this.reqParam = {};
        console.log(JSON.parse(this.activatedRoute.snapshot.paramMap.get('serachParam')));
        this.HotelName = this.constant.hotelName;
    }
    SearchInnerPage.prototype.ngOnInit = function () {
        if (this.activatedRoute.snapshot.paramMap.get('serachParam')) {
            this.reqParam = JSON.parse(this.activatedRoute.snapshot.paramMap.get('serachParam'));
            this.reqParam.page = 0;
            this.onloadSearchFunction(this.reqParam);
        }
    };
    //--------------------------------------------------Onload Search Function----------------------------------------------//
    SearchInnerPage.prototype.onloadSearchFunction = function (reqParam) {
        var _this = this;
        this.constant.LoadingPresent();
        console.log(reqParam);
        this.service.serachExpenseAPI(reqParam).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                console.log(result.data);
                _this.expenselist = result.data.expenses;
                _this.totalCount = result.data.total_count;
                if (result.data.length < 20) {
                    _this.infiniteScrollEnable = false;
                }
                else {
                    _this.infiniteScrollEnable = true;
                }
                console.log(_this.expenselist);
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
                _this.constant.LogoutSession(result.status_key);
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    //--------------------------------------------------Infinite Scrolling----------------------------------------------//
    SearchInnerPage.prototype.InfinitScrollingAPI = function (event) {
        var _this = this;
        if (this.expenselist.length > 0) {
            this.reqParam.page += 20;
        }
        this.constant.LoadingPresent();
        console.log(this.reqParam);
        this.service.serachExpenseAPI(this.reqParam).subscribe(function (result) {
            _this.constant.LoadingHide();
            event.target.complete();
            if (result.status) {
                console.log(result);
                var expenselist = result.data.expenses;
                for (var index = 0; index < expenselist.length; index++) {
                    _this.expenselist.push(expenselist[index]);
                }
                console.log(_this.expenselist);
                if (expenselist.length < 20) {
                    _this.infiniteScrollEnable = false;
                }
                else {
                    _this.infiniteScrollEnable = true;
                }
                //  this.constant.ToastCustom(result.message, 'top');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
                _this.constant.LogoutSession(result.status_key);
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    SearchInnerPage = __decorate([
        Component({
            selector: 'app-search-inner',
            templateUrl: './search-inner.page.html',
            styleUrls: ['./search-inner.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute, Constant, NavController, webServicenew])
    ], SearchInnerPage);
    return SearchInnerPage;
}());
export { SearchInnerPage };
//# sourceMappingURL=search-inner.page.js.map