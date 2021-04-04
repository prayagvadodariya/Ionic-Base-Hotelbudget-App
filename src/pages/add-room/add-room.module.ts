import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , FormGroup , FormControl,ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddRoomPage } from './add-room.page';

const routes: Routes = [
  {
    path: '',
    component: AddRoomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddRoomPage]
})
export class AddRoomPageModule {}
