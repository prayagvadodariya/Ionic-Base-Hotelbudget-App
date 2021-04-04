import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { webServicenew } from '../../services/webServicenew';
import { Constant } from "../../services/constant";

@Component({
  selector: 'app-expense-categories',
  templateUrl: './expense-categories.page.html',
  styleUrls: ['./expense-categories.page.scss'],
})
export class ExpenseCategoriesPage implements OnInit {
  mediaType:any;
  deptData:any;
  userData:any;
  Hotelname:any;
  hoteloriginal_id:any;
  categoryData:any=[];
  requestParam = { userId: 0, departmentId: 0,hotelId: 0, year: '', month: '', toMonth: '',page:0 };
  infiniteScrollEnable=false;
  message: any;
  message_title: any;

  constructor(public activatedRoute: ActivatedRoute,private router: Router,public service: webServicenew, public constant: Constant) { 
    if (this.activatedRoute.snapshot.paramMap.get('deptData')) {
      this.deptData=JSON.parse(this.activatedRoute.snapshot.paramMap.get('deptData'));
      this.Hotelname=JSON.parse(this.activatedRoute.snapshot.paramMap.get('hotelname'));
      this.hoteloriginal_id=JSON.parse(this.activatedRoute.snapshot.paramMap.get('hoteloriginal_id'));
      this.requestParam.year = JSON.parse(this.activatedRoute.snapshot.paramMap.get('year'));
      this.requestParam.month = JSON.parse(this.activatedRoute.snapshot.paramMap.get('month'));
      this.requestParam.toMonth = JSON.parse(this.activatedRoute.snapshot.paramMap.get('month'));
      // console.log(this.deptData);
    }
    this.userData = this.constant.getUserData();
    // console.log(this.userData);
    this.requestParam.userId = this.userData.userId;
    this.requestParam.year = this.constant.year;
    this.requestParam.month = this.constant.month;
    this.requestParam.toMonth = this.constant.toMonth;
    this.requestParam.hotelId = this.hoteloriginal_id;
    this.requestParam.departmentId=this.deptData.departmentId;
    // this.Hotelname = this.constant.hotelName;
    // console.log("hb",this.Hotelname);
    // console.log("idhb", this.hoteloriginal_id);
  }

  ngOnInit() {
    // this.setParamFunction();
  }
  ionViewWillEnter() {
    this.requestParam.page = 0;
    // console.log(this.requestParam);
    this.getCategotytList();
  }
  getCategotytList(){
    // console.log(this.requestParam);
    this.constant.LoadingPresent();
    this.service.getCategoryListAPI(this.requestParam).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log(result);
      if (result.status) {
        this.message = result.setting.message;
        this.message_title = result.setting.message_title;
         this.categoryData = result.data;
         let sortedArray = this.categoryData.sort(function (a, b) {
          return a.per < b.per ? 1 : (a.per > b.per ? -1 : 0);
        });
        // console.log(this.categoryData.length);
        // console.log(this.categoryData);
        if (this.categoryData.length < 200) {
          this.infiniteScrollEnable = false
        }
        else {
          this.infiniteScrollEnable = true;
        }
        // console.log(this.categoryData);
        // this.deptDetail = result.data;
        // console.log(this.departmentData);
        // this.MQYsegment = this.deptDetail.current_filter;
        // this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  InfinitScrollingAPI(event) {
    // console.log(event);
    if (this.categoryData.length > 0) {
      this.requestParam.page += 200;
    }
    //this.getNotification();
    this.constant.LoadingPresent();
    this.service.getCategoryListAPI(this.requestParam).subscribe((result) => {
      this.constant.LoadingHide();
      event.target.complete();
      // console.log(result);
      if (result.status) {
        var tempcatdata =result.data;
        // this.constant.ToastCustom(result.message, 'top');
        console.log(tempcatdata.length);
        for (let index = 0; index < tempcatdata.length; index++) {
          this.categoryData.push(tempcatdata[index]);
        }       
        console.log(this.categoryData);
        // this.categoryData = this.categoryData.sort(function (a, b) {
        //   return a.per < b.per ? 1 : a.per > b.per ? -1 : 0
        // });
        if (tempcatdata.length < 200) {
          this.infiniteScrollEnable = false
        }
        else {
          this.infiniteScrollEnable = true;
        }
        // this.constant.ToastCustom(result.message, 'top');
      } else {
        this.constant.ToastCustom(result.message, 'top');
        this.constant.LogoutSession(result.status_key);
      }
    }, error => {
      this.constant.Logout(error);
    });
  }
  getExpenseClick(data)
  {
    console.log(data);
    data.label = this.deptData.label;
    this.router.navigate(['/showExpense',{deptData: JSON.stringify(data),
      departmentId:JSON.stringify(this.deptData.departmentId),
      hoteloriginal_id: JSON.stringify(this.hoteloriginal_id),
      year: JSON.stringify(this.requestParam.year),
      month: JSON.stringify(this.requestParam.month),
      }]);
  }
  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    setTimeout(() => {
      // console.log('Async operation has ended');
     
      this.ionViewWillEnter();
      
      event.target.complete();
    }, 500);
  }
}
