import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowPassOnNotePage } from './show-pass-on-note.page';

const routes: Routes = [
  {
    path: '',
    component: ShowPassOnNotePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowPassOnNotePage]
})
export class ShowPassOnNotePageModule {}
