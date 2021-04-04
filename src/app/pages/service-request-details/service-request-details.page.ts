import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Constant } from 'src/services/constant';
import { webServicenew } from 'src/services/webServicenew';
import { ViewProgressPage } from 'src/models/view-progress/view-progress.page';

@Component({
  selector: 'app-service-request-details',
  templateUrl: './service-request-details.page.html',
  styleUrls: ['./service-request-details.page.scss'],
})
export class ServiceRequestDetailsPage implements OnInit {

  constructor(private modalCtrl: ModalController, public constant: Constant,
    public service: webServicenew, public fb: FormBuilder) { }

  ngOnInit() {
  }

  async ViewProgress(){
    console.log("ViewProgress");
    const modal = await this.modalCtrl.create(
      {
        component: ViewProgressPage,
        cssClass:'new-model'
       
      });
    await modal.present();
    modal.onDidDismiss().then(async (response) => {
      // console.log(response);
      // console.log(response.data);
      // if (response.data) {
      //     await this.AddItemSurveyData(response.data.signbase64);
      // }

    });
    // await modal.onDidDismiss();
  }

}
