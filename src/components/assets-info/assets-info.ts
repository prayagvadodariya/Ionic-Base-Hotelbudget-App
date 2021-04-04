import { Component,Input } from '@angular/core';
import { Constant } from "../../services/constant";
//import { AssetDetailEnhancementPage } from '../../pages/asset-detail-enhancement/asset-detail-enhancement';
import { AlertController, LoadingController, NavController, NavParams, ModalController, Events } from '@ionic/angular';
@Component({
  selector: 'assets-info',
  templateUrl: 'assets-info.html'
})
export class AssetsInfoComponent {

  text: string;
  @Input() public hearder: any=[];
  constructor( public constant: Constant,public navCtrl: NavController) {
    console.log('Hello AssetsInfoComponent Component');
    this.text = 'Hello World';
  }

  opeenDetailsPage(id, index) {
    console.log("its works", id);
    console.log("assetArrayIndex==", index);
   // this.navCtrl.push(AssetDetailEnhancementPage, { params: id, assetArrayIndex: index });
  }
}
