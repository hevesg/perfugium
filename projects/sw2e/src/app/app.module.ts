import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CharacterSheetComponent} from './character-sheet/character-sheet.component';
import {NavbarModule} from '../../../perfugium/src/lib/module/navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSheetComponent
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
