import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExemptionCertificatePage } from './exemption-certificate.page';

const routes: Routes = [
  {
    path: '',
    component: ExemptionCertificatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExemptionCertificatePage]
})
export class ExemptionCertificatePageModule {}
