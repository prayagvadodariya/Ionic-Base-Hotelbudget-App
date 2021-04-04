import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/services/constant';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-progress',
  templateUrl: './view-progress.page.html',
  styleUrls: ['./view-progress.page.scss'],
})
export class ViewProgressPage implements OnInit {

  constructor(public constant: Constant,public modalCtrl: ModalController,
    public router:Router,public activatedRoute: ActivatedRoute,public navParams: NavParams) { }

  ngOnInit() {
  }
  closebtn(){
    
  }

}
