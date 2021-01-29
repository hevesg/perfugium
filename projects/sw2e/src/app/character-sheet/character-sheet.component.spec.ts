import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSheetComponent} from './character-sheet.component';
import {NavbarModule} from '../../../../perfugium/src/lib/module/navbar/navbar.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('CharacterSheetComponent', () => {
  let component: CharacterSheetComponent;
  let fixture: ComponentFixture<CharacterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterSheetComponent ],
      imports: [
        NavbarModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
