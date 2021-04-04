import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Constant } from "../../services/constant";

@Component({
  selector: 'page-no-internet-connection',
  templateUrl: 'no-internet-connection.html',
})
export class NoInternetConnectionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public network:Network,
  public constant:Constant,public modalCtrl: ModalController,public events: Events) {

    var self = this;

    this.events.subscribe('network:online', () => {
      // alert('network:online ==> '+this.network.type);
      console.log("online");
      this.events.publish('dismissmodal');
      self.modalCtrl.dismiss();

    });
  }

  ionViewDidLoad() {
    var self = this;

    this.events.subscribe('network:online', () => {
      // alert('network:online ==> '+this.network.type);
      console.log("online");
      this.events.publish('dismissmodal');
      self.modalCtrl.dismiss();

    });
    // let connectSubscription = this.network.onConnect().subscribe(() => {
    //   console.log('network connected!');
    //   self.modalCtrl.dismiss();
    // });
  }

  TryAgainClick(){
    this.ionViewDidLoad();
    this.constant.ToastCustom('No internet connection found please try again.', 'top');
  }

}
