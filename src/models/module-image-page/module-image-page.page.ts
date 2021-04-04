import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Constant } from 'src/services/constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
@Component({
  selector: 'app-module-image-page',
  templateUrl: './module-image-page.page.html',
  styleUrls: ['./module-image-page.page.scss'],
})
export class ModuleImagePagePage implements OnInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  signature:string="";
  secdate = new Date().toISOString();
  Name:string = "";
  statusmy=0;
  surveydata:any;
  imgshow="";
  imgurl:any;
  constructor(public constant: Constant,public modalCtrl: ModalController,
    public router:Router,public activatedRoute: ActivatedRoute,public navParams: NavParams) { 
    this.imgurl = localStorage.getItem("viewimg");
    // console.log(constant.getUserData());
   
    if(this.navParams.get('dataservey')){
      console.log(this.navParams.get('dataservey'));
      this.surveydata = this.navParams.get('dataservey');
      console.log("11",this.surveydata);
          this.Name = this.surveydata.item;
         
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
 
  clearbtn(){
    this.signaturePad.clear();
  }
  closebtn(){
    this.modalCtrl.dismiss();
  }
}
