import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { D6Module } from '../../d6-module';
import { D6Equipment } from '../../model/d6-character';

@Component({
  template: `<app-d6-equipment [formControl]="control" />`,
  standalone: true,
  imports: [ReactiveFormsModule, D6Module],
})
class TestHostComponent {
  control = new FormControl<D6Equipment[]>([]);
}

describe('D6EquipmentComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    });
  });

  describe('writeValue', () => {
    it('displays empty state when no equipment', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();

      const emptyText = fixture.debugElement.query(By.css('.text-body-secondary'));
      expect(emptyText.nativeElement.textContent).toBe('No equipment');
    });

    it('displays equipment table when equipment exists', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.control.setValue([
        { name: 'Lightsaber' },
        { name: 'Jedi Robes' },
      ]);
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(2);
    });

    it('displays equipment name and default quantity of 1', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.control.setValue([{ name: 'Lightsaber' }]);
      fixture.detectChanges();

      const row = fixture.debugElement.query(By.css('tbody tr'));
      expect(row.nativeElement.textContent).toContain('Lightsaber');
      expect(row.nativeElement.textContent).toContain('1');
    });

    it('displays quantity when provided', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.control.setValue([{ name: 'Thermal detonator', quantity: 3 }]);
      fixture.detectChanges();

      const row = fixture.debugElement.query(By.css('tbody tr'));
      expect(row.nativeElement.textContent).toContain('Thermal detonator');
      expect(row.nativeElement.textContent).toContain('3');
    });

    it('handles null value', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.control.setValue(null);
      fixture.detectChanges();

      const emptyText = fixture.debugElement.query(By.css('.text-body-secondary'));
      expect(emptyText.nativeElement.textContent).toBe('No equipment');
    });
  });
});
