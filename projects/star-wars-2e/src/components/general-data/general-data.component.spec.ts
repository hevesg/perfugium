import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { GeneralDataComponent, GeneralData } from './general-data.component';

@Component({
  standalone: true,
  imports: [GeneralDataComponent, ReactiveFormsModule],
  template: `<sw2e-general-data [formControl]="control" />`,
})
class TestHostComponent {
  control = new FormControl<GeneralData>({
    gender: '',
    species: '',
    homeWorld: '',
    age: 0,
    height: 0,
    weight: 0,
    physicalDescription: '',
    personality: '',
    background: '',
    objectives: '',
    quote: '',
  });
}

describe('GeneralDataComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
  });

  describe('ControlValueAccessor', () => {
    it('displays data when control value is set', () => {
      hostComponent.control.setValue({
        gender: 'Male',
        species: 'Human',
        homeWorld: 'Tatooine',
        age: 19,
        height: 172,
        weight: 73,
        physicalDescription: 'Blond hair, blue eyes',
        personality: 'Hopeful',
        background: 'Farm boy',
        objectives: 'Become a Jedi',
        quote: 'I have a bad feeling about this',
      });
      fixture.detectChanges();

      const speciesDD = fixture.debugElement.queryAll(By.css('.list-inline dd'))[1];
      expect(speciesDD.nativeElement.textContent).toBe('Human');
    });

    it('uses default values when control value is null', () => {
      hostComponent.control.setValue(null);
      fixture.detectChanges();

      const speciesDD = fixture.debugElement.queryAll(By.css('.list-inline dd'))[0];
      expect(speciesDD.nativeElement.textContent).toBe('');
    });
  });

  describe('conditional fields', () => {
    it('always displays species', () => {
      fixture.detectChanges();

      const speciesDT = fixture.debugElement.query(By.css('.list-inline dt'));
      expect(speciesDT.nativeElement.textContent).toBe('Species');
    });

    it('displays gender when provided', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        gender: 'Female',
      });
      fixture.detectChanges();

      const dts = fixture.debugElement.queryAll(By.css('.list-inline dt'));
      expect(dts[0].nativeElement.textContent).toBe('Gender');
    });

    it('does not display gender when empty', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        gender: '',
      });
      fixture.detectChanges();

      const dts = fixture.debugElement.queryAll(By.css('.list-inline dt'));
      expect(dts[0].nativeElement.textContent).toBe('Species');
    });

    it('displays home world when provided', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        homeWorld: 'Coruscant',
      });
      fixture.detectChanges();

      const dts = fixture.debugElement.queryAll(By.css('.list-inline dt'));
      const homeWorldDT = dts.find((dt) => dt.nativeElement.textContent === 'Home world');
      expect(homeWorldDT).toBeTruthy();
    });

    it('displays age when provided', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        age: 25,
      });
      fixture.detectChanges();

      const dds = fixture.debugElement.queryAll(By.css('.list-inline dd'));
      const ageDd = dds.find((dd) => dd.nativeElement.textContent.includes('years'));
      expect(ageDd?.nativeElement.textContent).toBe('25 years');
    });

    it('does not display age when zero', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        age: 0,
      });
      fixture.detectChanges();

      const dds = fixture.debugElement.queryAll(By.css('.list-inline dd'));
      const ageDd = dds.find((dd) => dd.nativeElement.textContent.includes('years'));
      expect(ageDd).toBeFalsy();
    });

    it('displays height with cm suffix', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        height: 180,
      });
      fixture.detectChanges();

      const dds = fixture.debugElement.queryAll(By.css('.list-inline dd'));
      const heightDd = dds.find((dd) => dd.nativeElement.textContent.includes('cm'));
      expect(heightDd?.nativeElement.textContent).toBe('180cm');
    });

    it('displays weight with kg suffix', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        weight: 75,
      });
      fixture.detectChanges();

      const dds = fixture.debugElement.queryAll(By.css('.list-inline dd'));
      const weightDd = dds.find((dd) => dd.nativeElement.textContent.includes('kg'));
      expect(weightDd?.nativeElement.textContent).toBe('75kg');
    });
  });

  describe('description fields', () => {
    it('displays physical description when provided', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        physicalDescription: 'Tall and strong',
      });
      fixture.detectChanges();

      const dl = fixture.debugElement.queryAll(By.css('dl'))[1];
      const dd = dl.query(By.css('dd'));
      expect(dd.nativeElement.textContent).toBe('Tall and strong');
    });

    it('displays personality when provided', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        personality: 'Brave and loyal',
      });
      fixture.detectChanges();

      const dts = fixture.debugElement.queryAll(By.css('dl:not(.list-inline) dt'));
      const personalityDT = dts.find((dt) => dt.nativeElement.textContent === 'Personality');
      expect(personalityDT).toBeTruthy();
    });

    it('displays background when provided', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        background: 'Former smuggler',
      });
      fixture.detectChanges();

      const dts = fixture.debugElement.queryAll(By.css('dl:not(.list-inline) dt'));
      const backgroundDT = dts.find((dt) => dt.nativeElement.textContent === 'Background');
      expect(backgroundDT).toBeTruthy();
    });

    it('displays objectives when provided', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        objectives: 'Save the galaxy',
      });
      fixture.detectChanges();

      const dts = fixture.debugElement.queryAll(By.css('dl:not(.list-inline) dt'));
      const objectivesDT = dts.find((dt) => dt.nativeElement.textContent === 'Objectives');
      expect(objectivesDT).toBeTruthy();
    });

    it('displays quote when provided', () => {
      hostComponent.control.setValue({
        ...hostComponent.control.value!,
        quote: 'May the Force be with you',
      });
      fixture.detectChanges();

      const dts = fixture.debugElement.queryAll(By.css('dl:not(.list-inline) dt'));
      const quoteDT = dts.find((dt) => dt.nativeElement.textContent === 'Quote');
      expect(quoteDT).toBeTruthy();
    });

    it('does not display description fields when empty', () => {
      fixture.detectChanges();

      const descriptionDL = fixture.debugElement.queryAll(By.css('dl'))[1];
      const dts = descriptionDL.queryAll(By.css('dt'));
      expect(dts.length).toBe(0);
    });
  });

  describe('host bindings', () => {
    it('has card class on host element', () => {
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(GeneralDataComponent));
      expect(component.nativeElement.classList.contains('card')).toBe(true);
    });

    it('has role region on host element', () => {
      fixture.detectChanges();

      const component = fixture.debugElement.query(By.directive(GeneralDataComponent));
      expect(component.nativeElement.getAttribute('role')).toBe('region');
    });
  });
});
