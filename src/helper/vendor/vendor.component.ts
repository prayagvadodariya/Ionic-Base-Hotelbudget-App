import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';

import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { WebService } from '../../services/webService';
import { Constant } from '../../services/constant';
import { ActivatedRoute } from '@angular/router';

import { GetMediaHelper } from 'src/helper/get-media-helper/get-media-helper';
import { NoInternetConnectionPage } from "src/helper/no-internet-connection/no-internet-connection";


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent implements OnInit {

  vendorForm: FormGroup;
  constructor(public modelCtrl: ModalController,public fb: FormBuilder,) { 
    this.FormValtion();
  }
  FormValtion() {
    this.vendorForm = this.fb.group({
      vnd_name: ['', Validators.compose([Validators.pattern('.*\\S.*[a-zA-Z]'), Validators.required])],
    });
  }
  ngOnInit() {}

  demo()
  {
    this.modelCtrl.dismiss();
  }

}
