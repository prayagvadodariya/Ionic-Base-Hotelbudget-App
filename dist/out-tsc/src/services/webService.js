var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { WebServiceHandler } from './webServiceHandler';
import { Constant } from './constant';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
var WebService = /** @class */ (function () {
    function WebService(constant, WebserviceHandler, http) {
        this.constant = constant;
        this.WebserviceHandler = WebserviceHandler;
        this.http = http;
        this.BASE_URL = this.constant.BASE_URL;
    }
    //----------------------------------Version---------------------------------------//
    //----------------------------------Version---------------------------------------//
    WebService.prototype.getAppVersion = function (Parameter) {
        var URL = this.BASE_URL + 'app-version/get';
        return this.WebserviceHandler.Post(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //----------------------------------User---------------------------------------//
    // LoginApi
    WebService.prototype.GetLoginPageApi = function (Parameter) {
        var URL = this.BASE_URL + 'Login';
        return this.WebserviceHandler.Post(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //onLogoutApi
    WebService.prototype.onLogoutApi = function (Parameter) {
        var URL = this.BASE_URL + 'Logout';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getUserProfileAPI
    WebService.prototype.getUserProfileAPI = function (Parameter) {
        var URL = this.BASE_URL + 'GetUser';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    WebService.prototype.GetForgotPasswordAPI = function (Parameter) {
        var URL = this.BASE_URL + 'ForgotPassword';
        return this.WebserviceHandler.Post(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //GetResetPasswordAPI
    WebService.prototype.GetResetPasswordAPI = function (Parameter) {
        var URL = this.BASE_URL + 'ForgotChangePassword';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //updateUserProfileAPI
    WebService.prototype.updateUserProfileAPI = function (Parameter) {
        var URL = this.BASE_URL + 'EditUser';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //changePasswordAPI
    WebService.prototype.changePasswordAPI = function (Parameter) {
        var URL = this.BASE_URL + 'ChangePassword';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getStateAPI
    WebService.prototype.getStateAPI = function (Parameter) {
        var URL = this.BASE_URL + 'GetState';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //addVendorAPI
    WebService.prototype.addVendorAPI = function (Parameter) {
        var URL = this.BASE_URL + 'AddVendor';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getVendorAPI
    WebService.prototype.getVendorAPI = function (Parameter) {
        var URL = this.BASE_URL + 'GetVendor';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //DateFilterApi
    WebService.prototype.DateFilterApi = function () {
        var URL = this.BASE_URL + 'DateFilterApi';
        return this.WebserviceHandler.Get(URL).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //------------------------------Capital Expense Module-----------------------------------//
    //getCapitalExpenseAccountListAPI
    WebService.prototype.getCapitalExpenseAccountListAPI = function (Parameter) {
        var URL = this.BASE_URL + 'GetCapitalExpenseAccountList';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //AddCapitalExpenseAPI
    WebService.prototype.AddCapitalExpenseAPI = function (Parameter) {
        var URL = this.BASE_URL + 'AddCapitalExpense';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //GetCapitalExpenseForEditAPI
    WebService.prototype.GetCapitalExpenseForEditAPI = function (Parameter) {
        var URL = this.BASE_URL + 'GetCapitalExpenseForEdit';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //editCapitalExpenseAPI
    WebService.prototype.editCapitalExpenseAPI = function (Parameter) {
        var URL = this.BASE_URL + 'EditCapitalExpense';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //AddCapitalExpenseAccountAPI
    WebService.prototype.AddCapitalExpenseAccountAPI = function (Parameter) {
        var URL = this.BASE_URL + 'AddCapitalExpenseAccount';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getGetDepartmentListAPI
    WebService.prototype.getDepartmentListAPI = function (Parameter) {
        var URL = this.BASE_URL + 'GetDepartmentList';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getCategoryListAPI
    WebService.prototype.getCategoryListAPI = function (Parameter) {
        var URL = this.BASE_URL + 'GetCategoryList';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getDashboardDataAPI
    WebService.prototype.getDashboardDataAPI = function (Parameter) {
        var URL = this.BASE_URL + 'Dashboard';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    // getvendorDetailAPI
    WebService.prototype.getvendorDetailAPI = function (Parameter) {
        var URL = this.BASE_URL + 'GetVendorForEdit';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //updateVendorClickAPI
    WebService.prototype.updateVendorClickAPI = function (Parameter) {
        var URL = this.BASE_URL + 'EditVendor';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //------------------------------------------Expense--------------------------------------------//
    //getConfirmExpenseAPI
    WebService.prototype.getConfirmExpenseAPI = function (Parameter) {
        var URL = this.BASE_URL + 'ConfirmExpense';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    WebService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Constant, WebServiceHandler, Http])
    ], WebService);
    return WebService;
}());
export { WebService };
//# sourceMappingURL=webService.js.map