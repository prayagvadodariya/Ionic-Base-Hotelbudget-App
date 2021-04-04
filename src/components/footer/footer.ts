import { Component, Input } from '@angular/core';
import { Platform, NavController,Events, AlertController, NavParams, MenuController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Constant } from "../../services/constant";

// import { url } from 'inspector';


@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  placesService: any;

  markers = [];
  placedetails: any;
  ParamData: any = [];
  geocoder: any;
  // latitude:any;
  // longitude:any;
  authForm: any;
  //  / selectedIndex:any;
  myIndex: number;
  active: any;
  hotelId: any;
  userdata: any;

  @Input() public step: any;
  roleId: any;
  data: any;
  type: any;
  status: number;
  countnotification:any;
  
  constructor(public navCtrl: NavController, private router: Router,
     public constant: Constant, public events: Events) {
    // console.log('Hello MapComponent Component');
    this.userdata=JSON.parse(localStorage.getItem("userData"));
    this.countnotification = JSON.parse(localStorage.getItem('NotificationCount'));
      console.log(this.countnotification);
    if(this.userdata.roleId==1){
      this.hotelId = this.constant.HotelId;
      // console.log("1",this.hotelId);
    }else if(this.userdata.roleId==2){
      this.hotelId = this.userdata.hotelId;
      // console.log("2",this.hotelId);
    }
    this.authForm = true;
    this.roleId = this.userdata.roleId;

    this.events.subscribe('addexpenseclick',(data)=>{
      //  console.log(data);
      if(data == 'dashboard'){
        if(this.userdata.roleId == 1){
          if(p => p.url == '/dashboard'){
            this.active = 'dashboard';
            localStorage.setItem('tabIndex', this.active);
            this.navCtrl.navigateRoot('/dashboard');
          }else if(p => p.url == '/rmdashboard'){
            localStorage.setItem('tabIndex', this.active);
            this.active = 'dashboard';
          }  
        }else if(this.userdata.roleId == 2){
          this.active = 'dashboard';
          localStorage.setItem('tabIndex', this.active);
          this.navCtrl.navigateRoot('/gmdashboard');
        }
      }else if(data == 'gmdashboard'){
        if(this.userdata.roleId == 1){
          if(p => p.url == '/dashboard'){
            this.active = 'dashboard';
            localStorage.setItem('tabIndex', this.active);
            this.navCtrl.navigateRoot('/dashboard');
          }else if(p => p.url == '/rmdashboard'){
            localStorage.setItem('tabIndex', this.active);
            this.active = 'dashboard';
          }  
        }else if(this.userdata.roleId == 2){
          this.active = 'dashboard';
          localStorage.setItem('tabIndex', this.active);
          this.navCtrl.navigateRoot('/gmdashboard');
        }
      }
      this.countnotification = data.countdata; 
    });
    this.events.subscribe('NotificationCount',(data)=>{
      //  console.log(data);
      this.countnotification = data.countdata; 
    });
    
    this.events.subscribe('menuactive', (data) => {
      // console.log("dcata",data)
      if(data.data.title=="Dashboard"){
        // console.log("dc")
        this.active = 'dashboard'
        localStorage.setItem('tabIndex', this.active); 
      }else if(data.data.title=="Search Expense"){
        this.active = 'search'
        localStorage.setItem('tabIndex', this.active);
      }else if(data.data.title=="Manage Vendor"){
        this.active = 'vendor'
        localStorage.setItem('tabIndex', this.active);
      }else if(data.data.title=="Add Expense"){
        this.active = 'expense'
        localStorage.setItem('tabIndex', this.active);
      } 
      else if(data.data.title!="Dashboard"){
        // console.log("ac")
        this.active = ''
        localStorage.removeItem('tabIndex');
      }
     
    });
    this.events.subscribe('footershow', (data) => { 
    this.active = 'dashboard';
    // console.log("tab")
    });
    if(localStorage.getItem('tabIndex') != null){
      this.active = localStorage.getItem('tabIndex');
      // console.log("2")
     
    }
  }

  

  tab(data) {
    // console.log(data);

   
    if (data == 'dashboard'  ) {
     
      if(this.userdata.roleId == 1){
        if(p => p.url == '/dashboard'){
          this.active = 'dashboard';
          localStorage.setItem('tabIndex', this.active);
          this.navCtrl.navigateRoot('/dashboard');
        }else if(p => p.url == '/rmdashboard'){
          localStorage.setItem('tabIndex', this.active);
          this.active = 'dashboard';
        }  
      }else if(this.userdata.roleId == 2){
        this.active = 'dashboard';
        localStorage.setItem('tabIndex', this.active);
        this.navCtrl.navigateRoot('/gmdashboard');
      }
     
    }
    else if (data == 'expense'){
      this.active = 'expense';
      localStorage.setItem('tabIndex', this.active);
      this.navCtrl.navigateRoot('/add-expense');
    }
    else if (data == 'vendor') {
      this.active = 'vendor';
      localStorage.setItem('tabIndex', this.active);
      this.navCtrl.navigateRoot('/vendor-list');
    }
    else if (data == 'search') {
      this.active = 'search';
      localStorage.setItem('tabIndex', this.active);
      this.navCtrl.navigateRoot('/search');
    }
    else if (data == 'notification'){
      this.active = 'notification';
      localStorage.setItem('tabIndex', this.active);
      this.navCtrl.navigateRoot('/notifications');
    }
  }
}
