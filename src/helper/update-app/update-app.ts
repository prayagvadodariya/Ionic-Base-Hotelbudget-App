import { Component } from '@angular/core';
import {  NavController, NavParams } from '@ionic/angular';
import { Constant } from '../../services/constant';
import { Market } from '@ionic-native/market/ngx';

@Component({
  selector: 'page-update-app',
  templateUrl: 'update-app.html',
})
export class UpdateAppPage {

  updateListArray: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public constant:Constant,public market: Market) {
    this.updateListArray = this.constant.VERSION_UPDATE_DATA;
  }

  updateAppClick(){
    var self = this;
    if(this.updateListArray.forceUpdate){
      self.market.open('com.gainbuzz.advertiser');
    }
  }
}
