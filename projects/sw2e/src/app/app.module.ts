import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Sw2eCharacterSheetComponent} from './character-sheet/sw2e-character-sheet.component';
import {NavbarModule} from '../../../perfugium/src/lib/module/navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent,
    Sw2eCharacterSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
