import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RelloacateAmountPage } from './relloacate-amount.page';

const routes: Routes = [
  {
    path: '',
    component: RelloacateAmountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RelloacateAmountPage]
})
export class RelloacateAmountPageModule {}
