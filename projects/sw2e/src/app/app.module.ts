import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Sw2eCharacterListComponent} from './component/sw2e-character-list/sw2e-character-list.component';
import {D6Module} from '../../../../src/app/d6/d6.module';

@NgModule({
  declarations: [
    AppComponent,
    Sw2eCharacterListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    D6Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
