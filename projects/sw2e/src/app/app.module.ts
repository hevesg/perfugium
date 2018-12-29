import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PerfugiumModule} from '../../../../src/app/perfugium/perfugium.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PerfugiumModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
