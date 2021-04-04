import { Component, OnInit, ViewChild } from "@angular/core";
import { Constant } from "../../services/constant";
import { webServicenew } from "../../services/webServicenew";
import { IonSelect, NavController } from "@ionic/angular";
import * as Highcharts from "highcharts";
import { Router } from '@angular/router';
// import { type } from "os";
// import * as Exporting from 'highcharts/modules/exporting';

@Component({
  selector: "app-pm-dashboard",
  templateUrl: "./pm-dashboard.page.html",
  styleUrls: ["./pm-dashboard.page.scss"]
})

export class PmDashboardPage implements OnInit {
  @ViewChild("quaterSelect") quaterselectref: IonSelect;
  @ViewChild("yearSelect") yearselectRef: IonSelect;
  categorySegment: any = "category";
  headerTitle: any = "Category Status Survey";
  userData: any = [];
  HotelList: any = [];
  roomList: any = [];
  hotelId: any;
  roomId: any;
  MQYsegment: any;
  oldMQYsegment: any;
  title: any;
  tabValue: any = "category";
  currentYear: any;
  yearDataList: any = [];
  quarterDataList: any = [];
  requestParam: any;
  dashboardchartData: any;
  roomStatusChart: any;
  iscateChartClick: boolean;
  catagoryChartClickData: any = [];
  yearmodel: any;
  quarterModel: any;
  surveyStatus: any = []; arraylist: any = [];
  hotelName: any;
  statusdata: any;
  chartdata: any;
  datachart: any;
  chartdataname: any;
  option: any = [];
  selectdate: any;
  currentQuater: any;

  checktabpage = true;
  name: any;
  pmNotification: any;
  
  

  //buttonActive:any ='q';
  constructor(public service: webServicenew, public constant: Constant,private router: Router,public navCtrl: NavController) {
    this.userData = this.constant.getUserData();
    this.HotelList = JSON.parse(localStorage.getItem("HotelList"));
    // this.hotelId = this.constant.HotelId;
    if (this.userData.hotelId==0) {
      this.hotelId = this.HotelList[0].hotelId;
      this.constant.hotelName = this.HotelList[0].hotelName;
      this.constant.HotelId =  this.HotelList[0].hotelId;
     
      // console.log("1");
    }else if(this.userData.hotelId != 0){
      this.hotelId = this.userData.hotelId;
      this.constant.HotelId = this.userData.hotelId;
      // console.log("2");
    } 
    this.iscateChartClick = false;
    this.currentQuater = "Q1"
    this.MQYsegment = "year";
    this.oldMQYsegment = "year";

    this.currentYear = this.constant.currentYear();
    this.yearmodel = this.currentYear;
    this.yearDataList = this.constant.dateFilterData;
    this.selectdate = this.currentYear;
    this.getRoomlist();
  }
  

  ngOnInit() {
    
    // if (this.yearDataList) {
    //   const index = this.yearDataList.findIndex(
    //     record => record.id === this.currentYear
    //   );
    //   this.quarterDataList = this.yearDataList[index].quarter;
    // }
   
  }
  pmDashboardSurveyRecords(){
    this.requestParam = {
      hotelId: this.hotelId,
      roleId: this.userData.roleId,
      userId: this.userData.userId,
      room: this.roomId,
      year: this.yearmodel,
      quarter: this.quarterModel
    };
    this.constant.LoadingPresent();
    this.service.pmSurveyRecords(this.requestParam).subscribe((result) => {
      this.constant.LoadingHide();
        this.constant.LoadingHide();
        // console.log("statys",result);
        if (result.data) {
         this.statusdata = result.data;
         this.option = result.data.result;
        //  console.log("stataaaaaaa",this.statusdata);
          if (this.tabValue === "category") {
            this.generateChart();
          } else if (this.tabValue === "roomsurvey") {
            this.roomsurveyChart();
          }else if (this.tabValue === "status"){
            this.statusChart();
          }
          this.constant.ToastCustom(result.message, 'top');
        }else{
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );

  }
  selectsegment() {
    if (this.MQYsegment === "year") {
      this.title = "Year";
      setTimeout(() => {
        this.yearselectRef.open();
      }, 500);
    } else if (this.MQYsegment === "quater") {
      const index = this.yearDataList.findIndex(
        record => record.id === this.currentYear
      );
      this.quarterDataList = this.yearDataList[index].quarter;
      this.title = "Quarter";
      setTimeout(() => {
        this.quaterselectref.open();
      }, 500);
    }
  }

  segmentChanged(eve) {
    // console.log(eve.target.value);
    this.tabValue = eve.target.value;
    if (eve.target.value === "category") {
      this.checktabpage = true;
      this.headerTitle = "Category Status Survey";
      this.PmDashboardData();
    } else if (eve.target.value === "roomsurvey") {
      this.checktabpage =false;
      this.headerTitle = "Room Survey Status";
      // console.log("roomsurvey");
      setTimeout(() => {
        this.roomsurveyChart();
      }, 100);
    } else if (eve.target.value === "status") {
      this.checktabpage =true;

      this.headerTitle = "Survey Status";
      setTimeout(() => {
        this.pmDashboardSurveyRecords();
        this.statusChart();
      }, 100);
    }
  }

  onSelectChangeCancel() {
    //this.buttonActive = '';
    this.iscateChartClick = false;
    this.MQYsegment = this.oldMQYsegment;
  }

  changeHotel(eve) {
    this.hotelId = eve.target.value;
    this.constant.HotelId=this.hotelId;
    this.roomId = "";
    if (this.tabValue === 'status') {
      this.pmDashboardSurveyRecords();
    } else {
      this.getRoomlist();
      this.iscateChartClick = false;
    }
  }

  changeRoom(eve) {
    this.roomId = eve.target.value;
    if (this.tabValue === 'status') {
      this.pmDashboardSurveyRecords();
    } else {
      if (this.roomId) {
        this.PmDashboardData();
      }
      this.iscateChartClick = false;
    }

  }

  getRoomlist() {
    let dic = {
      hotelId: this.hotelId,
      roleId: this.userData.roleId,
      userId: this.userData.userId
    };
    this.constant.LoadingPresent();
    this.service.getPMgetRooms(dic).subscribe((result) => {
      this.constant.LoadingHide();
        // console.log(result);
        if (result.data) {
          this.roomList = result.data.rooms;
          this.hotelName = result.data.hotels[0].hotelName;
          this.constant.hotelName = this.hotelName
          this.pmNotification = result.data.count;
          localStorage.setItem("pm_notifivation", result.data.count);
          // console.log(this.hotelName);
          this.surveyStatus = result.data.surveyStatus;
          this.PmDashboardData();
          this.constant.ToastCustom(result.message, 'top');
        }else{
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }

  onselectChangeYear(data) {
   // this.buttonActive = 'y';
    // console.log(this.yearmodel);
    if (data === "year") {
      this.quarterModel = "";
      this.iscateChartClick = false;
      this.selectdate = this.yearmodel;
      this.currentYear = this.yearmodel;
      this.constant.year = this.yearmodel;
      if (this.tabValue === 'status') {
        this.pmDashboardSurveyRecords();
      } else {
        this.PmDashboardData();
      }
    }
    this.oldMQYsegment = data;
  }

  onselectChangeQuarter(data) {
    // console.log(this.quarterModel);
    // this.buttonActive = 'q';
    // this.getPmDashboardData();
    if (data === "quater") {
      this.iscateChartClick = false;
      this.selectdate = this.quarterModel + " - " + this.currentYear;
      if (this.tabValue === 'status') {
        this.pmDashboardSurveyRecords();
      } else {
        this.PmDashboardData();
      }
    }
    this.oldMQYsegment = data;
  }

  /**
   * Category Tab
   */

    PmDashboardData() {
    // console.log(this.tabValue);
    this.requestParam = {
      hotelId: this.hotelId,
      roleId: this.userData.roleId,
      userId: this.userData.userId,
      room: this.roomId,
      year: this.yearmodel,
      quarter: this.quarterModel
    };
    // this.constant.LoadingPresent();
    this.service.getPMDashboardData(this.requestParam).subscribe((result) => {
      this.constant.LoadingHide();
        // this.constant.LoadingHide();
        // console.log(result);
        if (result.data) {
          this.dashboardchartData = result.data.pieChartData.roomsCount;
          this.roomStatusChart = result.data.roomStatus;
          if (this.tabValue === "category") {
            this.generateChart();
          } else if (this.tabValue === "roomsurvey") {
            this.roomsurveyChart();
          }
          this.constant.ToastCustom(result.message, 'top');
        }else{
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      },
      error => {
        this.constant.Logout(error);
      }
    );
  }

  generateChart() {
    var i = 0;
    var optionArr = [];
    var optionObj = {};
    for(i=0 ; i<this.roomStatusChart.length; i++){
      if(this.roomStatusChart[i].y == 0){
         optionObj ={
          name: this.roomStatusChart[i].name,
          
          y: 1,
          color: this.roomStatusChart[i].color
        }
      }else{
         optionObj ={
          name: this.roomStatusChart[i].name,
          
          y: this.roomStatusChart[i].y,
          color: this.roomStatusChart[i].color
        }
      }
     
      optionArr.push(optionObj);
    }
    // console.log("datasets[i]",optionArr);
    const self = this;
    // Exporting(Highcharts);
    Highcharts.chart("getDashboardChart", {
      chart: {
        type: "pie",
        backgroundColor: "rgba(255, 255, 255, 0.0)",
        shadow: false,
        height: (8 / 9) * 100 + "%" // 16:9 ratio
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
        text: ""
      },
      tooltip: {
        enabled:false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          innerSize: "20%",
          slicedOffset: 0,
          borderWidth: 5,
          dataLabels: {
            enabled: true,
            distance: 5,
            style: {
              fontWeight: "bold",
              color: "black"
            }
          }
        },
        series: {
          point: {
            events: {
              click: function (e) {
                const p = e.point;
                self.categoryChartclick(p);
                self.moveToPoint(this);
              }
            }
          },
          
        }
      },
      legend: {
        labelFormatter: function () {
          return this.name;
        }
      },
      series: [
        {
          type: "pie",
          data: optionArr
        }
      ]
    });
  }

  categoryChartclick(data) {
    this.iscateChartClick = true;
    this.catagoryChartClickData = this.roomStatusChart[data.index];
    // console.log(this.catagoryChartClickData);
    // console.log(this.surveyStatus);

    
    //for (var i = 0; i < this.surveyStatus.length; i++) {
      this.arraylist=[];
      this.arraylist.push(
        {
          'id': this.surveyStatus[0].id,
          'name': this.surveyStatus[0].name,
          'count': this.catagoryChartClickData.status0
        },
        {
          'id': this.surveyStatus[1].id,
          'name': this.surveyStatus[1].name,
          'count': this.catagoryChartClickData.status1
        },
        {
          'id': this.surveyStatus[2].id,
          'name': this.surveyStatus[2].name,
          'count': this.catagoryChartClickData.status2
        },
        {
          'id': this.surveyStatus[3].id,
          'name': this.surveyStatus[3].name,
          'count': this.catagoryChartClickData.status3
        },
        {
          'id': this.surveyStatus[4].id,
          'name': this.surveyStatus[4].name,
          'count': this.catagoryChartClickData.status4
        },
        {
          'id': this.surveyStatus[5].id,
          'name': this.surveyStatus[5].name,
          'count': this.catagoryChartClickData.status5
        },
        {
          'id': this.surveyStatus[6].id,
          'name': this.surveyStatus[6].name,
          'count': this.catagoryChartClickData.status6
        }
      )
    //}
    // console.log(this.arraylist);
  }

  moveToPoint(clickPoint) {
    // console.log(clickPoint);
    this.name = clickPoint.options.name;
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

  PMStatusDetail(status)
  {
     console.log(status);
    var sendyearQuater,statusqy,yearsend;
    if(this.MQYsegment ==  'quater'){
      sendyearQuater =  this.quarterModel;
      yearsend = this.currentYear;
      statusqy = "quater"
    }else if(this.MQYsegment == "year"){
      sendyearQuater = this.currentYear;
      yearsend = this.currentYear;
      statusqy = "year"
    }
    let params={
      categoryId: this.catagoryChartClickData.categoryId,
      status:status == 1 ? 'all' : status.id ,
      sendqy:sendyearQuater,
      statusqydata:statusqy,
      yearsend1:yearsend,
       roomId:this.roomId};
    // this.router.navigate(['/pmDashboardStatus', { deptData: JSON.stringify(params),
      this.navCtrl.navigateForward(['/pmDashboardStatus', { deptData: JSON.stringify(params),
      status: JSON.stringify(status), name: JSON.stringify(this.name),
     }]);

  }


  /**
   * Room Survey Tab
   */
  roomsurveyChart() {
    // console.log(this.dashboardchartData);
    Highcharts.chart("getTRoomsurveyChart", {
      chart: {
        type: "pie",
        backgroundColor: "rgba(255, 255, 255, 0.0)",
        shadow: false,
        margin: 0,
        height: (8 / 9) * 100 + "%"
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
        text: "Total Rooms",
        align: "center",
        verticalAlign: "middle",
        useHTML: true,
        style: {
          "padding-right": "1px",
          "padding-left": "1px",
          "padding-bottom": "1px",
          "border-bottom": "1px solid #cccccc",
          "text-align": "center"
        },
        x: 0,
        y: 0
      },
      subtitle: {
        text:
          '<span style="font-size: 16px; color:#444444; font-weight:normal; padding:10px; display:block!important; line-height:15px; margin-top:7px!important;">' +
          this.dashboardchartData.total_rooms +
          '</span><br><span style="font-size: 12px; color:#444444; font-weight:normal; padding:10px; display:block!important; line-height:15px; margin-top:5px!important;">' +
          this.dashboardchartData.timeDuration +
          "</span>",
        align: "center",
        verticalAlign: "middle",
        x: 0,
        y: 35
      },

      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          borderWidth: 2,
          innerSize: "70%",
          depth: 45,
          size: "80%",
          dataLabels: {
            enabled: true,
            distance: 5,
            style: {
              fontWeight: "bold",
              color: "black"
            }
          }
        },
        series: {
          dataLabels: {
            rotation: 0,
            crop: false,
            formatter: function () {
              return this.point.name;
            }
          },

          point: {
            events: {
              click: function (e) {
                // var selectedIndex = this.index;
                // console.log(this.color);
                var sliceColor = this.color;
                const p = e;
                // self.demo(p.point, this);
                // self.moveToPoint(this);
              }
            }
          }
        }
      },
      legend: {
        labelFormatter: function () {
          return this.name;
        }
      },
      series: [
        {
          type: "pie",
          data: this.dashboardchartData.status
        }
      ]
    });
  }

  /**
   * Status Tab
   */
  statusChart() {
    var i = 0;
    var optionArr = [];
    for(i=0 ; i<this.option.length; i++){
      var optionObj ={
          type: "spline",
          color: this.option[i].color,
          data: this.option[i].data,
          name:this.option[i].name
      }
      optionArr.push(optionObj);
    }
    // var result = this.option.map(function(el) {
    //   var o = Object.assign({}, el);
    //   // o.isActive = type:"";
    //   return o;
    // })
    // console.log(option);
    // console.log("aasasa",);

    // console.log("this.option after for",optionArr);
    Highcharts.chart("Linecontainer", {
      chart: {
        type: "spline",
        backgroundColor: "rgba(255, 255, 255, 0.0)",
      },
      credits: {
        enabled: false
      },
      title: {
        text: ""
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        title: {
          text: "Months"
        },
        categories: this.statusdata._months
      },
      yAxis: {
        title: {
          text: "Status Counts",
          x: -9
        }
      },
      tooltip: {
        formatter: function () {
          return (
            "<br>" +
            this.series.name +
            ": <b>" +
            this.y +
            "</b>" +
            " (" +
            this.x +
            ")"
          );
        }
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: "#666666",
            lineWidth: 1
          }
        }
      },
      series: optionArr
    });
  }

  gotoNotification(){
    this.router.navigate(['/pm-notification']);
  }

  /**
   * 
   */

  clickQuarter(value){
    // console.log(value);
    //this.buttonActive = value;
    const index = this.yearDataList.findIndex(
      record => record.id === this.currentYear
    );
    this.quarterDataList = this.yearDataList[index].quarter;
    this.title = "Quarter";
    setTimeout(() => {
      this.quaterselectref.open();
    }, 500);
  }

  clickYear(value){
    // console.log(value);
    //this.buttonActive = value;
    this.title = "Year";
      setTimeout(() => {
        this.yearselectRef.open();
      }, 500);
  }
}
