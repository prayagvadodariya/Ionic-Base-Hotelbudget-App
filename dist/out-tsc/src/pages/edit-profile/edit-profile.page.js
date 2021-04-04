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
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Constant } from '../../services/constant';
import { NavController, ModalController, AlertController, ActionSheetController, Events } from '@ionic/angular';
import { webServicenew } from '../../services/webServicenew';
import { GetMediaHelper } from "../../helper/get-media-helper/get-media-helper";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
var EditProfilePage = /** @class */ (function () {
    function EditProfilePage(fb, activatedRoute, constant, service, actionSheetCtrl, modelCtrl, navCtrl, events, changeDetect, router, alertCtrl) {
        this.fb = fb;
        this.activatedRoute = activatedRoute;
        this.constant = constant;
        this.service = service;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modelCtrl = modelCtrl;
        this.navCtrl = navCtrl;
        this.events = events;
        this.changeDetect = changeDetect;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.UserDetailsArry = [];
        this.cryptoList = [];
        this.getCountryList = [];
        this.getStateList = [];
        this.getvalidFaxValue = false;
        this.getvalidFax = true;
        this.userData = this.constant.getUserData();
        // this.userDataArr= JSON.parse(this.activatedRoute.snapshot.paramMap.get('userInfo'));
        // console.log(this.userDataArr);
        console.log(this.userData);
        this.FormValtion();
        // this.getStateFunction();
    }
    EditProfilePage.prototype.ngOnInit = function () {
        this.cryptoList = [
            "Bitcoin",
            "Ethereum",
            "Bitcoin Cash",
            "Ripple",
            "Litecoin"
        ];
        this.getUserProfile();
    };
    // Fax pattern ="+1-123-1234567"
    EditProfilePage.prototype.FormValtion = function () {
        this.authForm = this.fb.group({
            first_name: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]'), Validators.required])],
            last_name: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]'), Validators.required])],
            email: ['', Validators.compose([Validators.pattern('[A-Z0-9.a-z0-9._]+@[a-z0-9.-]+\\.[a-z]{2,3}$'), Validators.required])],
            phone: ['', Validators.compose([Validators.required])],
            mobile: ['', Validators.compose([Validators.required])],
            // fax: ['', Validators.compose([Validators.pattern('^\\+[0-9]{1,1}-[0-9]{3}-[0-9]{7}$'), Validators.required])],
            address: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            zip: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(6), Validators.required])],
        });
    };
    //--------------------------------Blank Space Method--------------------------------------//
    EditProfilePage.prototype.noWhitespaceValidator = function (control) {
        console.log(control);
        var isWhitespace = (control.value || '').trim().length === 0;
        var isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    };
    //--------------------------------Password Match Method--------------------------------------//
    EditProfilePage.prototype.equalto = function (field_name) {
        return function (control) {
            var input = control.value;
            var isValid = control.root.value[field_name] == input;
            if (!isValid) {
                return { 'equalTo': { isValid: isValid } };
            }
            else {
                return null;
            }
        };
    };
    EditProfilePage.prototype.onChangeFaxClick = function (fax) {
        console.log(fax);
        var validFax = this.constant.isValidFax(fax);
        console.log(validFax);
        if (validFax) {
            this.getvalidFax = true;
        }
        else {
            this.getvalidFax = false;
        }
    };
    // getStateFunction() {
    //   let req={i_user_id:this.userData.i_user_id}
    //   this.service.getStateAPI(req).subscribe((result) => {
    //   //  this.constant.LoadingHide();
    //     if (result.status) {
    //       console.log(result);
    //       this.getCountryList = result.data;
    //       setTimeout(() => {
    //         this.country = 1;
    //       },200);
    //       this.changeDetect.detectChanges();
    //       setTimeout(() => {
    //         this.setStateArrayFunction(this.country);
    //       },200);
    //     } else {
    //       this.constant.ToastCustom(result.message, 'top');
    //     }
    //   }, error => {
    //     this.constant.Logout(error);
    //   });
    // }
    // onSelectChange(event) {
    //   console.log(event);
    //   this.i_country_id = event.target.value;
    //   this.getStateList = [];
    //   this.state='';
    //   this.changeDetect.detectChanges();
    //   this.setStateArrayFunction(event.target.value);
    // }
    // setStateArrayFunction(value) {
    //   console.log(value);
    //   for (var i = 0; i < this.getCountryList.length; i++) {
    //     console.log(this.getCountryList[i]);
    //     if (value == this.getCountryList[i].i_country_id) {
    //       this.getStateList.push(this.getCountryList[i].states);
    //     }
    //     console.log(this.getStateList);
    //     setTimeout(() => {
    //       this.state = 1;
    //     }, 500);
    //   }
    //   this.changeDetect.detectChanges();
    // }
    // onChangeState(event) {
    //   console.log(event);
    //   console.log(this.getStateList.length);
    //   if (this.getStateList.length == 0)
    //     this.constant.ToastCustom('Please First  of select Country', 'top');
    //   // else
    //   //this.state_id=event.target.value;
    // }
    EditProfilePage.prototype.getUserProfile = function () {
        var _this = this;
        var dic = { userId: this.userData.userId };
        this.constant.LoadingPresent();
        console.log(dic);
        this.service.getUserProfileAPI(dic).subscribe(function (result) {
            _this.constant.LoadingHide();
            if (result.status) {
                console.log(result);
                _this.UserDetailsArry = result.data.data;
                _this.events.publish("userloggedin", { data: result.data.data });
                // this.constant.ToastCustom(result.message, 'top');
                //  this.navCtrl.navigateRoot('/dashboard');
            }
            else {
                _this.constant.ToastCustom(result.message, 'top');
            }
        }, function (error) {
            _this.constant.Logout(error);
        });
    };
    EditProfilePage.prototype.userEditProfileClick = function () {
        console.log(this.UserDetailsArry);
        var dic = {};
        console.log(this.authForm.value);
        dic['userId'] = this.UserDetailsArry.userId,
            dic['v_first_name'] = this.authForm.value.first_name,
            dic['v_last_name'] = this.authForm.value.last_name,
            dic['v_email'] = this.authForm.value.email,
            dic['v_direct_phone'] = this.authForm.value.mobile,
            dic['v_cell_phone'] = this.authForm.value.phone,
            dic['v_fax'] = this.authForm.value.fax,
            dic['v_street_address'] = this.authForm.value.address,
            dic['v_state'] = this.authForm.value.state,
            dic['v_city'] = this.authForm.value.city,
            dic['v_zip'] = this.authForm.value.zip,
            dic['v_profile_image'] = '123456';
        dic['v_country'] = this.authForm.value.country;
        console.log(dic);
        //  this.constant.LoadingPresent();
        console.log(dic);
        // this.service.updateUserProfileAPI(dic).subscribe((result) => {
        //   this.constant.LoadingHide();
        //   if (result.status) {
        //     console.log(result);
        //     this.UserDetailsArry = result.data;
        //     localStorage.setItem("userData", JSON.stringify(result.data));
        //     localStorage.setItem("setting", JSON.stringify(result.setting));
        //     this.constant.ToastCustom(result.message, 'top');
        //     this.navCtrl.pop();
        //   } else {
        //     this.constant.ToastCustom(result.message, 'top');
        //   }
        // }, error => {
        //   this.constant.Logout(error);
        // });
    };
    EditProfilePage.prototype.userProfileUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alertmes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Profile Photo',
                            // subHeader: 'Subtitle',
                            //  message: 'Are you sure want to sign out?',
                            backdropDismiss: false,
                            cssClass: 'profile-main-pc',
                            buttons: [
                                {
                                    text: '',
                                    cssClass: 'profile-pic gallery-pic',
                                    handler: function () {
                                        _this.UploadImageMethod('Gallery');
                                    }
                                },
                                {
                                    text: '',
                                    cssClass: 'profile-pic camera-pic',
                                    handler: function () {
                                        _this.UploadImageMethod('camera');
                                    }
                                },
                                // {
                                //   text: 'Remove Photo',
                                //   cssClass: 'done-btn btnsize1',
                                //   handler: () => {
                                //     this.UploadImageMethod('camera');
                                //   }
                                // },
                                {
                                    text: '',
                                    // role: 'cancel',
                                    cssClass: 'icon-cancel',
                                },
                            ]
                        })];
                    case 1:
                        alertmes = _a.sent();
                        return [4 /*yield*/, alertmes.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EditProfilePage.prototype.UploadImageMethod = function (mediaType) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modelCtrl.create({
                            component: GetMediaHelper,
                            componentProps: {
                                type: mediaType
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditProfilePage = __decorate([
        Component({
            selector: 'app-edit-profile',
            templateUrl: './edit-profile.page.html',
            styleUrls: ['./edit-profile.page.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder, ActivatedRoute, Constant, webServicenew,
            ActionSheetController, ModalController, NavController, Events, ChangeDetectorRef,
            Router, AlertController])
    ], EditProfilePage);
    return EditProfilePage;
}());
export { EditProfilePage };
//# sourceMappingURL=edit-profile.page.js.map