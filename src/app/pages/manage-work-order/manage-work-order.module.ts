import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageWorkOrderPage } from './manage-work-order.page';

const routes: Routes = [
  {
    path: '',
    component: ManageWorkOrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageWorkOrderPage]
})
export class ManageWorkOrderPageModule {}
