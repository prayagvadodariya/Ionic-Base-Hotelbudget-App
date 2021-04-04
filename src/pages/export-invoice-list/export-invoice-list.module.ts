import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExportInvoiceListPage } from './export-invoice-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExportInvoiceListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExportInvoiceListPage]
})
export class ExportInvoiceListPageModule {}
