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
import * as Highcharts from 'highcharts';
var ExportInvoicesPage = /** @class */ (function () {
    function ExportInvoicesPage() {
    }
    ExportInvoicesPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.getExportInvoicechart();
        }, 1500);
    };
    ExportInvoicesPage.prototype.getExportInvoicechart = function () {
        var data = [
            {
                value: '100',
                name: 'abc',
                label: "Red",
                y: 10553
            },
            {
                value: '50',
                name: 'xyz',
                label: "Green",
                y: 10588
            }
        ];
        Highcharts.chart('exportInvoice', {
            chart: {
                type: 'pie',
                backgroundColor: 'rgba(255, 255, 255, 0.0)',
                margin: 0,
                height: (7 / 12 * 100) + '%',
            },
            title: {},
            colors: ['#FDB45C', '#FDB45C'],
            credits: {
                enabled: false
            },
            subtitle: {
                text: ''
            },
            tooltip: {
            //   formatter: function () {
            //     console.log(this);
            //    // return this.key +'<br>'+ this.point.value
            // }
            //pointFormat: ' {point.value}<br> {series.name}:<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    borderWidth: 2,
                    depth: 0,
                    size: '110%',
                    dataLabels: {
                        enabled: true,
                        distance: 5,
                        style: {
                            fontWeight: 'bold',
                            color: 'black'
                        }
                    },
                }
            },
            series: [{
                    type: 'pie',
                    name: 'Value',
                    //  innerSize: '70%',
                    data: data,
                }]
        });
    };
    ExportInvoicesPage = __decorate([
        Component({
            selector: 'app-export-invoices',
            templateUrl: './export-invoices.page.html',
            styleUrls: ['./export-invoices.page.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], ExportInvoicesPage);
    return ExportInvoicesPage;
}());
export { ExportInvoicesPage };
//# sourceMappingURL=export-invoices.page.js.map