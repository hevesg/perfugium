import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Sw2eCharacterSheetComponent} from './sw2e-character-sheet.component';
import {NavbarModule} from '../../../../perfugium/src/lib/module/navbar/navbar.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('CharacterSheetComponent', () => {
  let component: Sw2eCharacterSheetComponent;
  let fixture: ComponentFixture<Sw2eCharacterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sw2eCharacterSheetComponent ],
      imports: [
        NavbarModule,
        RouterTestingModule
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
