import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {D6PipPipe} from './d6-pip.pipe';


@NgModule({
    declarations: [D6PipPipe],
    exports: [
        D6PipPipe
    ],
    imports: [
        CommonModule
    ]
})
export class D6PipModule { }
