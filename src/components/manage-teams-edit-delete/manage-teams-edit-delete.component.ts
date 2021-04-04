import { PopoverController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-teams-edit-delete',
  templateUrl: './manage-teams-edit-delete.component.html',
  styleUrls: ['./manage-teams-edit-delete.component.scss'],
})
export class ManageTeamsEditDeleteComponent implements OnInit {

  showlist:any;
  constructor(private popoverController: PopoverController,public navParams: NavParams) {
    // namemodule
    this.showlist = this.navParams.get('arrayoflist');
    // console.log(this.showlist);
   }

  ngOnInit() {}

  async clickshow(item){
    // console.log(item)
    await this.popoverController.dismiss({status:item});
  }
  // async edit() {
  //   await this.popoverController.dismiss({status:'edit'});
  // }
  // async delete() {
  //   await this.popoverController.dismiss({status:'delete'});
  // }
}
