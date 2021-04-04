import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PmSurveyPage } from './pm-survey.page';
import { FormGroup , FormControl , ReactiveFormsModule  } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PmSurveyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PmSurveyPage]
})
export class PmSurveyPageModule {}
