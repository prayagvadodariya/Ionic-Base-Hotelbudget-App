import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VendorListPage } from './vendor-list.page';
import {ComponentsModule} from "../../components/components.module";
//import { AddVendorPageModule } from '../add-vendor/add-vendor.module';
const routes: Routes = [
  {
    path: '',
    component: VendorListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    //AddVendorPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendorListPage]
})
export class VendorListPageModule {}
