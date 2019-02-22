import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Sw2eCharacterListComponent} from './component/sw2e-character-list/sw2e-character-list.component';
import {D6Module} from '../../../../src/app/d6/d6.module';
import {Sw2eCharacterSheetComponent} from './component/sw2e-character-sheet/sw2e-character-sheet.component';
import {Sw2eEquipmentComponent} from './component/sw2e-equipment/sw2e-equipment.component';
import {Sw2eWeaponsComponent} from './component/sw2e-weapons/sw2e-weapons.component';
import {Sw2eEquipmentDialogComponent} from './dialog/sw2e-equipment-dialog/sw2e-equipment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    Sw2eCharacterListComponent,
    Sw2eCharacterSheetComponent,
    Sw2eEquipmentComponent,
    Sw2eWeaponsComponent,
    Sw2eEquipmentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    D6Module
  ],
  providers: [
    Sw2eEquipmentDialogComponent
  ],
  entryComponents: [
    Sw2eEquipmentDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
