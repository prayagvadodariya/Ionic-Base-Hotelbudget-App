import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CapitalExpenseCatPage } from './capital-expense-cat.page';
import { FormGroup , FormControl , ReactiveFormsModule  } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CapitalExpenseCatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CapitalExpenseCatPage]
})
export class CapitalExpenseCatPageModule {}
