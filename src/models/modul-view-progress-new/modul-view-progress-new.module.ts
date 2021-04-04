import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModulViewProgressNewPage } from './modul-view-progress-new.page';

const routes: Routes = [
  {
    path: '',
    component: ModulViewProgressNewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModulViewProgressNewPage]
})
export class ModulViewProgressNewPageModule {}
