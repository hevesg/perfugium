import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Sw2eCharacterSheetComponent} from './character-sheet/sw2e-character-sheet.component';
import {NavbarModule} from '../../../perfugium/src/lib/module/navbar/navbar.module';
import {D6AttributeModule} from '../../../d6/src/lib/module/d6-attribute/d6-attribute.module';
import {ForceModule} from './force/force.module';
import {D6PipModule} from '../../../d6/src/lib/module/d6-pip/d6-pip.module';

@NgModule({
  declarations: [
    AppComponent,
    Sw2eCharacterSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    D6AttributeModule,
    ForceModule,
    D6PipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
