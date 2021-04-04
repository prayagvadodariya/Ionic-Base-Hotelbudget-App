import { SignaturePadModule } from 'angular2-signaturepad';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTaxExemptPage } from './add-tax-exempt.page';

const routes: Routes = [
  {
    path: '',
    component: AddTaxExemptPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SignaturePadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTaxExemptPage]
})
export class AddTaxExemptPageModule {}
