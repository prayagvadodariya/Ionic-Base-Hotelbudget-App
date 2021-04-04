import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WebViewShowPagePage } from './web-view-show-page.page';

const routes: Routes = [
  {
    path: '',
    component: WebViewShowPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WebViewShowPagePage]
})
export class WebViewShowPagePageModule {}
