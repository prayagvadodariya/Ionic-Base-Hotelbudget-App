import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-export-invoices',
  templateUrl: './export-invoices.page.html',
  styleUrls: ['./export-invoices.page.scss'],
})
export class ExportInvoicesPage implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.getExportInvoicechart();
    }, 1500);
  }
  getExportInvoicechart()
  {
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
      }]

    Highcharts.chart('exportInvoice', {
      chart: {
        type: 'pie',
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        margin: 0,
        height: (7/12 * 100) + '%',// 16:9 ratio
      },
      title: {
      
      },
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
  }

}
