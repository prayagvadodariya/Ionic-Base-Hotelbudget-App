import { ModalFilteringPage } from '../../../models/modal-filtering/modal-filtering.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CustomAnimation } from 'src/helper/animation';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {

  constructor(public modelCtrl: ModalController,public navCtrl: NavController) { }

  ngOnInit() {
  }

  async filterpageshow() {
 //this.router.navigate(['/vendor-list',{type: 'vendorModel'}]);
      let modal = await this.modelCtrl.create({
        component: ModalFilteringPage,
        enterAnimation: CustomAnimation.scaleUpEnter,
        leaveAnimation: CustomAnimation.scaleUpLeave,
        componentProps: {
          type: 'vendorModel'
        }
      });
      modal.onDidDismiss()
        .then((data) => {
          // console.log(data);
        })
      return await modal.present();
  }

  AddRequestPage() {
    console.log("AddRequestPage");
    this.navCtrl.navigateForward('/add-request');
  }
}
