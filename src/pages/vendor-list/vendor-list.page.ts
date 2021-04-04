import { Component, OnInit, ChangeDetectorRef,Input,Inject} from '@angular/core';
import { WebService } from '../../services/webService';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
import {NavController, NavParams,ModalController,MenuController, AlertController,ActionSheetController,ToastController} from '@ionic/angular';
import { AddVendorPage } from  "../add-vendor/add-vendor.page"
import { AddVendorPageModule } from '../add-vendor/add-vendor.module';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.page.html',
  styleUrls: ['./vendor-list.page.scss'],
})
export class VendorListPage implements OnInit {
  userData: any = [];
  req: any;
  getVendorList: any = [];
  infiniteScrollEnable = false;
  searchTimeintervalModel:any;
  SearchBox:any;
  searchInput:any;
  HotelName:any;
 // hotelId:any;
  @Input("type") type;
  @Input("hotelId") hotelId;
  @Input("hotelName") hotelName;
  message: any;
  message_title: any;

  constructor( public constant: Constant,public navCtrl: NavController,public activatedRoute: ActivatedRoute,public service: webServicenew, private router : Router,public changeDetect: ChangeDetectorRef,public modelCtrl: ModalController) {
    this.userData = this.constant.getUserData();
    // console.log("1",this.constant.capitalHotelId);
    // console.log("2",this.constant.HotelId);
    // console.log(this.constant.HotelId);
    
    if(this.userData.userId==1){
    this.HotelName = this.constant.hotelName;
    if(this.constant.HotelId==0){
      this.req={ hotelId :this.constant.capitalHotelId,userId: this.userData.userId,page:0,keyword:''}
      // console.log("subhb1",this.req);
    }else if (this.constant.HotelId!=0){
      this.req={ hotelId :this.constant.HotelId,userId: this.userData.userId,page:0,keyword:''}
      // console.log("subhb2",this.req);
    } 
  }
    // if(this.constant.HotelId!=0){
    //   this.req={ hotelId :this.constant.HotelId,userId: this.userData.userId,page:0,keyword:''}
    //   console.log("hb2",this.constant.capitalHotelId);
    // }
    else
    {
      this.HotelName =  this.constant.capitalHotelName;
      this.req={ hotelId :this.userData.hotelId,userId: this.userData.userId,page:0,keyword:''}
      // console.log("hb3",this.req);
    }
  }

  ngOnInit() { 
  }

  ionViewDidEnter(){
    this.req.page=0;
    this.getVendorFunction();
    // console.log(this.type);
  }
  
//----------------------------------Get Vendor Function----------------------------------------//

  getVendorFunction() {
    // console.log(this.req);
    this.constant.LoadingPresent();
    this.service.getVendorAPI(this.req).subscribe((result) => {
     
      if (result.status) {
        // console.log(result);
        this.message = result.setting.message;
        this.message_title = result.setting.message_title;
        this.getVendorList = result.data;
        // console.log(this.getVendorList);
        if (result.data.length < 20) {
          this.infiniteScrollEnable = false
        }
        else {
          this.infiniteScrollEnable = true;
        }
       this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
      this.constant.LoadingHide();
    }, error => {
      this.constant.Logout(error);
    });
  }

   //----------------------------------Infinite Scroll------------------------------------------//
  InfinitScrollingAPI(event) {
    if (this.getVendorList.length > 0) {
      this.req.page += 20;
    }
    this.constant.LoadingPresent();
    this.service.getVendorAPI(this.req).subscribe((result) => {
      this.constant.LoadingHide();
      event.target.complete();
      if (result.status) {
        // console.log(result);
        var getVendorList = result.data;
        for (let index = 0; index < getVendorList.length; index++) {
          this.getVendorList.push(getVendorList[index]);
        }
        // console.log(this.getVendorList);
        if (getVendorList.length < 20) {
          this.infiniteScrollEnable = false
        }
        else {
          this.infiniteScrollEnable = true;
        }
        this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }

  //-----------------------------------On Search Function----------------------------------------//
  onSearchInput(event){
    // console.log(event);
    this.req.page=0;
    this.req.keyword =event.target.value;
    clearInterval(this.searchTimeintervalModel);
    let self = this;
    this.searchTimeintervalModel = setInterval(function () {
      self.getVendorFunction();
      clearInterval(self.searchTimeintervalModel);
    }, 1500);
  }

  //----------------------------------Clear Search Function----------------------------------------//
  clearSearch(){
    this.SearchBox = false;
    this.req.keyword='';
    this.req.page=0;
    this.searchInput='';
    this.getVendorFunction();
  }
  async addVendorModel()
  {
    // let modal = await  this.modelCtrl.create({component:AddVendorPage,
    //   componentProps: {
    //    type: 'vendorModel'
    //   }
    // });
    // modal.onDidDismiss()
    // .then((data) => {
    // console.log(data);
    // })
    //     return await modal.present();
    this.navCtrl.navigateForward(['/add-vendor',{type: 'vendorPage'}]);
    // this.router.navigate(['/add-vendor',{type: 'vendorPage'}]);
  }


  async selectVendor(vendor) {
    await this.modelCtrl.dismiss(vendor);
  }

  modelClose()
  {
     this.modelCtrl.dismiss();
  }

  //-----------------------------------Update vendor----------------------------------------//
  updateVendor(vendor)
  {
    // console.log("vndata",vendor);
   var param={data:vendor,param:'updateVendor'}
   this.navCtrl.navigateForward(['/add-vendor',{type: 'updateVendor',data:JSON.stringify(vendor)}]);
    this.router.navigate(['/add-vendor',{type: 'updateVendor',data:JSON.stringify(vendor)}]);
    // this.router.navigate(['/add-vendor'], {

    //   queryParams: {
    //     'type': 'updateVendor',
    //     'data':JSON.stringify(vendor)
     
    //   }, skipLocationChange: false
     
    //   });
  }
  

  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    setTimeout(() => {
      // console.log('Async operation has ended');
     
     this.ionViewDidEnter();
     
      
      event.target.complete();
    }, 500);
  }
}


