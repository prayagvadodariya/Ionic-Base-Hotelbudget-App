import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SurveyByPopupPage } from './survey-by-popup.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyByPopupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SurveyByPopupPage]
})
export class SurveyByPopupPageModule {}
