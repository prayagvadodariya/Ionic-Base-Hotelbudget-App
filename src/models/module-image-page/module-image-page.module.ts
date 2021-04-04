import { SignaturePadModule } from 'angular2-signaturepad';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModuleImagePagePage } from './module-image-page.page';


const routes: Routes = [
  {
    path: '',
    component: ModuleImagePagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModuleImagePagePage]
})
export class ModuleImagePagePageModule {}
