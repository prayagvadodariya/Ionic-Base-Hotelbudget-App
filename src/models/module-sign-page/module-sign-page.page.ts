import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Constant } from 'src/services/constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
@Component({
  selector: 'app-module-sign-page',
  templateUrl: './module-sign-page.page.html',
  styleUrls: ['./module-sign-page.page.scss'],
})
export class ModuleSignPagePage implements OnInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  signature:string="";
  secdate = new Date().toISOString();
  Name:string = "";
  statusmy=0;
  surveydata:any;
  imgshow="";
  constructor(public constant: Constant,public modalCtrl: ModalController,
    public router:Router,public activatedRoute: ActivatedRoute,public navParams: NavParams) { 
    // console.log(constant.getUserData());
    this.Name = constant.getUserData().firstName +" "+ constant.getUserData().lastName;
    if(this.navParams.get('dataservey')){
      console.log(this.navParams.get('dataservey'));
      this.surveydata = this.navParams.get('dataservey');
      console.log(this.surveydata);
          this.Name = this.surveydata.userName;
          this.secdate = new Date().toISOString();
          if( this.navParams.get('statuscheck') == 0){
            this.imgshow = this.surveydata.signatureImage;
            console.log(this.surveydata); 
            this.statusmy = 1;
          }
          
          
    }
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.surveydata = this.router.getCurrentNavigation().extras.state.dataservey;
    //     this.Name = this.surveydata.hotelName;
    //     this.secdate = new Date(this.surveydata.surveyDate).toISOString();
    //     this.imgshow = this.surveydata.signatureImage;
    //     this.statusmy = 1;
    //   }
    // })
  }

  ngOnInit() {
    // console.log("${dataservey}");
  }
  clickok(){
    // console.log('CAPTURED SIGS:');
    if(this.signaturePad.isEmpty()){
      this.constant.ToastCustom('Please Sign after Click Ok button', 'top');
    //  console.log("Please Sign after Click Ok button");
    }  else{
      this.modalCtrl.dismiss({signbase64:this.signaturePad.toDataURL()});
    }
  }
  clearbtn(){
    this.signaturePad.clear();
  }
  closebtn(){
    this.modalCtrl.dismiss();
  }
}
