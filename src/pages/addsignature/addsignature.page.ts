import { Component, OnInit ,ViewChild} from '@angular/core';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
@Component({
  selector: 'app-addsignature',
  templateUrl: './addsignature.page.html',
  styleUrls: ['./addsignature.page.scss'],
})
export class AddsignaturePage implements OnInit {
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage : string;

  constructor() { }

  ngOnInit() {
  }

  drawClear() {
    this.signaturePad.clear();
  }

}
