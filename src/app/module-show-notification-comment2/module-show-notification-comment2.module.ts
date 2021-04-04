import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModuleShowNotificationComment2Page } from './module-show-notification-comment2.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleShowNotificationComment2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModuleShowNotificationComment2Page]
})
export class ModuleShowNotificationComment2PageModule {}
