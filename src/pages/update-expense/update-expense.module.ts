import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdateExpensePage } from './update-expense.page';
import {ComponentsModule} from "../../components/components.module";
import { FormGroup , FormControl , ReactiveFormsModule  } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: UpdateExpensePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdateExpensePage]
})
export class UpdateExpensePageModule {}
