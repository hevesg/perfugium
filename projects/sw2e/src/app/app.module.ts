import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Sw2eCharacterSheetComponent} from './character-sheet/sw2e-character-sheet.component';
import {NavbarModule} from '../../../perfugium/src/lib/module/navbar/navbar.module';
import {D6SkillModule} from '../../../d6/src/lib/module/d6-skill/d6-skill.module';
import {D6AttributeModule} from '../../../d6/src/lib/module/d6-attribute/d6-attribute.module';

@NgModule({
  declarations: [
    AppComponent,
    Sw2eCharacterSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    D6SkillModule,
    D6AttributeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
