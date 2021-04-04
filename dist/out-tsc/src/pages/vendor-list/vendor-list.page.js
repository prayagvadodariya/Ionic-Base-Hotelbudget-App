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
import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
var VendorListPage = /** @class */ (function () {
    function VendorListPage(constant, navParams, activatedRoute, service, router, changeDetect, modelCtrl) {
        this.constant = constant;
        this.navParams = navParams;
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.router = router;
        this.changeDetect = changeDetect;
        this.modelCtrl = modelCtrl;
        this.userData = [];
        this.getVendorList = [];
        this.infiniteScrollEnable = false;
        this.userData = this.constant.getUserData();
        console.log(this.constant.HotelId);
        if (this.constant.HotelId != 0)
            this.req = { hotelId: this.constant.HotelId, userId: this.userData.userId, page: 0, keyword: '' };
        else {
            this.hotelId = navParams.get("hotelId");
            console.log(this.hotelId);
            this.req = { hotelId: this.hotelId, userId: this.userData.userId, page: 0, keyword: '' };
        }
    }
    VendorListPage.prototype.ngOnInit = function () {
    };
    VendorListPage.prototype.ionViewDidEnter = function () {
        this.getVendorFunction();
        console.log(this.type);
    };
    //----------------------------------Get Vendor Function----------------------------------------//
    VendorListPage.prototype.getVendorFunction = function () {
        var _this = this;
        console.log(this.req);
        this.constant.LoadingPresent();
        this.service.getVendorAPI(this.req).subscribe(function (result) {
            if (result.status) {
                console.log(result);
                _this.getVendorList = result.data;
                console.log(_this.getVendorList);
                if (result.data.length < 20) {
                    _this.infiniteScrollEnable = false;
                }
                else {
                    _this.infiniteScrollEnable = true;
                }
                // this.constant.ToastCustom(result.message, 'top');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
                _this.constant.LogoutSession(result.status_key);
            }
            _this.constant.LoadingHide();
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    //----------------------------------Infinite Scroll------------------------------------------//
    VendorListPage.prototype.InfinitScrollingAPI = function (event) {
        var _this = this;
        if (this.getVendorList.length > 0) {
            this.req.page += 20;
        }
        this.constant.LoadingPresent();
        this.service.getVendorAPI(this.req).subscribe(function (result) {
            _this.constant.LoadingHide();
            event.target.complete();
            if (result.status) {
                console.log(result);
                var getVendorList = result.data;
                for (var index = 0; index < getVendorList.length; index++) {
                    _this.getVendorList.push(getVendorList[index]);
                }
                console.log(_this.getVendorList);
                if (getVendorList.length < 20) {
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
    //-----------------------------------On Search Function----------------------------------------//
    VendorListPage.prototype.onSearchInput = function (event) {
        console.log(event);
        this.req.page = 0;
        this.req.keyword = event.target.value;
        clearInterval(this.searchTimeintervalModel);
        var self = this;
        this.searchTimeintervalModel = setInterval(function () {
            self.getVendorFunction();
            clearInterval(self.searchTimeintervalModel);
        }, 1500);
    };
    //----------------------------------Clear Search Function----------------------------------------//
    VendorListPage.prototype.clearSearch = function () {
        this.SearchBox = false;
        this.req.keyword = '';
        this.req.page = 0;
        this.searchInput = '';
        this.getVendorFunction();
    };
    VendorListPage.prototype.addVendorModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // let modal = await  this.modelCtrl.create({component:AddVendorPage,
                //   componentProps: {
                //    type: 'vendorModel'
                //   }
                // });
                // modal.onDidDismiss()
                // .then((data) => {
                // console.log(data);
                // })
                //     return await modal.present();
                this.router.navigate(['/add-vendor', { type: 'vendorPage' }]);
                return [2 /*return*/];
            });
        });
    };
    VendorListPage.prototype.selectVendor = function (vendor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelCtrl.dismiss(vendor)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VendorListPage.prototype.modelClose = function () {
        this.modelCtrl.dismiss();
    };
    //-----------------------------------Update vendor----------------------------------------//
    VendorListPage.prototype.updateVendor = function (vendor) {
        console.log(vendor);
        var param = { data: vendor, param: 'updateVendor' };
        this.router.navigate(['/add-vendor', { type: 'updateVendor', data: JSON.stringify(vendor) }]);
        // this.router.navigate(['/add-vendor'], {
        //   queryParams: {
        //     'type': 'updateVendor',
        //     'data':JSON.stringify(vendor)
        //   }, skipLocationChange: false
        //   });
    };
    __decorate([
        Input("type"),
        __metadata("design:type", Object)
    ], VendorListPage.prototype, "type", void 0);
    VendorListPage = __decorate([
        Component({
            selector: 'app-vendor-list',
            templateUrl: './vendor-list.page.html',
            styleUrls: ['./vendor-list.page.scss'],
        }),
        __metadata("design:paramtypes", [Constant, NavParams, ActivatedRoute, webServicenew, Router, ChangeDetectorRef, ModalController])
    ], VendorListPage);
    return VendorListPage;
}());
export { VendorListPage };
//# sourceMappingURL=vendor-list.page.js.map