import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddVendorPage } from './add-vendor.page';
import {ComponentsModule} from "../../components/components.module";
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AddVendorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddVendorPage]
})
export class AddVendorPageModule {}
