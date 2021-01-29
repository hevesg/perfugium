import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Sw2eCharacterSheetComponent} from './sw2e-character-sheet.component';
import {NavbarModule} from '../../../../perfugium/src/lib/module/navbar/navbar.module';
import {RouterTestingModule} from '@angular/router/testing';
import {D6AttributeModule} from '../../../../d6/src/lib/module/d6-attribute/d6-attribute.module';
import {ForceViewComponent} from '../force/force-view/force-view.component';
import {D6PipModule} from '../../../../d6/src/lib/module/d6-pip/d6-pip.module';

describe('CharacterSheetComponent', () => {
  let component: Sw2eCharacterSheetComponent;
  let fixture: ComponentFixture<Sw2eCharacterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sw2eCharacterSheetComponent, ForceViewComponent ],
      imports: [
        NavbarModule,
        RouterTestingModule,
        D6AttributeModule,
        D6PipModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sw2eCharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
