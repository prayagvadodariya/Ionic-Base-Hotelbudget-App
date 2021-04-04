import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/services/constant';
import { webServicenew } from 'src/services/webServicenew';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-export-invoice-list',
  templateUrl: './export-invoice-list.page.html',
  styleUrls: ['./export-invoice-list.page.scss'],
})
export class ExportInvoiceListPage implements OnInit {
  userData: any;
  invoicedata: any;
  hotelid: any;
  SubInvoiceRecordArr: any = [];
  infiniteScrollEnable: any;
  param: any = {};

  constructor(public constant: Constant, public service: webServicenew, public activatedRoute: ActivatedRoute) { 
    this.userData = this.constant.getUserData();
    this.invoicedata = JSON.parse(this.activatedRoute.snapshot.paramMap.get('invoiceData'));
    this.hotelid = JSON.parse(this.activatedRoute.snapshot.paramMap.get('hotelId'));
    
    // console.log("receivedata",this.invoicedata);
    // console.log("hotel id",this.hotelid);
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
     this.param.userId = this.userData.userId;
     this.param.hotelId = this.hotelid;
     this.param.page = 0;
     this.param.transferedDate = this.invoicedata.transferedDate;
  
    this.getCategotytList();
  }
  getCategotytList(){
    // console.log();
   
    this.constant.LoadingPresent();
    this.service.getExportSubInvoices(this.param).subscribe((result) => {
      this.constant.LoadingHide();
      // console.log("1",result);
      if (result.status) {
        this.SubInvoiceRecordArr = result.data.SubInvoiceRecord;
        if (this.SubInvoiceRecordArr.length < 20) {
          this.infiniteScrollEnable = false;
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
  InfinitScrolling(event) {

    if (this.SubInvoiceRecordArr.length > 0) {
      this.param.page += 20;
    }
    this.constant.LoadingPresent();
    this.service.getExportSubInvoices(this.param).subscribe(
      result => {
        this.constant.LoadingHide();
        event.target.complete();
        if (result.status) {
          let responseData = result.data.SubInvoiceRecord;
          for (var i = 0; i < responseData.length; i++) {
            this.SubInvoiceRecordArr.push(responseData[i]);
          }
          if (responseData.length < 10) {
            this.infiniteScrollEnable = false;
          }
          else {
            this.infiniteScrollEnable = true;
          }
          this.constant.ToastCustom(result.message, 'top');
        } else {
          this.infiniteScrollEnable = false;
          this.constant.ToastCustom(result.message, 'top');
          this.constant.LogoutSession(result.status_key);
        }
      },
      error => {

      }
    );
  }


}
