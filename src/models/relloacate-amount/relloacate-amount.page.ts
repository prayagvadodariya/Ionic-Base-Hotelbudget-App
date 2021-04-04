import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { Constant } from "../../services/constant";
import { WebService } from '../../services/webService';

import { from } from 'rxjs';
@Component({
  selector: 'app-relloacate-amount',
  templateUrl: './relloacate-amount.page.html',
  styleUrls: ['./relloacate-amount.page.scss'],
})
export class RelloacateAmountPage implements OnInit {
  isCheckEmptyField=false;
  getDepartmentList:any=[];
  department:any;date:any;category:any;amount:any;toCategory:any;toAmount:any;transAmount:any;
  GetCategoryList:any=[];
  userData:any;
  constructor(public modelCtrl: ModalController,public constant: Constant, public service: WebService) { 
    this.userData = this.constant.getUserData();
  }

  ngOnInit() {
    this.getDepartmentListClick();
  }
  modelClose()
  {
    this.modelCtrl.dismiss();
  }
  getDepartmentListClick()
  {
    let dic={i_hotel_id:this.constant.HotelId,i_user_id: this.userData.i_user_id};
    this.constant.LoadingPresent();
    this.service.getDepartmentListAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        this.getDepartmentList = result.data;
        // console.log(this.getDepartmentList);
        //this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
      }
    }, error => {
      this.constant.LoadingHide();
      this.constant.Logout(error);
    });
  }

  getCategoryList(event)
  {
    // console.log(event);
    // console.log(event.target.value);
    if(event)
    {
      var department_id=event.target.value;
      let dic={i_hotel_department_id:department_id,i_hotel_id:1};
      this.constant.LoadingPresent();
    this.service.getCategoryListAPI(dic).subscribe((result) => {
      this.constant.LoadingHide();
      if (result.status) {
        // console.log(result);
        this.GetCategoryList = result.data;
        // console.log(this.GetCategoryList);
        //this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
      }
    }, error => {
      this.constant.Logout(error);
    });

    }
  }
  reallocationAmount()
  {
    this.isCheckEmptyField = true;
    if (this.reallocationAmountClick()) {
      // console.log(this.reallocationAmountClick());
    }
    else{
      
    }
  }
  reallocationAmountClick() {
    let checkValid = false;
    
      if (this.department == null || this.department == "") {
        checkValid = true;
       }
      if (this.date == null || this.date == "") {
        checkValid = true;
     }
      if (this.category == null || this.category == "") {
        checkValid = true;
      }
      if (this.amount == null || this.amount == "") {
        checkValid = true;  
      }
      if (this.toCategory == null || this.toCategory == "") {
        checkValid = true;  
      }
      if (this.toAmount == null || this.toAmount == "") {
        checkValid = true;  
      }
      if (this.transAmount == null || this.transAmount == "") {
        checkValid = true;  
      }
     if (checkValid) {
      return 1;
    }
    else {
      return 0;
    }
  }
}
