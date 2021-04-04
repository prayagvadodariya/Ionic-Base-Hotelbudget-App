import { async } from '@angular/core/testing';
import { NetworkProviderService } from './../services/network-provider.service';
import { Component, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Platform, AlertController, ModalController, NavController, MenuController, Events, IonRouterOutlet } from '@ionic/angular';
// import { ViewController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
//Services
import { Constant } from "../services/constant"
import { WebService } from "../services/webService";
import { webServicenew } from "../services/webServicenew";

//Helpers
import { NoInternetConnectionPage } from "../helper/no-internet-connection/no-internet-connection";
import { UpdateAppPage } from "../helper/update-app/update-app";

//pages
import { LoginPage } from '../pages/login/login.page';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { PmDashboardPage } from 'src/pages/pm-dashboard/pm-dashboard.page';
import { ManageRoomPage } from 'src/pages/manage-room/manage-room.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  backButtonAlertModel: any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  VERSION_UPDATE_DATA: any;
  rootPage: any;
  budgetSegment = true;
  M3flag: boolean;
  pages: any = [];
  icon: any;
  id:any;
  profileimg: any=[];
  scrollclass = false;
  userdata:any=[];
  activeSegment: any = "budgetModule";
  showStatusMenu: any;
  pmclick: any;
  budgetclick: any;
  sub: any[];
  PMPageslist: any;
  title: any;
  previousStatus: any;

  checkcalling = 0;
  checkexitbtnopen = false;
  browser: any;
 
  onInitPages() {
    //  console.log("active->>",);

   this.pages = [
    { 
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-dashboard',
      class: "icon-dashboard",
      active: true
    },
    {
      title: "Dashboard",
      url: '/gmdashboard',
      icon: 'icon-dashboard',
      class: "icon-dashboard",
      active: true
    },
    { 
      title: 'Update Forecast',
      url: '/update-forecast',
      icon: 'icon-dashboard',
      class: "icon-dashboard",
      active: true
     
    },
    { title: 'Add Expense',
      url: '/add-expense',
      icon: 'home',
      active: true 
    },
    { title: 'Search Expense',
      url: '/search',
      icon: 'icon-dashboard',
      class: "icon-dashboard",
      active: true
    },
    { title: 'Capital Expense',
      url: '/capitalExpense',
      icon: 'icon-dashboard',
      class: "icon-dashboard",
      active: true
    },
    { title: 'Capital Expense',
      url: '/CapitalExpenseInner',
      icon: 'icon-dashboard',
      class: "icon-dashboard",
      active: true
    },
    { title: 'Manage Vendor', 
      url: '/vendor-list',
      icon: 'icon-dashboard',
      class: "icon-dashboard",
      active: true,
     },
     { title: 'Pass On Notes', 
     url: '/pass-on-notes',
     icon: 'icon-dashboard',
     class: "icon-dashboard",
     active: true,
    },
    {
      title: 'Help',
      url: '/help',
      icon: 'home',
      active: true,
    },
  
    // {
    //   title: 'Add Team',
    //   url: '/add-team',
    //   icon: 'home',
    //   active: true,
    // },
   
    // {
    //   title: 'Work Order',
    //   url: '/work-order',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Create Work Order',
    //   url: '/create-work-order',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Work Order Details',
    //   url: '/work-order-details',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Manage Work Order',
    //   url: '/manage-work-order',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Exemption Certificate',
    //   url: '/exemption-certificate',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Tax Exempt',
    //   url: '/tax-exempt',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Add Tax Exempt',
    //   url: '/add-tax-exempt',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Service Request',
    //   url: '/service-request',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Service Request Details',
    //   url: '/service-request-details',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Add Request',
    //   url: '/add-request',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Edit Request',
    //   url: '/edit-request',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //     title: 'Report Budget',
    //     url: '/report-budget',
    //     icon: 'home',
    //     active: true,
    //   },
  {
    title: ' M3',
    children: [
      {
        title: 'Export Invoices',
        url: '/m3-export-invoice',
      },
      {
        title: 'Export Capital Invoices',
        url: '/m3-export-capital-invoices',
      },
      
    ],
  },
  ];

  this.PMPageslist = [
    {
      title: 'Dashboard',
      url: '/pm-dashboard',
      icon: 'home',
      class: "icon-dashboard",
      active: true,
    },
    {
      title: 'PM For Room',
      url: '/pm-survey2',
      icon: 'home',
      active: true,
    },
    {
      title: 'Manage PM Room',
      url: '/pm-survey-dashboard',
      icon: 'home',
      active: true,
    },
    //  {
    //   title: 'Manage Teams',
    //   url: '/manage-teams',
    //   icon: 'home',
    //   active: true,
    // },
    {
      title: 'General Cleaning',
      // url: '/web-view-show-page',
      icon: 'home',
      active: true,
    },
    {
      title: 'PM Forms',
      // url: '/web-view-show-page2',
      icon: 'home',
      active: true,
    },
    { title: 'Pass On Notes', 
     url: '/pass-on-notes',
     icon: 'icon-dashboard',
     class: "icon-dashboard",
     active: true,
    },
    {
      title: 'Help',
      url: '/help',
      icon: 'home',
      active: true,
      },
    // {
    //   title: 'Manage Rooms',
    //   url: '/manage-room',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Manage Items',
    //   url: '/manage-items',
    //   icon: 'home',
    //   active: true,
    // },
    // {
    //   title: 'Manage Category',
    //   url: '/manage-category',
    //   icon: 'home',
    //   active: true,
    // },
   
    // {
    //   title: 'view-pm-survey',
    //   url: '/view-pm-survey',
    //   icon: 'home',
    //   active: true,
    // },
    // 
    // {
    //   title: ' M3',
    //   children: [
    //     {
    //       title: 'Export Invoices',
    //       url: '/m3-export-invoice',
    //     },
    //     {
    //       title: 'Export Capital Invoices',
    //       url: '/m3-export-capital-invoices',
    //     },
    //   ],
    // }
   

  ];
  
}
 

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(public platform: Platform, private splashScreen: SplashScreen,private iab: InAppBrowser, private statusBar: StatusBar, public alertCtrl: AlertController,
    public network: Network, public constant: Constant, public modalCtrl: ModalController, public router: Router
    , public service: webServicenew, public navCtrl: NavController, public menu: MenuController, private screenOrientation: ScreenOrientation,public events: Events,private push: Push,public networkProvider: NetworkProviderService)
     {
      this.initializeApp();
      // console.log(this.constant.APP_VERSION);
   
   
    // this.CheckInternetConnection();
    //this.PushNotificationInit();
    platform.ready().then(async () => {
      splashScreen.hide();
    //  await this.CheckInternetConnection();
     await this.callnetworkevent();
    if(this.previousStatus != "offline"){
      await this.fristtimecallalldata();
      this.checkcalling = 1;
    }
     


    // back button event handle
    this.platform.backButton.subscribe(() => {
      this.backButtonEvent();
    });
    // this.CheckInternetConnection();
    setTimeout(() => {
      // this.CheckLoginSession();   
    }, 500);
   
   // this.GetAppVersion();
    
    });

  }

  initializeApp(){
    console.log('pages-', this.pages);
    this.onInitPages();
  }
    async fristtimecallalldata(){
      // tslint:disable-next-line: triple-equals
      if(this.previousStatus != 'offline'){

      
      
       localStorage.removeItem("isNotificationAlert");
       this.statusBar.styleDefault();
       this.statusBar.overlaysWebView(false);
       this.screenOrientationClick();
 
       this.events.subscribe('menudata', (data) => {
     // user and time are the same arguments passed in `events.publish(user, time)`
    //  console.log('Welcome', data );
       if(data){
         this.pages.splice(1, 0,{ 
         title: 'Update Forecast',
         url: '/update-forecast',
         icon: 'icon-dashboard',
         class: "icon-dashboard",
         active: true
         },
         { title: 'Add Expense',
           url: '/add-expense',
           icon: 'home',
           active: true 
         },
         { title: 'Search Expense',
           url: '/search',
           icon: 'icon-dashboard',
           class: "icon-dashboard",
           active: true
         
        }),
         this.pages.splice(5, 0,{
           title: 'Manage Vendor',
           url: '/vendor-list',
           icon: 'icon-dashboard',
           class: "icon-dashboard",
           active: true
         }),
         this.pages.splice(6, 0,{
           title: 'Pass On Notes', 
           url: '/pass-on-notes',
           icon: 'icon-dashboard',
           class: "icon-dashboard",
           active: true,
         })
       }
       
        })
 
      this.events.subscribe('menudatahide', (data) => {
        if(data){
          // console.log("delete");
          this.initializeApp();
          this.pageActiveMethod();
            
        }
        
        });
      this.events.subscribe('LogoutSession', (data,data0) => {
        if (data) {
          // localStorage.setItem('introShow', 'true');
          localStorage.removeItem('v_access_token');
          localStorage.removeItem('userData');
          localStorage.removeItem('setting');
          localStorage.removeItem('isNotificationAlert');
          localStorage.removeItem('HotelList');
          localStorage.removeItem('department_data');
          localStorage.removeItem('profile_image');
          localStorage.removeItem('UserName');
          localStorage.removeItem('Password');
          localStorage.removeItem('tabIndex');
          localStorage.removeItem('NotificationCount');
          localStorage.removeItem('pm_notifivation');
          localStorage.removeItem('viewimg');
          this.navCtrl.navigateRoot('/login');
        }else if(data0){
          localStorage.removeItem('v_access_token');
          localStorage.removeItem('userData');
          localStorage.removeItem('setting');
          localStorage.removeItem('isNotificationAlert');
          localStorage.removeItem('HotelList');
          localStorage.removeItem('department_data');
          localStorage.removeItem('profile_image');
          localStorage.removeItem('UserName');
          localStorage.removeItem('Password');
          localStorage.removeItem('tabIndex');
          localStorage.removeItem('NotificationCount');
          localStorage.removeItem('pm_notifivation');
          localStorage.removeItem('viewimg');
          this.navCtrl.navigateRoot('/login');
        }
        });
        await this.getDataFilterClick();
      

      }

    }


  //------------------------------Screen Orientation-----------------------------------//

  screenOrientationClick() {
    // console.log(this.screenOrientation.type);
    if (this.screenOrientation.type == 'landscape-primary') {
      this.scrollclass = true;
      // console.log(this.scrollclass);
    }
    else { this.scrollclass = false; }
    // if(this.device.platform)
    // {
    //   console.log("platformmmm");
    //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    // }
    this.screenOrientation.onChange().subscribe(
      () => {
        // console.log(this.screenOrientation.type);
        // console.log("Orientation Changed");
        if (this.screenOrientation.type == 'landscape-primary') {
          this.scrollclass = true;
          // console.log(this.scrollclass);
        }
        else { this.scrollclass = false; }
      }
    );

  }
  getDataFilterClick()
  {
    // DateFilterApi
    this.constant.LoadingPresent2();
    this.service.DateFilterApi().subscribe(async (result) => {
      // console.log("111111",result);
      this.constant.LoadingHide();
      if (result.status) {
        this.constant.dateFilterData = result.data;
        await this.checkEventSubcribe();
        await this.CheckLoginSession();
        // console.log(this.constant.dateFilterData);
       
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, (error) => {
      this.constant.Logout(error);
    });
  }

  //------------------------------Event Subcribe-----------------------------------//
  checkEventSubcribe()
  {

    // this.events.subscribe("updateProfile", data => {
    //   if (data) {
    //     console.log("updateProfile Event");
    //     console.log(data);
    //     this.userdata = data.data;
    //     if (this.userdata.v_profile_image) {
    //       // this.isImage = true;
    //       this.profileimg = data.image +"?t="+ new Date().getTime();
    //     }
    //     // } else {
    //     //   // this.isImage = false;
    //     //   this.profileimg = this.constant.getFirstLastCharacter(data.data.);
    //     // }
    //     this.pageActiveMethod();
    //   }
    // });
    this.events.subscribe('pm-survey-dashboard', (data) => {
      // this.router.navigate('/pm-survey-dashboard');
      this.navCtrl.navigateRoot('/pm-survey-dashboard');
    });
    
    this.events.subscribe('userloggedin', (data) => {
      if (data) {
        // console.log(data);
       // this.userdata = data.data;
       
        this.userdata =  JSON.parse(localStorage.getItem("userData"))
        // console.log(this.userdata);
        var temp = this.userdata;
        this.userdata = temp;
        this.profileimg = localStorage.getItem('profile_image') + this.userdata.profileimg+"?t="+ new Date().getTime();
        // console.log("profileimage",this.profileimg);
        this.initializeApp();
        this.pageActiveMethod();
        // this.userName = this.userdata.v_full_name;
        // if (this.userdata.v_profile_image) {
        //   this.Profile = data.image.profile_image_url + this.userdata.v_profile_image;
        // }
        // else {
        //   this.Profile = 'assets/icon/default-thumb.svg';//this.constant.getFirstLastCharacter(this.userdata.v_full_name);
        // }
      }
    });
  }

  toggleMenu() {
    this.showStatusMenu = false;
    this.menu.toggle(); //Add this method to your button click function
  }
  //------------------------------Internet Connection-----------------------------------//

  async callnetworkevent(){
    await this.networkProvider.initializeNetworkEvents();
    // Offline event
    this.events.subscribe('network:offline', () => {
      // alert('network:offline ==> '+this.network.type);
      console.log("offline");
      this.previousStatus = "offline";
      this.presentInternetModal();
      });
      this.events.subscribe('network:online', () => {
        // alert('network:online ==> '+this.network.type);
        this.previousStatus = "online";

        this.finalcall();
        // if(this.checkcalling == 0){
        //   this.fristtimecallalldata();
        //   this.checkcalling = 1;
        // }
      });

  // Online event
      this.events.subscribe('dismissmodal', () => {
          // alert('network:online ==> '+this.network.type);
          console.log("online");
          this.previousStatus = "online";

          this.finalcall();
          if(this.checkcalling == 0){
            this.fristtimecallalldata();
            this.checkcalling = 1;
          }
          // this.fristtimecallalldata();
      });

  }


  async CheckInternetConnection() {
    var self = this;
    // await this.network.onDisconnect().subscribe(() => {
    //   console.log('network was disconnected :-(');
    //   this.previousStatus = "offline";
    //   self.presentInternetModal();
    // });
    // this.network.onConnect().subscribe(() => {
    //   console.log('network was connected :-)');
    //   this.finalcall();
    //   // alert("Method FirstPage onConnect");
    // });
   

  }

  finalcall(){
    if (this.platform.is("cordova")) {
      if (
        this.network.type === "wifi" ||
        this.network.type === "ethernet" ||
        this.network.type === "4g" ||
        this.network.type === "cellular"
      ) {
        
        this.previousStatus = "online";
         this.checkEventSubcribe();
        // console.log("Network error", this.previousStatus);
        // this.checkVersionApi();
      } else {
        //  this.checkVersionApi();
        this.previousStatus = "offline";
        this.presentInternetModal();
      }
    } else {
      // console.log(" cordova not available");
    }
  }

  async presentInternetModal() {

    if (this.previousStatus == "offline") {
      // console.log('offline');
      
      const profileModal = await this.modalCtrl.create({ component: NoInternetConnectionPage });
      //this.constant.isNetworkAvailablePage = true;
      await profileModal.present();

      profileModal.onDidDismiss().then((result) => {
        // console.log(result);
        // if (result) {
        //   // this.previousStatus = result.data.status;
        //   // if(  this.previousStatus == "online"){
        //   //     this.finalcall();
        //   // }
        // }
      });
    }else{
      this.previousStatus = "online";
    }
   

  }
  // async CheckInternetConnection() {
  //   var self = this;
  //   this.network.onDisconnect().subscribe(() => {
  //     console.log('network was disconnected :-(');
  //     if (!this.constant.isNetworkAvailablePage) {
  //       self.presentPaiementModal();
  //     }
  //   });

  //   if (this.platform.is('cordova')) {
  //     if (this.network.type === 'wifi' || this.network.type === 'ethernet' || this.network.type === '4g' || this.network.type === 'cellular') {
  //       console.log("Network error");
  //     } else {
  //       if (!self.constant.isNetworkAvailablePage) {
  //         self.presentPaiementModal();
  //       }
  //     }
  //   } else {
  //     console.log('cordova not available');
  //   }
  // }
  // async presentPaiementModal() {
  //   const profileModal = await this.modalCtrl.create({ component: NoInternetConnectionPage });
  //   this.constant.isNetworkAvailablePage = true;
  //   return await profileModal.present();
  //   await profileModal.dismiss(data => {
  //     console.log("93===" + data);
  //     if (data) {
  //       //this.GetExecutionDetailsDataApi();
  //     }
  //   });
  // }


  //------------------------------Back Button Alert-----------------------------------//
  async backButtonAlert() {
    this.backButtonAlertModel = await this.alertCtrl.create({
      header: 'Exit?',
      message: 'Do you want to exit the app?',
      backdropDismiss: false,
      buttons: [
        {
          text: '',
         //role: 'cancel',
          cssClass: 'icon-cancel',
          handler: () => {
            this.checkexitbtnopen = false;
            this.backButtonAlertModel = null;
          }
        },
        {
          text: 'Exit',
          cssClass: 'done-btn btnsize1',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    this.backButtonAlertModel.present();
  }

  //------------------------------Back Button -----------------------------------//
  backButtonEvent() {
    var temp=1;
    this.platform.backButton.subscribe(async () => {
      
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        // console.log("204==" + this.router.url);
        // console.log(outlet.canGoBack());
        // console.log(outlet);
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === '/login') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            navigator['app'].exitApp(); // work for ionic 4
          } else {
            if(this.checkexitbtnopen == false){
            // console.log("elseee");
            this.backButtonAlert();
            this.checkexitbtnopen = true;

            }
          }
        }
        else if(temp == 1) {
          if(this.checkexitbtnopen == false){
            this.backButtonAlert();
            temp = 2;
            this.checkexitbtnopen = true;
          }
            
          }
      });
    });
  }

  //------------------------------App Version-----------------------------------//
  // GetAppVersion() {
  //   var dic = {};
  //   dic['v_version'] = parseFloat(this.constant.APP_VERSION);
  //   dic['ti_os'] = this.constant.SetplatForm();
  //   console.log(dic);
  //   this.service.getAppVersion(dic).subscribe((result) => {
  //     console.log(result);
  //     if (result.status) {
  //       if (result.data.appVersion != this.constant.APP_VERSION) {
  //         if (result.data.forceUpdate) {
  //           this.constant.VERSION_UPDATE_DATA = result.data;
  //           console.log(this.constant.VERSION_UPDATE_DATA);
  //           this.rootPage = UpdateAppPage;
  //         } else {
  //           this.CheckLoginSession();
  //         }
  //       } else {
  //         this.CheckLoginSession();
  //       }
  //     } else {
  //       this.CheckLoginSession();
  //     }
  //   }, (error) => {
  //     this.constant.Logout(error);
  //   });
  // }


  //------------------------------Login Session-----------------------------------//
  CheckLoginSession() {
    // console.log((localStorage.getItem("userData")));
    
    if (JSON.parse(localStorage.getItem("userData")) == null || JSON.parse(localStorage.getItem("userData")) == "") {
      
      this.navCtrl.navigateRoot('/login');
      this.menu.enable(false);
      
     
    }
   
    // else if (localStorage.getItem("isAppLaunchFirstTime") == null) {
    // } 
    else {
      // this.onInitPages();
      // this.pageActiveMethod();
     
      this.userdata=JSON.parse(localStorage.getItem("userData"));
      console.log(this.userdata);

      this.profileimg = localStorage.getItem('profile_image') + this.userdata.profileimg+"?t="+ new Date().getTime();;
      // this.profileimg = localStorage.getItem('profile_image') + this.userdata.profileimg;
      this.menu.enable(true);
      

      if(this.userdata.roleId == 1){
        this.navCtrl.navigateRoot('/dashboard');
        // this.pageActiveMethod();
        // console.log("roal--1",this.userdata.roleId);
        
       
      }else if (this.userdata.roleId == 2){
        this.navCtrl.navigateRoot('/gmdashboard');
        // this.pageActiveMethod();
        // console.log("roal--2",this.userdata.roleId);
      
        
      }else if (this.userdata.roleId == 5){
        this.navCtrl.navigateRoot('/pm-dashboard');
        // console.log("roal--3",this.userdata.roleId);
        // this.pageActiveMethod();

      }else if (this.userdata.roleId == 6){
        this.navCtrl.navigateRoot('/pm-dashboard');
        // console.log("roal--3",this.userdata.roleId);
        // this.pageActiveMethod();

      }else if (this.userdata.roleId == 7){
        this.navCtrl.navigateRoot('/pm-dashboard');
        // console.log("roal--3",this.userdata.roleId);
        // this.pageActiveMethod();

      }
      this.pageActiveMethod();
      localStorage.removeItem('tabIndex');
    }

   

  }


  //------------------------------Logout-----------------------------------//
  async onLogout() {
    const alertmes = await this.alertCtrl.create({
      header: 'Sign Out',
      // subHeader: 'Subtitle',
      message: 'Are you sure you want to sign out ?',
      backdropDismiss: false,
      buttons: [
        {
          text: '', 
          // role: 'cancel',
          cssClass: 'icon-cancel',
           
          handler: () => {
            //this.navCtrl.navigateRoot('/dashboard');
          }
        },
        {
          text: 'yes',
          cssClass: 'done-btn btnsize1',
          handler: () => {
            this.onLogoutApiFunction();
          }
        }
      ]
    });
    return await alertmes.present();
  }

  onLogoutApiFunction() {
    this.userdata=JSON.parse(localStorage.getItem("userData"));
    var dic = {};
    dic["userLogId"] = this.userdata.userId;
    dic["userId"] = this.userdata.userId;
    dic["v_access_token"] = localStorage.getItem('v_access_token');
    // localStorage.getItem('v_access_token');
  
    this.constant.LoadingPresent();
    // console.log(dic);
    this.service.onLogoutApi(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        this.constant.ToastCustom(result.message, 'top');
        if (JSON.parse(localStorage.getItem("rememberChecked"))) {
          localStorage.removeItem("userData");
          localStorage.removeItem("setting");
          localStorage.removeItem("v_access_token");
          localStorage.removeItem('HotelList');
          localStorage.removeItem('department_data');
          localStorage.removeItem('profile_image');
          localStorage.removeItem('UserName');
          localStorage.removeItem('Password');
          localStorage.removeItem('tabIndex');
          localStorage.removeItem('NotificationCount');
          localStorage.removeItem('pm_notifivation');
          localStorage.removeItem('viewimg');
        }
        else
          localStorage.clear();
        this.menu.enable(false);
        this.navCtrl.navigateRoot('/login');
      } else {
        this.constant.ToastCustom(result.message, 'top');
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  budgetSegmentClick(event) {
    if(event){
      if(this.userdata.roleId==1){
        this.navCtrl.navigateRoot('/dashboard');
        this.menu.close();
      }else if(this.userdata.roleId==2){
        this.navCtrl.navigateRoot('/gmdashboard');
        this.menu.close();
      }
    }
    this.budgetclick= event.target.value;
    this.events.publish('segment0', {data: event.target.value});
    this.constant.pmstatus = '';
     console.log("1",this.budgetclick);
    
    this.budgetSegment = true;
  }
  pMSegmentClick(event) {
    if(event){
      this.navCtrl.navigateRoot('/pm-dashboard');
      this.menu.close();
      console.log("1",event);
      
    }
    
    this.pmclick= event.target.value;
    this.events.publish('segment', {data: event.target.value});
    this.constant.pmstatus = 'true'
    
    //  console.log("2",this.pmclick);
    this.budgetSegment = false;
  }

  openTab(data) {
    if(data.title =="General Cleaning"){
      this.iab.create('http://staging.ancubate.com/hotel-budget-web/pm/general-clean/generate', "_system", "location=yes,enableviewportscale=yes");
      //  console.log("gclen",data);
      }else if(data.title == "PM Forms"){
        this.iab.create('http://staging.ancubate.com/hotel-budget-web/pm/pm-form/manage', "_system", "location=yes,enableviewportscale=yes");
       console.log("pmform",data);
      }
   
    
    this.events.publish('menuactive', {data: data});
    if (data.url)
    {
      this.M3flag = false;
    }
    else {
      this.M3flag = true;
    }
  }

  settingClick() {
    this.events.publish('menuactive', {data: 'edit-profile'});
    this.router.navigate(['/profile']);
  //  if (this.router.navigate(['/profile']))
     this.menu.close();
  }
  /**
 * Push Notification code
 */
PushNotificationInit(){
  //alert('PushNotificationInit');
  // Permission
  this.push.hasPermission().then((res: any) => {
    //alert('iff');  
    //alert(JSON.stringify(res));  
    if (res.isEnabled) {
        // console.log('We have permission to send push notifications');
      } else {
        // console.log('We do not have permission to send push notifications');
      }
  });

  // init push
  const options: PushOptions = {
    
    android: {
      senderID: '1030069665506',
      clearBadge: false,
      clearNotifications: false,
    
    },
    ios: {
      alert: true,
      badge: false,
      sound: true,
      clearBadge: false,
      categories: {
          "invite": {
            "yes": {"callback": "notification", "title": "POST", "foreground": true, "destructive": false},
            "no": {"callback": "apps.dismiss", "title": "DISMISS", "foreground": false, "destructive": false},
          }
      }
},
    windows: {}
  };

  // Recieve notification
  const pushObject: PushObject = this.push.init(options);
  pushObject.on('notification').subscribe((data: any) => {
    
    window.localStorage.setItem('notistatus','true');
    // let alert = this.alertCtrl.create({
    //   title:'Notification'+'  '+ data.title,
    //   subTitle: data.message,
    //   buttons: ['Ok']
    // });
    // alert.present();
    this.AlertCustom(data.title,data.message,'Top');
  });
  

  // Get Device Token
  pushObject.on('registration').subscribe((registration: any) => {
   
    alert('DeviceID=>'+ registration.registrationId);
    // console.log('DeviceID=>'+JSON.stringify(registration.registrationId));
    localStorage.setItem('DeviceID',registration.registrationId);
    //this.convensionPushNotification(registration.registrationId);
  });

  pushObject.on('error').subscribe(error => {

    alert('Error with Push plugin'+ error)
  });

}
async AlertCustom(Titles, Message, BtnTitle){

  const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      backdropDismiss: false,
      buttons: ['OK']
      });
      return await alert.present();
}
pageActiveMethod(){
  // console.log("index --> ",this.userdata.roleId);
  if (this.userdata.roleId == "1") {
    var index = this.pages.findIndex(p => p.url == '/gmdashboard');
    this.pages.splice(index,1);
    var index1 = this.pages.findIndex(p => p.url == '/CapitalExpenseInner');
    this.pages.splice(index1,1);
    var index2 = this.pages.findIndex(p => p.url == '/update-forecast');
    this.pages.splice(index2,1);
    var index3 = this.pages.findIndex(p => p.url == '/add-expense');
    this.pages.splice(index3,1);
    var index4 = this.pages.findIndex(p => p.url == '/search');
    this.pages.splice(index4,1);
    var index5 = this.pages.findIndex(p => p.url == '/vendor-list');
    this.pages.splice(index5,1);
    var index6 = this.pages.findIndex(p => p.url == '/pass-on-notes');
    this.pages.splice(index6,1);
  
    
    // var index = this.PMPageslist.findIndex(p => p.url == '/pm-survey');
    // this.PMPageslist.splice(index,1);

    // console.log("index for rola 1  page --> ",this.pages);
    
  } else if (this.userdata.roleId == "2"){ 
    var index = this.pages.findIndex(p => p.url == '/dashboard');
    this.pages.splice(index,1);
    var index1 = this.pages.findIndex(p => p.url == '/capitalExpense');
    this.pages.splice(index1,1);
    // var index = this.PMPageslist.findIndex(p => p.url == '/pm-survey');
    // this.PMPageslist.splice(index,1);
    // console.log("index for rola 2  page --> ",this.pages);
    
  }else if (this.userdata.roleId == "5"){   
    this.activeSegment="PMModule";
    // var index = this.PMPageslist.findIndex(p => p.url == '/manage-items');
    // this.PMPageslist.splice(index,1);
    // var index0 = this.PMPageslist.findIndex(p => p.url == '/manage-category');
    // this.PMPageslist.splice(index0,1);
    // var index = this.PMPageslist.findIndex(p => p.url == '/pm-survey');
    // this.PMPageslist.splice(index,1);
    this.pages=false;

    
    // console.log("index for rola 5  page --> ",this.PMPageslist);
    
  }else if (this.userdata.roleId == "6"){   
    this.activeSegment="PMModule";
   
    this.pages=false;
    // console.log("index for rola 6  page --> ",this.PMPageslist);
    
  }else if (this.userdata.roleId == "7"){   
    this.activeSegment="PMModule";

    // var index = this.PMPageslist.findIndex(p => p.url == '/manage-room');
    // this.PMPageslist.splice(index,1);
    // var index0 = this.PMPageslist.findIndex(p => p.url == '/manage-items');
    // this.PMPageslist.splice(index0,1);
    // var index1 = this.PMPageslist.findIndex(p => p.url == '/manage-category');
    // this.PMPageslist.splice(index1,1);
    // var index2 = this.PMPageslist.findIndex(p => p.url == '/manage-teams');
    // this.PMPageslist.splice(index2,1);
    this.pages=false;
    // console.log("index for rola 6  page --> ",this.PMPageslist);
    
  }
 }
}
