import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Sw2eCharacterListComponent} from './component/sw2e-character-list/sw2e-character-list.component';
import {D6Module} from '../../../../src/app/d6/d6.module';
import {Sw2eCharacterSheetComponent} from './component/sw2e-character-sheet/sw2e-character-sheet.component';
import {Sw2eEquipmentComponent} from './component/sw2e-equipment/sw2e-equipment.component';
import {Sw2eGeneralComponent} from './component/sw2e-general/sw2e-general.component';

@NgModule({
  declarations: [
    AppComponent,
    Sw2eCharacterListComponent,
    Sw2eCharacterSheetComponent,
    Sw2eGeneralComponent,
    Sw2eEquipmentComponent
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
