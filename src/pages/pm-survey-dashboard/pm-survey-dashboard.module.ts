import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PMSurveyDashboardPage } from './pm-survey-dashboard.page';
import {ComponentsModule} from "../../components/components.module";
const routes: Routes = [
  {
    path: '',
    component: PMSurveyDashboardPage
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
  //exports:[SurveySortPipe],
  declarations: [PMSurveyDashboardPage]
})
export class PMSurveyDashboardPageModule {}
