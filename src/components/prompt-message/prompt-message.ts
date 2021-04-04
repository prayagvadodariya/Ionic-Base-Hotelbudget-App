import { Component, Input } from '@angular/core';

@Component({
  selector: 'prompt-message',
  templateUrl: 'prompt-message.html'
})
export class PromptMessageComponent {

  @Input() public MessageArry: any;
  
  constructor() {
      
  }

  ngOnInit() {
    // console.log("massgae id", this.MessageArry);      
  }

}
