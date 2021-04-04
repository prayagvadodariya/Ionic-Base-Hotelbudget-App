var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Constant } from "../../services/constant";
var PMSurveyDashboardPage = /** @class */ (function () {
    function PMSurveyDashboardPage(constant) {
        this.constant = constant;
        console.log(this.constant.MQYselectValue);
    }
    PMSurveyDashboardPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.pmSurveyDashboard();
        }, 1500);
    };
    PMSurveyDashboardPage.prototype.pmSurveyDashboard = function () {
        Highcharts.chart(this.chart.nativeElement, {
            chart: {
                type: 'pie',
                backgroundColor: "white",
                shadow: false,
                margin: [0, 0, 0, 0],
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
                // fontSize: '13px',
                verticalAlign: 'middle',
                useHTML: true,
                style: {
                    'padding-right': '100px',
                    'padding-left': '1px',
                    'padding-bottom': '1px',
                    'border-bottom': '1px solid #cccccc',
                    'text-align': 'center',
                },
                x: 0,
                y: -10,
            },
            subtitle: {
                text: '',
                align: 'center',
                verticalAlign: 'middle',
                x: 0,
                y: 20,
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    innerSize: '50%',
                    slicedOffset: 0,
                    borderWidth: 5,
                    dataLabels: {
                        enabled: true,
                    },
                },
            },
            legend: {
                labelFormatter: function () {
                    return this.name;
                }
            },
            tooltip: {
                enabled: false,
                valuePrefix: '$'
            },
            series: [{
                    type: 'pie',
                    name: 'Sales',
                    innerSize: '50%',
                    data: [{
                            name: 'Chrome',
                            y: 61.41,
                            sliced: true,
                            selected: true
                        }, {
                            name: 'Internet Explorer',
                            y: 11.84
                        }, {
                            name: 'Firefox',
                            y: 10.85
                        }, {
                            name: 'Edge',
                            y: 4.67
                        }, {
                            name: 'Safari',
                            y: 4.18
                        }, {
                            name: 'Sogou Explorer',
                            y: 1.64
                        }, {
                            name: 'Opera',
                            y: 1.6
                        }, {
                            name: 'QQ',
                            y: 1.2
                        }, {
                            name: 'Other',
                            y: 2.61
                        }],
                }]
        });
    };
    __decorate([
        ViewChild("chart", { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], PMSurveyDashboardPage.prototype, "chart", void 0);
    PMSurveyDashboardPage = __decorate([
        Component({
            selector: 'app-pm-survey-dashboard',
            templateUrl: './pm-survey-dashboard.page.html',
            styleUrls: ['./pm-survey-dashboard.page.scss'],
        }),
        __metadata("design:paramtypes", [Constant])
    ], PMSurveyDashboardPage);
    return PMSurveyDashboardPage;
}());
export { PMSurveyDashboardPage };
//# sourceMappingURL=pm-survey-dashboard.page.js.map