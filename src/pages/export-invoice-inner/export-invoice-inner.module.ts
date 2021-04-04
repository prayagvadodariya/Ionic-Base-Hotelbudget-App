import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExportInvoiceInnerPage } from './export-invoice-inner.page';

const routes: Routes = [
  {
    path: '',
    component: ExportInvoiceInnerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExportInvoiceInnerPage]
})
export class ExportInvoiceInnerPageModule {}
