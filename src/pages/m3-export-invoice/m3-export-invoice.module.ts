import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { M3ExportInvoicePage } from './m3-export-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: M3ExportInvoicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [M3ExportInvoicePage]
})
export class M3ExportInvoicePageModule {}
