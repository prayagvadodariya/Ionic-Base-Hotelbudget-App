import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddExpensePage } from './add-expense.page';
import {ComponentsModule} from "../../components/components.module";


const routes: Routes = [
  {
    path: '',
    component: AddExpensePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddExpensePage]
})
export class AddExpensePageModule {}
