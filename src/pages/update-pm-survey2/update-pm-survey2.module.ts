import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdatePmSurvey2Page } from './update-pm-survey2.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePmSurvey2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdatePmSurvey2Page]
})
export class UpdatePmSurvey2PageModule {}
