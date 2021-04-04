import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchInvoicesPage } from './search-invoices.page';

const routes: Routes = [
  {
    path: '',
    component: SearchInvoicesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchInvoicesPage]
})
export class SearchInvoicesPageModule {}
