import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchInvoicesResultsPage } from './search-invoices-results.page';

const routes: Routes = [
  {
    path: '',
    component: SearchInvoicesResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchInvoicesResultsPage]
})
export class SearchInvoicesResultsPageModule {}
