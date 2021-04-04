import { NgModule } from '@angular/core';
import {IonicModule} from "@ionic/angular";

import { PromptMessageComponent } from './prompt-message/prompt-message';
import { AssetsInfoComponent } from './assets-info/assets-info';
import { FooterComponent } from './footer/footer';

@NgModule({
	declarations: [
    PromptMessageComponent,
    AssetsInfoComponent,FooterComponent],

    imports: [IonicModule],
    
	exports: [
    PromptMessageComponent,
    AssetsInfoComponent,FooterComponent]
})
export class ComponentsModule {}
