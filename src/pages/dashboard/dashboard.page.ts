import { Component, OnInit, ViewChild, ElementRef,ChangeDetectorRef} from '@angular/core';
import { Platform, NavController, AlertController, NavParams, MenuController, LoadingController, ModalController, ToastController, Events } from '@ionic/angular';
import { webServicenew } from '../../services/webServicenew';
import { Routes, RouterModule } from '@angular/router';
import { Constant } from "../../services/constant";

import * as Highcharts from 'highcharts';
import { IonSelect } from '@ionic/angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild('quaterSelect') quaterselectref: IonSelect;
  @ViewChild('yearSelect') yearselectRef: IonSelect;
  @ViewChild('weekSelect') weekselectRef: IonSelect;
  @ViewChild('monthSelect') monthselectRef: IonSelect;

  data: any;
  response: any;
  chartOptions: any;
  monthListArr: any = [];
  hearder: any = "Dashboard";
  MQYsegment: any;
  selectValue: any;
  getMQYtitle: any;
  notificationAlertModel: any;
  oldMQYsegment: any;
  currentYear: any;
  title: any;
  enableBackdropDismiss: true
  userData: any;
  getPieChartData: any = [];
  openProgress: any = false;
  lblMQY: any; hotelId: any;
  dashboardData: any; placeholder: any;
  SelectBrandData: any = []; progressCartData: any = []; progressCartDataList: any = [];
  yearDataList: any = []; quarterDataList: any = []; weekDataList: any = []; monthDataList: any = [];
  yearmodel: any; selectyear: any; quarterModel: any; monthModel: any; weekmodel: any;
  requestParam = { userId: 0, roleId: 0, hotel_id: 0, year: '', month: '', toMonth: '' };
  total_sales: string;
  total_expense_amount: any = [];
  total_budget_amount: any = [];
  expensePer: any;
  remaningAmount: any;
  total: any;
  expense: any;

  //reqParam={userId:0, roleId:0, year:2019,month:'May',toMonth:'May'};



  constructor(public alertController: AlertController, public service: webServicenew,
    public constant: Constant, public menu: MenuController, public alertCtrl: AlertController,
     public detectChange:ChangeDetectorRef,
    public navCtrl: NavController, public events: Events) {

    console.log('constructor ionViewDidEnter');
      
    this.userData = this.constant.getUserData();
    this.events.publish('menudatahide', {data:this.userData.hotelId});
    this.requestParam.userId = this.userData.userId;
    this.requestParam.roleId = this.userData.roleId;
    this.hotelId = this.constant.HotelId = 0;
    // console.log(this.requestParam);
    this.MQYsegment = 'month';
    this.oldMQYsegment = 'month';
  
    // this.ionViewDidEnter();
   
      // var totalsales = 0
      // this.sales_data.forEach(element => {
      // let total = element.total.replace(/,/g, "");
     
      // });
      // let totalsales = 23589
      // let ts = totalsales.toString();
      // var lastThree = ts.substring(ts.length - 3);
      // var otherNumbers = ts.substring(0, ts.length - 3);
      // if (otherNumbers != '')
      // lastThree = ',' + lastThree;
      // this.total_sales = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      
      // console.log("totalsales ", totalsales)
      // console.log("totalsales ", this.total_sales)
    
  }


  ngOnInit() {
    
    // console.log("hello....");
    // this.getDashboardchart(); 
  }

  selectsegment() {
    this.openProgress = false;
    // console.log(this.MQYsegment);
    if (this.MQYsegment == 'year') {
      this.title = 'Year';
      setTimeout(() => { this.yearselectRef.open(); }, 500)
      //  this.MQYsegment = this.oldMQYsegment;
    }
    else if (this.MQYsegment == 'quater') {
      let index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.quarterDataList = this.yearDataList[index].quarter;//this.constant.QuaterObject();
      // console.log(this.quarterDataList);
      this.title = 'Quarter';
      setTimeout(() => { this.quaterselectref.open(); }, 500)
      //this.MQYsegment = this.oldMQYsegment;
    }
    else if (this.MQYsegment == 'month') {
      let index = this.yearDataList.findIndex(record => record.id === this.currentYear);
      this.monthDataList = this.yearDataList[index].months;//this.constant.QuaterObject();
      // console.log(this.monthDataList);
      this.title = 'Month';
      setTimeout(() => { this.monthselectRef.open(); }, 500)
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

  }
  ionViewDidEnter() {
    console.log('dashbord ionViewDidEnter')
    this.openProgress = false;
    this.menu.enable(true);
    this.constant.year = '';
    this.constant.month = '';
    this.constant.toMonth = '';
    this.constant.HotelId = 0;

    this.currentYear = this.constant.currentYear();
    this.yearDataList = this.constant.dateFilterData;

    if (this.yearDataList) {
      this.requestParam.year = this.currentYear;
      if (this.yearDataList) {
        let index = this.yearDataList.findIndex(record => record.id === this.currentYear);
        this.quarterDataList = this.yearDataList[index].quarter;//this.constant.QuaterObject();
        let index1 = this.yearDataList.findIndex(record => record.id === this.currentYear);
        this.monthDataList = this.yearDataList[index1].months;//this.constant.QuaterObject();
        if (this.monthDataList) {
          for (var i = 0; i < this.monthDataList.length; i++) {
            if (this.monthDataList[i].current == true) {
              this.requestParam.month = this.monthDataList[i].name;
              this.requestParam.toMonth = this.monthDataList[i].name;
            }
          }
        }
        let index2 = this.yearDataList.findIndex(record => record.id === this.currentYear);
        this.weekDataList = this.yearDataList[index2].weeks;

      }
      this.getDashboardData();
      // if (localStorage.getItem("isNotificationAlert") == null)
      //   this.NotificationAlert();
      //   console.log("ionViewDidEnter");
    }
  }

  async NotificationAlert() {

    localStorage.setItem('isNotificationAlert', 'true');
    this.notificationAlertModel = await this.alertCtrl.create({
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
          handler: () => {
            this.notificationAlertModel = null;
          }
        },
        {
          text: 'View',
          cssClass: 'done-btn btnsize1',
          handler: () => {
            this.navCtrl.navigateRoot('/notifications');
          }
        }
      ]
    });
    this.notificationAlertModel.present();
  }

  getDashboardchart() {
    var self = this;
this.detectChange.detectChanges();
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
        height: (8 / 9 * 100) + '%',// 16:9 ratio
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
        text: 'Expense',
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
        y: 0,
      },
      subtitle: {
        //text: '<br><span style="font-size: 12px; color:#444444; font-weight:normal; padding:10px; display:block!important; line-height:15px; margin-top:5px!important;">' +'$'+ this.dashboardData.total_expense_amount+'</span>',
        text: '$' + this.total_expense_amount + '<br><span style="font-size: 12px; color:#444444; font-weight:normal; padding:10px; display:block!important; line-height:15px; margin-top:5px!important;">' + this.dashboardData.label + '</span>',
        align: 'center',
        verticalAlign: 'middle',
        x: 0,
        y: 35,
      },

      tooltip: {
        enabled: false,
        // formatter: function () {
        //   console.log(this.point);
        //   return this.key + ':<br>' + this.point.y
        // }
        //pointFormat: ' {point.value}<br> {series.name}:<b>{point.percentage:.1f}%</b>'
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
                // console.log(this.color);
                var sliceColor = this.color;
                const p = e
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

        }]
    });

  }
  demo(e, data) {
    this.openProgress = true;
    var index = this.getPieChartData.findIndex(id => id.hotelId === e.hotelId);
    this.progressCartDataList = this.getPieChartData[index];
    this.expense = this.constant.replace(this.progressCartDataList.expense)
    this.total = this.constant.replace(this.progressCartDataList.total)
    this.remaningAmount = this.constant.replace(this.progressCartDataList.remaningAmount)
   
    // this.expensePer = this.constant.replace(this.progressCartDataList.expensePer)
    // console.log("progressdata",this.progressCartDataList)
  }
  moveToPoint(clickPoint) {
    var points = clickPoint.series.points;
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
  }


  onselectChangeYear(data) {
    // console.log("315=============="+data);
    if (data == 'year') {
      this.requestParam.year = this.yearmodel;
      this.requestParam.month = 'Jan';
      this.requestParam.toMonth = 'Dec';
      if (this.yearmodel) {
        this.quarterModel = ''; this.monthModel = ''; this.weekmodel = '';
        this.constant.year = this.yearmodel;
        // console.log("getDashboardData");
        this.getDashboardData();
      }
    }
    this.oldMQYsegment = data;
  }
  onselectChangeQuarter(data) {
    // console.log("330============"+data);
    // console.log(this.quarterModel);
   // var response = this.constant.quaterFormat(this.quarterModel);
    // console.log(response);
    // this.requestParam.month = response.month;
    // this.requestParam.toMonth = response.toMonth;
    if (this.quarterModel == 'Q1') {
      this.requestParam.month = 'Jan';
      this.requestParam.toMonth = 'Mar';
    }
    else if (this.quarterModel == 'Q2') {
      this.requestParam.month = 'Apr';
      this.requestParam.toMonth = 'Jun';
    }
    else if (this.quarterModel == 'Q3') {
      this.requestParam.month = 'Jul';
      this.requestParam.toMonth = 'Sep';
    }
    else if (this.quarterModel == 'Q4') {
      this.requestParam.month = 'Oct';
      this.requestParam.toMonth = 'Dec';
    }

    if (this.quarterModel) {
      this.monthModel = ''; this.yearmodel = ''; this.weekmodel = '';
      this.getDashboardData();
    }
    this.oldMQYsegment = data;
  }
  onselectChangeMonth(data) {
    // console.log("360============="+this.monthModel);
    this.requestParam.month = this.monthModel.name;
    this.requestParam.toMonth = this.monthModel.name;
    if (this.monthModel) {
      this.yearmodel = ''; this.quarterModel = ''; this.weekmodel = '';
      this.getDashboardData();
    }
    this.oldMQYsegment = data;
  }

  onSelectChangeCancel() {
    this.MQYsegment = this.oldMQYsegment;
  }
  selectDashboardClick(event) {
    var data = event.target.value;
    this.constant.year = this.requestParam.year;
    this.constant.month = this.requestParam.month;
    this.constant.toMonth = this.requestParam.toMonth;
    this.constant.HotelId = data.hotelId;
    this.constant.hotelName = data.hotelName;
    // console.log("selected id",event.hotelId);
    // this.events.publish('menuactive', this.constant.HotelId,Date.now());
    
    this.events.publish('menudata', {data: event.hotelId});
    this.navCtrl.navigateRoot('/rmdashboard');
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
  }
  selectSubDashboardClick(event) {
    // console.log(event.hotelId);
    this.constant.year = this.requestParam.year;
    this.constant.month = this.requestParam.month;
    this.constant.toMonth = this.requestParam.toMonth;
    this.constant.HotelId = event.hotelId;
    this.constant.hotelName = event.hotelName;
    // console.log("selected id",event.hotelId);
    this.events.publish('menudata', {data: event.hotelId});
    this.navCtrl.navigateRoot('/rmdashboard');
  }

  async getDashboardData() {
    console.log("getDashboardData");
    this.events.publish('footershow', {da:1});
    console.log(this.requestParam);
    this.constant.LoadingPresent();
    this.service.getDashboardDataAPI(this.requestParam).subscribe((result) => {
      this.constant.LoadingHide();
      console.log('result-',result);
      if (result.status) {
        this.constant.ToastCustom(result.message, 'top');
        if (localStorage.getItem("isNotificationAlert") == null)
          this.NotificationAlert();
        this.dashboardData = result.data;
        this.total_expense_amount = this.constant.replace(this.dashboardData.total_expense_amount);
        this.total_budget_amount = this.constant.replace(this.dashboardData.total_budget_amount);
        this.getPieChartData = result.data.chart_data;
        this.SelectBrandData = result.data.drop_down;
        this.events.publish('NotificationCount',{countdata:result.data.notificationCount});
        localStorage.setItem("HotelList", JSON.stringify(this.SelectBrandData));
        localStorage.setItem("NotificationCount", result.data.notificationCount);
        //this.constant.hotelList = 
        if (this.dashboardData.total_expense_amount > 0) {
          setTimeout(() => {
            this.getDashboardchart();
          }, 500);
        }
        this.detectChange.detectChanges();
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
      this.constant.LoadingHide();
    }, error => {
      // console.log("gsgasgas");
      this.constant.Logout(error);
    });
  }
  
  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    setTimeout(() => {
      // console.log('Async operation has ended');
     
      // this.ionViewWillEnter();
      this.ionViewDidEnter();
      event.target.complete();
    }, 500);
  }
}