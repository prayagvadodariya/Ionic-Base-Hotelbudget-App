import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PmSurvey2Page } from './pm-survey2.page';

const routes: Routes = [
  {
    path: '',
    component: PmSurvey2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PmSurvey2Page]
})
export class PmSurvey2PageModule {}
