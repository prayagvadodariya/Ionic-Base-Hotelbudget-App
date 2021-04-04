import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreatePassOnNotePage } from './create-pass-on-note.page';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  {
    path: '',
    component: CreatePassOnNotePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline','strike'],
          [{ 'align': [] }],
          [{ 'list': 'ordered'},{ 'list': 'bullet' }],
        ]
      }
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [CreatePassOnNotePage]
})
export class CreatePassOnNotePageModule {}
