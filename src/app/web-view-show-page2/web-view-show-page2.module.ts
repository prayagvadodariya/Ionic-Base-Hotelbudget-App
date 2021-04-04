import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WebViewShowPage2Page } from './web-view-show-page2.page';

const routes: Routes = [
  {
    path: '',
    component: WebViewShowPage2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WebViewShowPage2Page]
})
export class WebViewShowPage2PageModule {}
