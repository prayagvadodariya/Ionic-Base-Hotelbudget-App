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
import { PopoverController, NavController } from '@ionic/angular';
import { PromptMessageComponent } from '../../components/prompt-message/prompt-message';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from "../../services/constant";
var ShowExpensePage = /** @class */ (function () {
    function ShowExpensePage(popoverController, navCtrl, activatedRoute, router, service, constant) {
        this.popoverController = popoverController;
        this.navCtrl = navCtrl;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.service = service;
        this.constant = constant;
        this.requestParam = { userId: 0, departmentId: 0, hotel_id: 0, year: '', month: '', toMonth: '', expenseAccountId: 0, page: 0 };
        if (this.activatedRoute.snapshot.paramMap.get('deptData')) {
            this.expenseData = JSON.parse(this.activatedRoute.snapshot.paramMap.get('deptData'));
            this.departmentId = JSON.parse(this.activatedRoute.snapshot.paramMap.get('departmentId'));
            console.log(this.expenseData);
            console.log(this.departmentId);
        }
        this.userData = this.constant.getUserData();
        console.log(this.expenseData);
    }
    ShowExpensePage.prototype.ngOnInit = function () {
        this.setParamFunction();
    };
    ShowExpensePage.prototype.setParamFunction = function () {
        this.requestParam.userId = this.userData.userId;
        this.requestParam.year = this.constant.year;
        this.requestParam.month = this.constant.month;
        this.requestParam.toMonth = this.constant.toMonth;
        this.requestParam.hotel_id = this.constant.HotelId;
        this.requestParam.departmentId = this.departmentId;
        this.requestParam.expenseAccountId = this.expenseData.expenseAccountId;
        this.Hotelname = this.constant.HotelId;
        console.log(this.requestParam);
        this.getExpenseListFunction();
    };
    ShowExpensePage.prototype.getExpenseListFunction = function () {
        var _this = this;
        console.log(this.requestParam);
        this.constant.LoadingPresent();
        this.service.getExpenseListAPI(this.requestParam).subscribe(function (result) {
            _this.constant.LoadingHide();
            console.log(result);
            if (result.status) {
                var categoryData = result.data;
                console.log(categoryData.length);
                // for (let index = 0; index < categoryData.length; index++) {
                //   this.categoryData.push(categoryData[index]);
                // }
                // console.log(this.categoryData);
                // if (categoryData.length < 20) {
                //   this.infiniteScrollEnable = false
                // }
                // else {
                //   this.infiniteScrollEnable = true;
                // }
                //  console.log(this.categoryData);
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
    ShowExpensePage.prototype.presentPopover = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: PromptMessageComponent,
                            event: ev,
                            translucent: true,
                            cssClass: 'custom-popover',
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ShowExpensePage.prototype.hidemeClick = function () {
        var _this = this;
        this.hideme = !this.hideme;
        setTimeout(function () {
            _this.hideme = false;
        }, 2500);
    };
    ShowExpensePage.prototype.addExpenseClick = function () {
        this.router.navigate(['/add-expense', { data: 'Back' }]);
    };
    ShowExpensePage = __decorate([
        Component({
            selector: 'app-show-expense',
            templateUrl: './show-expense.page.html',
            styleUrls: ['./show-expense.page.scss'],
        }),
        __metadata("design:paramtypes", [PopoverController, NavController, ActivatedRoute, Router, webServicenew, Constant])
    ], ShowExpensePage);
    return ShowExpensePage;
}());
export { ShowExpensePage };
//# sourceMappingURL=show-expense.page.js.map