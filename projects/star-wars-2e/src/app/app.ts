import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { D6Module } from '../features/d6/d6-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, D6Module],
  template: '<router-outlet />',
})
export class App {}
