import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { Constant } from 'src/services/constant';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-web-view-show-page',
  templateUrl: './web-view-show-page.page.html',
  styleUrls: ['./web-view-show-page.page.scss'],
})
export class WebViewShowPagePage implements OnInit {

 
  pmNotification: any;
  mainurl:any;
  constructor(private iab: InAppBrowser,  private router: Router, public constant: Constant, public sanitizer: DomSanitizer) {
    this.mainurl = this.urlTransform(localStorage.getItem('GENERAL_CLEAN_URL'));
    console.log(this.mainurl);
    let target = "_self";
    this.pmNotification = JSON.parse(localStorage.getItem("pm_notifivation"));
    // this.browser = this.iab.create('http://staging.ancubate.com/hotel-budget-web/pm/general-clean/generate',target,this.options);
   }

  ngOnInit() {
   
  }
  ionViewWillLeave(){
    
    // this.browser.close();
  }
  gotoNotification() {
    this.router.navigate(['/pm-notification']);
  }

  urlTransform(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
