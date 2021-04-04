import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvoiceProgressPage } from './invoice-progress.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceProgressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InvoiceProgressPage]
})
export class InvoiceProgressPageModule {}
