import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl, } from "@angular/forms";
import { webServicenew } from '../../services/webServicenew';
import { Constant } from '../../services/constant';
import { ActivatedRoute } from '@angular/router';
import { VendorListPage } from '../vendor-list/vendor-list.page'
import { GetMediaHelper } from 'src/helper/get-media-helper/get-media-helper';
import { NoInternetConnectionPage } from "src/helper/no-internet-connection/no-internet-connection";
import { VendorComponent } from "src/helper/vendor/vendor.component";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.page.html',
  styleUrls: ['./add-vendor.page.scss'],
})

export class AddVendorPage implements OnInit {
  @ViewChild('input') myInput;
  @ViewChild('companyinput') vendorCompany;


  vendorForm: FormGroup;
  addVendor: any = true;
  updateVendor: any = false;
  activeSegment: any = 'addVendor';
  items: any[] = [];
  data: string = '';
  filterData = [];
  allData = [];
  getCountryList = [];
  userData: any = [];
  vendorArry = { vendorName: '', vendorCompany: '', vendorNumber: '', vendorEmail: '', vendorAddress: '', vendorCity: '', vendorState: '', vendorCountry: '', vendorZipcode: '', vendorPhone: '', vendorFax: '', departmentId: '' };
  // vendorArry = [];
  getStateList = [];
  getStartedButtonEnable = false;
  mediaType: any = '';
  vendorDetail: any = [];getVendorData:any;
  // public navParams:NavParams;
  constructor(public fb: FormBuilder, public modelCtrl: ModalController, public navCtrl: NavController, public activatedRoute: ActivatedRoute, public constant: Constant, public service: webServicenew, public changeDetect: ChangeDetectorRef) {
    this.FormValtion();
    this.userData = this.constant.getUserData();
    

    if (this.activatedRoute.snapshot.paramMap.get('type')) {
      this.mediaType = this.activatedRoute.snapshot.paramMap.get('type');
      if (this.activatedRoute.snapshot.paramMap.get('data')) {
        this.vendorArry = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
        this.getVendorData=JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
        // console.log(this.vendorArry);
      }
    }
    else {
      this.mediaType = 'vendorModel';
    }
    // console.log(this.mediaType);
  }
  ionViewWillEnter() {
    //this.mediaType = this.activatedRoute.snapshot.paramMap.get('type');
    //console.log(this.mediaType);
  }
 
  ngOnInit() {
    // if (this.mediaType == 'updateVendor') {
    // }
    // this.data = '';
  }
  
  FormValtion() {
    this.vendorForm = this.fb.group({
      vendorName: ['', Validators.compose([ this.noWhitespaceValidator])],
      vendorNumber: ['', Validators.compose([ Validators.required, this.noWhitespaceValidator])],
      vendorCompany: ['', Validators.compose([Validators.required,Validators.pattern('.*\\S.*[a-zA-Z]'),  this.noWhitespaceValidator])],
      vendorAddress: ['', Validators.compose([ ])],
      vendorCountry: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]')])],
      vendorState: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]')])],
      vendorCity: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]')])],
      vendorZipcode: ['', Validators.compose([  Validators.pattern('^[0-9]{6}$')])],
      vendorPhone: ['', Validators.compose([Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')])],
      vendorEmail: ['', Validators.compose([Validators.pattern('[A-Z0-9.a-z0-9._]+@[a-z0-9.-]+\\.[a-z]{2,3}$')])],
      vendorFax: ['', Validators.compose([Validators.pattern('^\\+[0-9]{1,1}-[0-9]{3}-[0-9]{7}$')])],
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    // console.log(control);
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  addVendorTabClick() {
    this.addVendor = true;
    this.updateVendor = false;
  }
  updateVendorTabClick() {
    this.addVendor = false;
    this.updateVendor = true;
  }
  getCloseModel() {
    this.modelCtrl.dismiss();
  }

  //-------------------------------------Dynamic Country and State get -------------------------------------------------------//

  // getStateFunction() {
  //   let req={i_user_id:this.userData.i_user_id}
  //   this.service.getStateAPI(req).subscribe((result) => {
  //     if (result.status) {
  //       console.log(result);
  //       this.getCountryList = result.data;
  //     } else {
  //       this.constant.ToastCustom(result.message, 'top');
  //     }
  //   }, error => {
  //     this.constant.Logout(error);
  //   });
  // }
  // onSelectChange(event) {
  //   console.log("event==="+event);
  //   this.getStateList = [];
  //   this.changeDetect.detectChanges();
  //   this.setStateArrayFunction(event.target.value);
  // }
  // setStateArrayFunction(value) {
  //   console.log(value);
  //   for (var i = 0; i < this.getCountryList.length; i++) {
  //     console.log(this.getCountryList[i]);
  //     if (value == this.getCountryList[i].i_country_id) {

  //       this.vendorArry.vendorState = '';
  //       this.getStateList.push(this.getCountryList[i].states);
  //     }
  //     console.log(this.getStateList);
  //   }
  //   this.changeDetect.detectChanges();
  // }
  // onChangeState(event) {
  //   if (this.getStateList.length == 0)
  //     this.constant.ToastCustom('Please First  of select Country', 'top');
  // }

  // addVendorCLick(vendorarr) {

  //   console.log(this.vendorForm);
  //   console.log("data",vendorarr);
  //   if (!this.vendorArry.vendorNumber) {
  //     this.myInput.setFocus();
  //   }
  //   else if (!this.vendorArry.vendorCompany) {
  //     this.vendorCompany.setFocus();
  //   }
  //   else {
  //     this.addVendorParameter(vendorarr);
  //     //this.constant.ToastCustom('All * Fields are Required!', 'top');
  //   }
  // }

  EmailvalidCheckEvent() {
    // console.log(this.vendorArry.vendorEmail);
    if (this.vendorArry.vendorEmail) {
      if (this.constant.isValidEmail(this.vendorArry.vendorEmail)) {
        this.getStartedButtonEnable = false;
        this.changeDetect.detectChanges();
        return false;
      } else {
        this.getStartedButtonEnable = true;
        this.changeDetect.detectChanges();
        return true;
      }
    }
    

  }

  // addVendorParameter(vendorarr) {
  //   console.log(vendorarr);
  //   vendorarr.userId = this.userData.userId;
  //   vendorarr.hotelId = this.constant.HotelId;
  //   console.log(vendorarr);
  //   if (this.mediaType) {

  //     // dic['i_vendor_id'] = this.vendorArry.i_vendor_id;
  //     // vendorarr.vendorId=this.getVendorData.vendorId;
  //     vendorarr.updateVendor= 1
  //      this.updateVendorAPI(vendorarr);
  //     this.addVendorFunctionAPI(vendorarr);
  //   } else {
  //     this.addVendorFunctionAPI(vendorarr);
  //   }

  // }
  updateVendorAPI(dic) {
    // console.log(dic);
    dic.userId = this.userData.userId;
    this.constant.LoadingPresent();
    this.service.updateVendorClickAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        //  this.getCountryList = result.data;
        this.constant.ToastCustom(result.message, 'top');
        this.navCtrl.navigateBack('/vendor-list');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);  
      }
    }, error => {
      this.constant.Logout(error);
    });
  }

  addVendorFunctionAPI(dic) {
    // console.log("dcsas",dic);
    dic.userId = this.userData.userId;
    if(this.userData.roleId == 1){
      dic.hotelId = this.constant.HotelId == 0 ? this.constant.capitalHotelId :  this.constant.HotelId;
    }else if(this.userData.roleId  == 2){
      dic.hotelId = this.userData.hotelId;
    }
    
    this.constant.LoadingPresent();
    this.service.addVendorAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        //  this.getCountryList = result.data;
        this.constant.ToastCustom(result.message, 'top');
        // this.navCtrl.back();
        if(this.mediaType!='vendorModel'){
         this.navCtrl.navigateRoot('/vendor-list');
         console.log("1")
        }else if(this.mediaType=='vendorModel'){
          console.log("2")
          this.modelCtrl.dismiss();
        }
      
      } else {
        this.constant.LogoutSession(result.status_key);
        this.constant.ToastCustom(result.message, 'top');
      }
    }, error => {
      this.constant.Logout(error);
    });
  }


  setFilteredItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.filterData = this.items.filter((item: any) => {
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.filterData = [];
    }
    // console.log(this.filterData);
  }
  modelClose() {
    // console.log("model close");
    this.modelCtrl.dismiss();
  }

}
