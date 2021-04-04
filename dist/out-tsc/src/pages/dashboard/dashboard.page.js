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
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from "../../services/constant";
import * as Highcharts from 'highcharts';
import { IonSelect } from '@ionic/angular';
var DashboardPage = /** @class */ (function () {
    //reqParam={userId:0, roleId:0, year:2019,month:'May',toMonth:'May'};
    function DashboardPage(alertController, service, constant, menu, alertCtrl, navCtrl) {
        this.alertController = alertController;
        this.service = service;
        this.constant = constant;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.monthListArr = [];
        this.hearder = "Dashboard";
        this.getPieChartData = [];
        this.openProgress = false;
        this.SelectBrandData = [];
        this.progressCartData = [];
        this.progressCartDataList = [];
        this.yearDataList = [];
        this.quarterDataList = [];
        this.weekDataList = [];
        this.monthDataList = [];
        this.requestParam = { userId: 0, roleId: 0, hotel_id: 0, year: '', month: '', toMonth: '' };
        this.userData = this.constant.getUserData();
        console.log(this.userData);
        this.requestParam.userId = this.userData.userId;
        this.requestParam.roleId = this.userData.roleId;
        console.log(this.requestParam);
        this.MQYsegment = 'year';
        this.oldMQYsegment = 'year';
        console.log(this.constant.year);
        console.log(this.yearDataList);
    }
    DashboardPage.prototype.ngOnInit = function () {
        // this.getDashboardchart(); 
    };
    DashboardPage.prototype.selectsegment = function () {
        var _this = this;
        this.openProgress = false;
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
            // if(this.monthDataList)
            // {
            //   for(var i=0;i<this.monthDataList.length;i++)
            //   {
            //     if(this.monthDataList[i].current==true)
            //     {
            //       this.requestParam.month=this.monthDataList[i].id;
            //     }
            //   }
            // }
        }
        // else if (this.MQYsegment == 'week') {
        //   let index = this.yearDataList.findIndex(record => record.id === this.currentYear);
        //   this.weekDataList = this.yearDataList[index].weeks;//this.constant.QuaterObject();
        //   console.log(this.weekDataList);
        //   this.title = 'Week';
        //   setTimeout(() => { this.weekselectRef.open(); }, 500)
        //   //this.MQYsegment = this.oldMQYsegment;
        // }
    };
    DashboardPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.openProgress = false;
        this.menu.enable(true);
        this.currentYear = this.constant.currentYear();
        this.yearDataList = this.constant.dateFilterData;
        console.log(this.yearDataList);
        console.log(this.currentYear);
        if (this.yearDataList) {
            this.requestParam.year = this.currentYear;
            if (this.yearDataList) {
                var index = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
                console.log(this.yearDataList);
                this.quarterDataList = this.yearDataList[index].quarter; //this.constant.QuaterObject();
                console.log(this.quarterDataList);
                var index1 = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
                this.monthDataList = this.yearDataList[index1].months; //this.constant.QuaterObject();
                console.log(this.monthDataList);
                if (this.monthDataList) {
                    for (var i = 0; i < this.monthDataList.length; i++) {
                        if (this.monthDataList[i].current == true) {
                            this.requestParam.month = this.monthDataList[i].id;
                        }
                    }
                }
                console.log(this.requestParam.month);
                var index2 = this.yearDataList.findIndex(function (record) { return record.id === _this.currentYear; });
                this.weekDataList = this.yearDataList[index2].weeks;
            }
            this.getDashboardData();
            // if (localStorage.getItem("isNotificationAlert") == null)
            //   this.NotificationAlert();
            //   console.log("ionViewDidEnter");
        }
    };
    DashboardPage.prototype.NotificationAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        localStorage.setItem('isNotificationAlert', 'true');
                        _a = this;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Notification',
                                message: 'View New Requests?',
                                // backdropDismiss: this.enableBackdropDismiss,
                                backdropDismiss: false,
                                //enableBackdropDismiss: true,
                                buttons: [
                                    {
                                        text: '',
                                        // role: 'cancel',
                                        cssClass: 'icon-cancel',
                                        handler: function () {
                                            _this.notificationAlertModel = null;
                                        }
                                    },
                                    {
                                        text: 'View',
                                        cssClass: 'done-btn btnsize1',
                                        handler: function () {
                                            _this.navCtrl.navigateRoot('/gmdashboard');
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        _a.notificationAlertModel = _b.sent();
                        this.notificationAlertModel.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.getDashboardchart = function () {
        console.log(this.getPieChartData);
        console.log(this.dashboardData.total_expense_amount);
        var self = this;
        // var data = [
        //   { name: 'abc',y: 10553 ,hotelId:1,color: "#78be20",expensePer: 31.49},
        //   {   name: 'xyz', y: 10588 ,hotelId:1,color: "#78be20",expensePer: 31.49},
        //   {  name: 'xyz', y: 10588 ,hotelId:1,color: "#78be20",expensePer: 31.49},
        //   {  name: 'xyz',  y: 10588,hotelId:1,color: "#78be20",expensePer: 31.49}
        // ]
        Highcharts.chart('getDashboardChart', {
            chart: {
                type: 'pie',
                backgroundColor: 'rgba(255, 255, 255, 0.0)',
                shadow: false,
                // margin: [15, 20, 15, 20],
                margin: 0,
                height: (8 / 9 * 100) + '%',
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: 'Total Expense',
                align: 'center',
                //fontSize: '13px',
                verticalAlign: 'middle',
                useHTML: true,
                style: {
                    'padding-right': '1px',
                    'padding-left': '1px',
                    'padding-bottom': '1px',
                    'border-bottom': '1px solid #cccccc',
                    'text-align': 'center',
                },
                x: 0,
                y: -10,
            },
            subtitle: {
                //text: '<br><span style="font-size: 12px; color:#444444; font-weight:normal; padding:10px; display:block!important; line-height:15px; margin-top:5px!important;">' +'$'+ this.dashboardData.total_expense_amount+'</span>',
                text: '$' + this.dashboardData.total_expense_amount + '<br><span style="font-size: 12px; color:#444444; font-weight:normal; padding:10px; display:block!important; line-height:15px; margin-top:5px!important;">' + this.dashboardData.label + '</span>',
                align: 'center',
                verticalAlign: 'middle',
                x: 0,
                y: 20,
            },
            tooltip: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    // borderWidth: 2,
                    //       depth: 0,
                    //       innerSize: '70%',
                    //       dataLabels: {
                    //         enabled: true,
                    //       },
                    borderWidth: 2,
                    innerSize: '70%',
                    depth: 45,
                    size: '80%',
                    dataLabels: {
                        enabled: true,
                        distance: 5,
                        style: {
                            fontWeight: 'bold',
                            color: 'black'
                        }
                    },
                },
                series: {
                    dataLabels: {
                        rotation: 0,
                        crop: false,
                        formatter: function () {
                            return this.point.name;
                        },
                    },
                    point: {
                        events: {
                            click: (function (e) {
                                // var selectedIndex = this.index;
                                console.log(this.color);
                                var sliceColor = this.color;
                                var p = e;
                                self.demo(p.point, this);
                                self.moveToPoint(this);
                            })
                        }
                    }
                },
            },
            legend: {
                labelFormatter: function () {
                    return this.name;
                }
            },
            series: [
                {
                    type: 'pie',
                    data: this.getPieChartData,
                }
            ]
        });
    };
    DashboardPage.prototype.demo = function (e, data) {
        console.log(data.series.points);
        console.log(e.color);
        this.openProgress = true;
        var index = this.getPieChartData.findIndex(function (id) { return id.hotelId === e.hotelId; });
        console.log(index);
        this.progressCartDataList = this.getPieChartData[index];
        console.log(this.progressCartDataList);
    };
    DashboardPage.prototype.moveToPoint = function (clickPoint) {
        console.log(clickPoint);
        var points = clickPoint.series.points;
        console.log(points);
        var startAngle = 0;
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            if (p == clickPoint) {
                break;
            }
            startAngle += (p.percentage / 100.0 * 360.0);
        }
        clickPoint.series.update({
            startAngle: -startAngle + 180 - ((clickPoint.percentage / 100.0 * 360.0) / 2) // center at 180
        });
    };
    DashboardPage.prototype.onselectChangeYear = function (data) {
        if (data == 'year') {
            this.requestParam.year = this.yearmodel;
            this.requestParam.toMonth = '';
            this.requestParam.month = '';
            if (this.yearmodel) {
                this.quarterModel = '';
                this.monthModel = '';
                this.weekmodel = '';
                this.constant.year = this.yearmodel;
                this.getDashboardData();
            }
        }
        this.oldMQYsegment = data;
    };
    DashboardPage.prototype.onselectChangeQuarter = function (data) {
        console.log(data);
        console.log(this.quarterModel);
        var response = this.constant.quaterFormat(this.quarterModel);
        this.requestParam.month = response.month;
        this.requestParam.toMonth = response.toMonth;
        console.log(this.requestParam);
        if (this.quarterModel) {
            this.monthModel = '';
            this.yearmodel = '';
            this.weekmodel = '';
            this.getDashboardData();
        }
        this.oldMQYsegment = data;
    };
    DashboardPage.prototype.onselectChangeMonth = function (data) {
        console.log(this.monthModel);
        this.requestParam.month = this.monthModel;
        this.requestParam.toMonth = '';
        if (this.monthModel) {
            this.yearmodel = '';
            this.quarterModel = '';
            this.weekmodel = '';
            this.getDashboardData();
        }
        this.oldMQYsegment = data;
    };
    DashboardPage.prototype.onSelectChangeCancel = function () {
        this.MQYsegment = this.oldMQYsegment;
    };
    DashboardPage.prototype.selectDashboardClick = function (event) {
        console.log(event);
        console.log(event.target.value);
        var data = event.target.value;
        console.log(data);
        console.log(this.requestParam);
        this.constant.year = this.requestParam.year;
        this.constant.month = this.requestParam.month;
        this.constant.toMonth = this.requestParam.toMonth;
        this.constant.HotelId = data.hotelId;
        this.constant.hotelName = data.hotelName;
        this.navCtrl.navigateRoot('/gmdashboard');
        // var i_data=event.target.value.id;
        // if(this.dashboardData.filed_name=='Company')
        // {
        //   //this.requestParam.i_company_id=i_data;
        //   this.getDashboardData();
        // }
        // else if(this.dashboardData.i_filed_id=='i_hotel_id')
        // {
        //   localStorage.setItem("hotelId", data);
        //   this.navCtrl.navigateRoot('/gmdashboard');
        //   // this.requestParam.i_hotel_id=i_data;
        //   // this.getDashboardData();
        // }
    };
    DashboardPage.prototype.selectSubDashboardClick = function (event) {
        console.log(event.hotelId);
        this.constant.year = this.requestParam.year;
        this.constant.month = this.requestParam.month;
        this.constant.toMonth = this.requestParam.toMonth;
        this.constant.HotelId = event.hotelId;
        this.constant.hotelName = event.hotelName;
        this.navCtrl.navigateRoot('/gmdashboard');
    };
    DashboardPage.prototype.getDashboardData = function () {
        var _this = this;
        console.log(this.requestParam);
        this.constant.LoadingPresent();
        this.service.getDashboardDataAPI(this.requestParam).subscribe(function (result) {
            if (result.status) {
                console.log(result);
                if (localStorage.getItem("isNotificationAlert") == null)
                    _this.NotificationAlert();
                console.log("ionViewDidEnter");
                _this.dashboardData = result.data;
                console.log(_this.dashboardData.total_expense_amount);
                _this.getPieChartData = result.data.chart_data;
                _this.SelectBrandData = result.data.drop_down;
                localStorage.setItem("HotelList", JSON.stringify(_this.SelectBrandData));
                if (_this.dashboardData.total_expense_amount > 0) {
                    setTimeout(function () {
                        _this.getDashboardchart();
                    }, 1500);
                }
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
    __decorate([
        ViewChild('quaterSelect'),
        __metadata("design:type", IonSelect)
    ], DashboardPage.prototype, "quaterselectref", void 0);
    __decorate([
        ViewChild('yearSelect'),
        __metadata("design:type", IonSelect)
    ], DashboardPage.prototype, "yearselectRef", void 0);
    __decorate([
        ViewChild('weekSelect'),
        __metadata("design:type", IonSelect)
    ], DashboardPage.prototype, "weekselectRef", void 0);
    __decorate([
        ViewChild('monthSelect'),
        __metadata("design:type", IonSelect)
    ], DashboardPage.prototype, "monthselectRef", void 0);
    DashboardPage = __decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.page.html',
            styleUrls: ['./dashboard.page.scss'],
        }),
        __metadata("design:paramtypes", [AlertController, webServicenew, Constant, MenuController, AlertController,
            NavController])
    ], DashboardPage);
    return DashboardPage;
}());
export { DashboardPage };
//# sourceMappingURL=dashboard.page.js.map