import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExportCapitalInvoiceListPage } from './export-capital-invoices-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExportCapitalInvoiceListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExportCapitalInvoiceListPage]
})
export class ExportCapitalInvoiceListPageModule {}
