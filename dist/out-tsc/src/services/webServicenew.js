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
var webServicenew = /** @class */ (function () {
    function webServicenew(constant, WebserviceHandler, http) {
        this.constant = constant;
        this.WebserviceHandler = WebserviceHandler;
        this.http = http;
        this.BASE_URL_NEW = this.constant.BASE_URL_NEW;
        this.BASE_URL = this.constant.BASE_URL;
    }
    //DateFilterApi
    webServicenew.prototype.DateFilterApi = function () {
        var URL = this.BASE_URL_NEW + 'Date_filter';
        return this.WebserviceHandler.Get(URL).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    // LoginApi
    webServicenew.prototype.GetLoginPageApi = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'user/login';
        // var URL = this.BASE_URL_NEW + 'user.php';
        return this.WebserviceHandler.Post(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getDashboardDataAPI
    webServicenew.prototype.getDashboardDataAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'Dashboard';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getVendorAPI
    webServicenew.prototype.getVendorAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'GetVendor';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getVendorAPI
    webServicenew.prototype.getCapitalExpenseAPI = function (Parameter) {
        console.log(Parameter);
        var URL = this.BASE_URL_NEW + 'CapitalExpense';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getCapitalHotelExpAPI
    webServicenew.prototype.getCapitalHotelExpAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'getCapitalExpenseData';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getNotificationListAPI
    webServicenew.prototype.getNotificationListAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'getAllNotifications.php';
        return this.WebserviceHandler.Post(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //approveNotificationAPI
    webServicenew.prototype.approveNotificationAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'approveNotification.php';
        return this.WebserviceHandler.Post(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //onLogoutApi
    webServicenew.prototype.onLogoutApi = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'user/logout';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getCapitalExpDataAPI
    webServicenew.prototype.getCapitalExpDataAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'getCapitalExpense';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getCategotyListAPI
    webServicenew.prototype.getCategotyListAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'Expense';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getExpenseListAPI
    webServicenew.prototype.getExpenseListAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'ExpenseRemaning';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getDepartmentListAPI
    webServicenew.prototype.getDepartmentListAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'GetDepartment';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getCategoryListAPI
    webServicenew.prototype.getCategoryListAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'CategoryList';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getConfirmExpenseAPI
    webServicenew.prototype.getConfirmExpenseAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'ConfirmExpense';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //serachExpenseAPI
    webServicenew.prototype.serachExpenseAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'SearchExpense';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //addVendorAPI
    webServicenew.prototype.addVendorAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'AddVendor';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //updateVendorClickAPI
    webServicenew.prototype.updateVendorClickAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'UpdateVendor';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //addExpenseAPI
    webServicenew.prototype.addExpenseAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'AddExpense';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getUserProfileAPI
    webServicenew.prototype.getUserProfileAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'ProfileView';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //changePasswordAPI
    webServicenew.prototype.changePasswordAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'changePassword';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //getCapitalExpenseAccountListAPI
    webServicenew.prototype.getCapitalExpenseAccountListAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'getCapitalExpenseAccountData';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //AddCapitalExpenseAccountAPI
    webServicenew.prototype.AddCapitalExpenseAccountAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'addCapitalExpenseAccountData';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //AddCapitalExpenseAPI
    webServicenew.prototype.AddCapitalExpenseAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'addCapitalExpenseData';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //deleteCapitalExpAPI
    webServicenew.prototype.deleteCapitalExpAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'deleteCapitalExpenseData';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    //updateCapitalExpenseAPI
    webServicenew.prototype.updateCapitalExpenseAPI = function (Parameter) {
        var URL = this.BASE_URL_NEW + 'updateCapitalExpenseData';
        return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(function (data) {
            return data.json();
        }, function (error) {
            return error;
        }));
    };
    webServicenew = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Constant, WebServiceHandler, Http])
    ], webServicenew);
    return webServicenew;
}());
export { webServicenew };
//# sourceMappingURL=webServicenew.js.map