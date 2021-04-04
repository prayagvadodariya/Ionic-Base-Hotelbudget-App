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
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Constant } from './constant';
import { NavController } from '@ionic/angular';
var WebServiceHandler = /** @class */ (function () {
    function WebServiceHandler(http, constant, navCtrl) {
        this.http = http;
        this.constant = constant;
        this.navCtrl = navCtrl;
    }
    WebServiceHandler.prototype.Post = function (URL, Parameter) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        var Option = new RequestOptions({ headers: headers });
        console.log(Option);
        return this.http.post(URL, Parameter, Option).pipe(map(function (data) {
            console.log(data);
            return _this.requestResponseFunction(data);
        }, function (error) {
            return _this.requestResponseFunction(error);
            // return error;
        }));
    };
    WebServiceHandler.prototype.PostWithHeader = function (URL, Parameter) {
        var _this = this;
        console.log(JSON.parse(localStorage.getItem("v_access_token")));
        var accessToken = JSON.parse(localStorage.getItem("v_access_token"));
        console.log(accessToken);
        var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': accessToken });
        var Option = new RequestOptions({ headers: headers });
        return this.http.post(URL, Parameter, Option).pipe(map(function (data) {
            // return data;
            //  console.log(data);
            return _this.requestResponseFunction(data);
        }, function (error) {
            //   console.log(error);
            return _this.requestResponseFunction(error);
            //return error;
        }));
    };
    WebServiceHandler.prototype.GetWithHeader = function (URL) {
        var accessToken = JSON.parse(localStorage.getItem("v_access_token"));
        var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer' + accessToken });
        var Option = new RequestOptions({ headers: headers });
        return this.http.get(URL, Option).pipe(map(function (data) {
            return data;
        }, function (error) {
            return error;
        }));
    };
    WebServiceHandler.prototype.Get = function (URL) {
        var _this = this;
        return this.http.get(URL).pipe(map(function (data) {
            console.log(data);
            return _this.requestResponseFunction(data);
        }, function (error) {
            console.log('WebserviceHandler=>' + error);
            return error;
        }));
    };
    WebServiceHandler.prototype.requestResponseFunction = function (data) {
        if (data.status == 200 || data.status === 201) {
            //this.constant.ToastCustom('OK','top');
            return data;
        }
        // 400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415
        else if (data.status == 400 || data.status == 401 || data.status == 402 || data.status == 403 || data.status == 404 || data.status == 405 || data.status == 406 || data.status == 407 ||
            data.status == 408 || data.status == 409 || data.status == 410 || data.status == 411 || data.status == 412 || data.status == 413 || data.status == 414 || data.status == 415) {
            return this.constant.ToastCustom('Unauthorized', 'top');
            // this.navCtrl.navigateForward('/dashboard');
        }
        //500,501,502,503,504,505
        else if (data.status == 500 || data.status === 501 || data.status === 502 || data.status === 503 || data.status === 504 || data.status === 505) {
            console.log("sdfjsdfjjds");
            return this.constant.ToastCustom('Internal Server Error', 'top');
            //this.navCtrl.navigateForward('/dashboard');
            //return data;
        }
    };
    WebServiceHandler = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Constant, NavController])
    ], WebServiceHandler);
    return WebServiceHandler;
}());
export { WebServiceHandler };
//# sourceMappingURL=webServiceHandler.js.map