import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FormGroup , FormControl , ReactiveFormsModule  } from '@angular/forms';
import { UpdateForecastPage } from './update-forecast.page';
import {ComponentsModule} from "../../components/components.module";
const routes: Routes = [
  {
    path: '',
    component: UpdateForecastPage
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
  declarations: [UpdateForecastPage]
})
export class UpdateForecastPageModule {}
