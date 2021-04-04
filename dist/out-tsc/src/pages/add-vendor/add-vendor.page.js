var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder, Validators, } from "@angular/forms";
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
import { ActivatedRoute } from '@angular/router';
var AddVendorPage = /** @class */ (function () {
    // public navParams:NavParams;
    function AddVendorPage(fb, modelCtrl, navCtrl, activatedRoute, constant, service, changeDetect) {
        this.fb = fb;
        this.modelCtrl = modelCtrl;
        this.navCtrl = navCtrl;
        this.activatedRoute = activatedRoute;
        this.constant = constant;
        this.service = service;
        this.changeDetect = changeDetect;
        this.addVendor = true;
        this.updateVendor = false;
        this.activeSegment = 'addVendor';
        this.items = [];
        this.data = '';
        this.filterData = [];
        this.allData = [];
        this.getCountryList = [];
        this.userData = [];
        this.vendorArry = { vendorName: '', vendorCompany: '', vendorNumber: '', vendorEmail: '', vendorAddress: '', vendorCity: '', vendorState: '', vendorCountry: '', vendorZipCode: '', vendorPhone: '', vendorFax: '', departmentId: '' };
        // vendorArry = [];
        this.getStateList = [];
        this.getStartedButtonEnable = false;
        this.mediaType = '';
        this.vendorDetail = [];
        this.FormValtion();
        this.userData = this.constant.getUserData();
        if (this.activatedRoute.snapshot.paramMap.get('type')) {
            this.mediaType = this.activatedRoute.snapshot.paramMap.get('type');
            if (this.activatedRoute.snapshot.paramMap.get('data')) {
                this.vendorArry = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
                this.getVendorData = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
                console.log(this.vendorArry);
            }
        }
        else {
            this.mediaType = 'vendorModel';
        }
        console.log(this.mediaType);
    }
    AddVendorPage.prototype.ionViewWillEnter = function () {
        //this.mediaType = this.activatedRoute.snapshot.paramMap.get('type');
        //console.log(this.mediaType);
    };
    AddVendorPage.prototype.ngOnInit = function () {
        if (this.mediaType == 'updateVendor') {
        }
        this.data = '';
    };
    AddVendorPage.prototype.FormValtion = function () {
        this.vendorForm = this.fb.group({
            // v_vendor_name: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]'), Validators.required])],
            vendorNumber: ['', Validators.compose([Validators.maxLength(15), Validators.required])],
            vendorCompany: ['', Validators.compose([Validators.required])],
        });
    };
    AddVendorPage.prototype.addVendorTabClick = function () {
        this.addVendor = true;
        this.updateVendor = false;
    };
    AddVendorPage.prototype.updateVendorTabClick = function () {
        this.addVendor = false;
        this.updateVendor = true;
    };
    AddVendorPage.prototype.getCloseModel = function () {
        this.modelCtrl.dismiss();
    };
    //-------------------------------------Dynamic Country and State get -------------------------------------------------------//
    // getStateFunction() {
    //   let req={i_user_id:this.userData.i_user_id}
    //   this.service.getStateAPI(req).subscribe((result) => {
    //     if (result.status) {
    //       console.log(result);
    //       this.getCountryList = result.data;
    //     } else {
    //       this.constant.ToastCustom(result.message, 'top');
    //     }
    //   }, error => {
    //     this.constant.Logout(error);
    //   });
    // }
    // onSelectChange(event) {
    //   console.log("event==="+event);
    //   this.getStateList = [];
    //   this.changeDetect.detectChanges();
    //   this.setStateArrayFunction(event.target.value);
    // }
    // setStateArrayFunction(value) {
    //   console.log(value);
    //   for (var i = 0; i < this.getCountryList.length; i++) {
    //     console.log(this.getCountryList[i]);
    //     if (value == this.getCountryList[i].i_country_id) {
    //       this.vendorArry.vendorState = '';
    //       this.getStateList.push(this.getCountryList[i].states);
    //     }
    //     console.log(this.getStateList);
    //   }
    //   this.changeDetect.detectChanges();
    // }
    // onChangeState(event) {
    //   if (this.getStateList.length == 0)
    //     this.constant.ToastCustom('Please First  of select Country', 'top');
    // }
    AddVendorPage.prototype.addVendorCLick = function (vendorarr) {
        console.log(this.vendorForm);
        console.log(vendorarr);
        if (!this.vendorArry.vendorNumber) {
            this.myInput.setFocus();
        }
        else if (!this.vendorArry.vendorCompany) {
            this.vendorCompany.setFocus();
        }
        else {
            this.addVendorParameter(vendorarr);
            //this.constant.ToastCustom('All * Fields are Required!', 'top');
        }
    };
    AddVendorPage.prototype.EmailvalidCheckEvent = function () {
        console.log(this.vendorArry.vendorEmail);
        if (this.vendorArry.vendorEmail) {
            if (this.constant.isValidEmail(this.vendorArry.vendorEmail)) {
                this.getStartedButtonEnable = false;
                this.changeDetect.detectChanges();
                return false;
            }
            else {
                this.getStartedButtonEnable = true;
                this.changeDetect.detectChanges();
                return true;
            }
        }
        else {
            this.getStartedButtonEnable = false;
        }
    };
    AddVendorPage.prototype.addVendorParameter = function (vendorarr) {
        console.log(vendorarr);
        vendorarr.userId = this.userData.userId;
        vendorarr.hotelId = this.constant.HotelId;
        console.log(vendorarr);
        if (this.mediaType) {
            // dic['i_vendor_id'] = this.vendorArry.i_vendor_id;
            vendorarr.vendorId = this.getVendorData.vendorId;
            vendorarr.updateVendor = 1;
            this.updateVendorAPI(vendorarr);
        }
        else {
            this.addVendorFunctionAPI(vendorarr);
        }
    };
    AddVendorPage.prototype.updateVendorAPI = function (dic) {
        var _this = this;
        console.log(dic);
        this.constant.LoadingPresent();
        this.service.updateVendorClickAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                console.log(result);
                //  this.getCountryList = result.data;
                _this.constant.ToastCustom(result.message, 'top');
                _this.navCtrl.navigateBack('/vendor-list');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    AddVendorPage.prototype.addVendorFunctionAPI = function (dic) {
        var _this = this;
        this.constant.LoadingPresent();
        this.service.addVendorAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                console.log(result);
                //  this.getCountryList = result.data;
                _this.constant.ToastCustom(result.message, 'top');
                _this.navCtrl.navigateRoot('/vendor-list');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    AddVendorPage.prototype.setFilteredItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.filterData = this.items.filter(function (item) {
                return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
            });
        }
        else {
            this.filterData = [];
        }
        console.log(this.filterData);
    };
    AddVendorPage.prototype.modelClose = function () {
        console.log("model close");
        this.modelCtrl.dismiss();
    };
    __decorate([
        ViewChild('input'),
        __metadata("design:type", Object)
    ], AddVendorPage.prototype, "myInput", void 0);
    __decorate([
        ViewChild('companyinput'),
        __metadata("design:type", Object)
    ], AddVendorPage.prototype, "vendorCompany", void 0);
    AddVendorPage = __decorate([
        Component({
            selector: 'app-add-vendor',
            templateUrl: './add-vendor.page.html',
            styleUrls: ['./add-vendor.page.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder, ModalController, NavController, ActivatedRoute, Constant, webServicenew, ChangeDetectorRef])
    ], AddVendorPage);
    return AddVendorPage;
}());
export { AddVendorPage };
//# sourceMappingURL=add-vendor.page.js.map