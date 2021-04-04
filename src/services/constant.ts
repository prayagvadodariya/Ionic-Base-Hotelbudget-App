
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController, Events, Platform } from '@ionic/angular';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device/ngx';

//import { WebService } from '../services/webService';

@Injectable()

export class Constant {

    APP_VERSION = '5';
    
    // LOCAL ***============================================================
    // BASE_URL = 'http://localhost/projects/hotel-budget-services-new/api/';
    // BASE_URL_NEW = 'http://localhost/projects/hotel-budget-services-new/api/';

    // STAGING ***==========================================================
    BASE_URL = 'http://staging.ancubate.com/hotel-budget-services-new/api/';
    BASE_URL_NEW = 'http://staging.ancubate.com/hotel-budget-services-new/api/';

    // LIVE ***==========================================================
        // WE ARE RELEASING (v5.3.1) ***=================================
            // BASE_URL = 'https://hotelbudget.us/api5.3.1/api/';
            // BASE_URL_NEW = 'https://hotelbudget.us/api5.3.1/api/';

        // CURRENT LIVE (v5.3) ***=======================================
            // BASE_URL = 'https://hotelbudget.us/api5.3/api/';
            // BASE_URL_NEW = 'https://hotelbudget.us/api5.3/api/';
        
  latitude: any;
  longitude: any;
  autocompleteItems: any;
  autocomplete: any;
  cityName: any;
  stateName: any;
  locationget: any = [];
  locationArr: any = [];
  dateFilterData: any = [];
  VERSION_UPDATE_DATA
  private loader: any;
  isNetworkAvailablePage: boolean = false;
  getDepartmentList: any = [];
  replacedata: any;
  passonnotes_back = false;

  constructor(public loadCtrl: LoadingController, public toastCtrl: ToastController, public alertController: AlertController, public http: Http,
    public Event: Events, public Platform: Platform, private device: Device) {
  }


  public CurrentViewActive = '';
  public UserDataArry: any;
  public SliderResponceArry = [];
  public APPLICATION_PLATFORM = 'android';
  public APPLICATION_VERSION = '5.0.0';
  public RoomArrySelection = [];
  DEVICE_TOKEN = '';
  public MQYselectValue;
  public CurrentActivePage = '';
  public year = '';
  public month = '';
  public toMonth = '';
  public HotelId = 0;
  public hotelName = '';
  public capitalHotelId = 0;
  public h_name = '';
  public pmstatus = '';
  public capitalHotelName = '';
  public reusername = localStorage.getItem("username");
  public repassword = localStorage.getItem("password");
  public userName = '';
  public password = '';

  public isLoading = false;

  //Alert
  // async AlertCustom(Titles, Message){

  //     const alert = await this.alertController.create({
  //         header: 'Alert',
  //         subHeader: Titles,
  //         message: Message,
  //         buttons: ['OK']
  //         });
  //         return await alert.present();


  // }

  
  async AlertCustom(Titles, Message, BtnTitle) {
    const alert = await this.alertController.create({
      header: Titles,
      //subHeader: 'Subtitle',
      message: Message,
      buttons: [BtnTitle]
    });
    return await alert.present();
  }

  // Toast Message
  async ToastCustom(message, positions) {
    if(message == "Data fetch successfully." || message == 'Successfully fetch data!'){

    }else{
      if(message == "Data not found."){
       
      }else{
        if(message == "Successfully fetch data!"){

        }else{
          if(message == "data"){

          }else{
            const toast = await this.toastCtrl.create({
              message: message,
              duration: 3000,
              // showCloseButton: false,
              // position: positions,
              position: "bottom",
              // cssClass: 'normalToast',
              //  closeButtonText: 'Done'
            });
            toast.present();
          }
         
        }
        
      }
    
    }
   
  }

  // Loading
  async LoadingPresent() {
    // await this.loadCtrl.create({
    //   // duration: 5000,
    // }).then(a => {
    //   a.present().then(() => {
    //     // console.log('presented');
    //     if (!this.isLoading) {
    //       a.dismiss().then(() => console.log('abort presenting'));
    //     }
    //   });
    // });


    //old code

    // this.loader = await this.loadCtrl.create({
    //   //  message: loadmsg
    // })
    // await this.loader.present();

    this.loader = await this.loadCtrl.create({
      duration: 2000,
     cssClass: 'loading-class',
     spinner: null,
     message: `
     <img  class="load"  src="assets/images/loader.svg">`,
   });
   await this.loader.present();
  }

  async LoadingHide() {

    // while (await this.loadCtrl.getTop() !== undefined) {
    //   await this.loadCtrl.dismiss();
    // }
    // this.loader = await this.loadCtrl.dismiss().then(()=>{
    //   this.loader = null;
    // })
    // .catch(e => console.log(e));

    //new code
    // this.isLoading = false;
    await this.loadCtrl.dismiss();

  }


   // Loading
   async LoadingPresent2() {
    // await this.loadCtrl.create({
    //   // duration: 5000,
    // }).then(a => {
    //   a.present().then(() => {
    //     // console.log('presented');
    //     if (!this.isLoading) {
    //       a.dismiss().then(() => console.log('abort presenting'));
    //     }
    //   });
    // });


    //old code

    // this.loader = await this.loadCtrl.create({
    //   //  message: loadmsg
    // })
    // await this.loader.present();

    this.loader = await this.loadCtrl.create({
     cssClass: 'loading-class',
     spinner: null,
     message: `
     <img  class="load"  src="assets/images/loader.svg">`,
   });
   await this.loader.present();
  }

 
  


  // Logout
  Logout(error) {
    this.LoadingHide();
    // console.log(error);
    if (error._body) {
      var responceData = JSON.parse(error._body);
      // console.log(responceData);
      // console.log(responceData.responce);
      if (responceData.response == 'Unvalid token.') {
        this.Event.publish('Logout');
      }
    }
  }


  getFirstLastCharacter(character) {
    var twoword = character.split(' ').slice(0, 2).join(' ');
    var matches = twoword.match(/\b(\w)/g);
    var c = matches.join('');
    var char = c.toUpperCase();
    return char;
  }
  SetplatForm() {
    if (this.Platform.is('android')) {
      return 1;
    } else if (this.Platform.is('ios')) {
      return 2;
    } else {
      return 0;
      // console.log("i am not exits");
    }
  }

  SetplatFormName() {
    if (this.Platform.is('android')) {
      return 'android';
    } else if (this.Platform.is('ios')) {
      return 'ios';
    } else {
      return 0;
      // console.log("i am not exits");
    }
  }

  // Get current User data
  getUserData() {
    var data = JSON.parse(localStorage.getItem('userData'));
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  //
  getHotelData() {
    var data = JSON.parse(localStorage.getItem('hotelId'));
    if (data) {
      return data;
    } else {
      return null;
    }
  }
  getDeviceId() {
    // console.log(this.device);
    if (this.device.uuid) {
      // console.log(this.device.uuid);
      return this.device.uuid;
    }
    else {
      var uuid = 123456;
      return uuid;
    }
  }
  //Session Expired
  LogoutSession(status) {
    // console.log(status);
    if (status == 'session_expired' || status == 'authentication_fail') {
      this.Event.publish('LogoutSession', { data: 'session_expired', data0: 'authentication_fail' });
    }
  }
  // InternetConnectionAlert(){
  //     this.CurrentViewActive = 'Internat Error.'
  //     var alert:any;
  //     alert = this.alertCtrl.create({
  //         title: 'Internet Connection',
  //         message: 'Please check your internet connection and try again.' ,
  //         buttons: [
  //         {
  //             text: 'Try Again',
  //             handler: (TeamMemberID) => {
  //             }
  //         }
  //         ]
  //     });
  //     alert.present();
  // }

  // CheckInternetConnection(){
  //     this.LoadingPresent();
  //     var URL = this.BASE_URL + 'api/user/VerifyForgotPasswordOTP?emailAddress=' + 'email' + '&otpCode=' + '';
  //      this.http.get(URL).map(data => {
  //         console.log(data);
  //         this.LoadingHide();
  //         data.json();
  //     }, error => {
  //         this.LoadingHide();
  //         if (error.error.status == 0) {
  //             this.InternetConnectionAlert();
  //         }
  //     });
  // }

  // Mobile Validation
  isValidMobile(mobile) {
    let regExp = /^[0-9]{10}$/;
    if (!regExp.test(mobile)) {
      return false;
    }
    return true;
  }

  //Fax Number Validation
  isValidFax(fax) {
    var re = /^\+[0-9]{1,1}-?[0-9]{3}-?[0-9]{7,7}$/;
    if (re.test(fax)) {
      return true;
    } else {
      return false;
    }
  }

  isValidEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  MonthObj = function () {
    var MonthObj = [
      { id: "Jan", value: "January" }, { id: "Feb", value: "February" }, { id: "Mar", value: "March" }, { id: "Apr", value: "April" }, { id: "May", value: "May" }, { id: "Jun", value: "June" },
      { id: "Jul", value: "July" }, { id: "Aug", value: "August" }, { id: "Sep", value: "September" }, { id: "Oct", value: "October" }, { id: "Nov", value: "November" }, { id: "Dec", value: "December" },];
    return MonthObj;
  };

  Quater = function () {
    var quarters = [{ id: "Q1", value: "Q1" }, { id: "Q2", value: "Q2" }, { id: "Q3", value: "Q3" }, { id: "Q4", value: "Q4" }];
    return quarters;
  };

  MonthName = function () {
    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
    return monthNames;
  };

  yearList = function () {
    var dateObj = new Date();
    var newdate = new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth())
    var year = newdate.getFullYear();
    var yearObj = [];
    for (var i = year - 2; i < year + 3; i++) {
      yearObj.push({ 'id': i, 'value': i });
    }
    return yearObj;
  }

  currentYear() {
    var dateObj = new Date();
    var newdate = new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth())
    var year = newdate.getFullYear();
    return year;
  }
  dateFormat(d) {
    //Jan 24,2020 format 
    // console.log(d);
    var monthNames = [ "Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec" ];
    var dateObj = new Date(d);
    var day = dateObj.getDate();
    var month = dateObj.getMonth();
    var monthIndex = dateObj.getMonth();
    var year = dateObj.getFullYear();
    var a = monthNames[monthIndex] + ' ' + day + ',' + year;
    // console.log(a);
    return a;
  }

  dateFormat2(d) {
    //January-2020 format 
    // console.log(d);
    var monthNames = ["January","February","March","April","May","June","July",
                      "August","September","October","November","December"];
    var dateObj = new Date(d);
    var day = dateObj.getDate();
    var monthIndex = dateObj.getMonth();
    var year = dateObj.getFullYear();
    var a = monthNames[monthIndex] + '-' + year;
    // console.log(a);
    return a;
  }


  quaterFormat(quarterModel) {
    var month; var toMonth;
    if (quarterModel === "Q1") {
      month = "1"; toMonth = "3";
      var res = { month: month, toMonth: toMonth };
      return res;
    } else if (quarterModel === "Q2") {
      month = "4";
      toMonth = "6";
      var res = { month: month, toMonth: toMonth };
      return res;
    } else if (quarterModel === "Q3") {
      month = "7";
      toMonth = "9";
      var res = { month: month, toMonth: toMonth };
      return res;
    } else if (quarterModel === "Q4") {
      month = "10";
      toMonth = "12";
      var res = { month: month, toMonth: toMonth };
      return res;
    }
  }
replace(replace){

    // if(replace.length > 3){
        this.replacedata= replace.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return this.replacedata;
  // }
  // let totalsales = 23589
  // let ts = replace.toString();
  // var lastThree = ts.substring(ts.length - 3);
  // var otherNumbers = ts.substring(0, ts.length - 3);
  // if (otherNumbers != '')
  // lastThree = ',' + lastThree;
  // this.replacedata = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  // return this.replacedata;
  
}

getstatus(status) {
    if (status === '0') 
        return '0 - Okay'
       else if (status === '1') 
        return '1 - Touchup'
        else if (status === '2') 
        return '2 - Repair'
        else if (status === '3') 
        return '3 - Replace'
        else if (status === '4') 
        return '4 - Out Of Order'
        else if (status === '5') 
      return 'Y - Yes'
      else if (status === '6') 
      return  'N - No'
    }
}
