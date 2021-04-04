import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModuleNotificationPenddingPage } from './module-notification-pendding.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleNotificationPenddingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModuleNotificationPenddingPage]
})
export class ModuleNotificationPenddingPageModule {}
