import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PassOnNotesPage } from './pass-on-notes.page';

const routes: Routes = [
  {
    path: '',
    component: PassOnNotesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PassOnNotesPage]
})
export class PassOnNotesPageModule {}
