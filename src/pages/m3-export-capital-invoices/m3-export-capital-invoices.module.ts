import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { M3ExportCapitalInvoicesPage } from './m3-export-capital-invoices.page';

const routes: Routes = [
  {
    path: '',
    component: M3ExportCapitalInvoicesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [M3ExportCapitalInvoicesPage]
})
export class M3ExportCapitalInvoicesPageModule {}
