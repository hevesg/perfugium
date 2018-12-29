import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './perfugium/component/character-list/character-list.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    CharacterListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
