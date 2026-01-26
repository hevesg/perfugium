import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { D6Module } from '../../d6-module';
import { D6Weapon } from '../../model/d6-character';

@Component({
  template: `<app-d6-weapons [formControl]="control" />`,
  standalone: true,
  imports: [ReactiveFormsModule, D6Module],
})
class TestHostComponent {
  control = new FormControl<D6Weapon[]>([]);
}

describe('D6WeaponsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    });
  });

  describe('writeValue', () => {
    it('displays empty state when no weapons', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();

      const emptyText = fixture.debugElement.query(By.css('.text-body-secondary'));
      expect(emptyText.nativeElement.textContent).toBe('No weapons');
    });

    it('displays weapons table when weapons exist', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.control.setValue([
        { name: 'Blaster Pistol', damage: 12 },
        { name: 'Vibroblade', damage: 8 },
      ]);
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(2);
    });

    it('displays weapon name and damage with d6 pipe', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.control.setValue([{ name: 'Blaster Pistol', damage: 12 }]);
      fixture.detectChanges();

      const row = fixture.debugElement.query(By.css('tbody tr'));
      expect(row.nativeElement.textContent).toContain('Blaster Pistol');
      expect(row.nativeElement.textContent).toContain('4D');
    });

    it('displays range when provided', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.control.setValue([
        { name: 'Blaster Rifle', damage: 15, range: { short: 25, medium: 50, long: 250 } },
      ]);
      fixture.detectChanges();

      const row = fixture.debugElement.query(By.css('tbody tr'));
      expect(row.nativeElement.textContent).toContain('25/50/250');
    });

    it('displays difficulty when provided', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.control.setValue([{ name: 'Lightsaber', damage: 15, difficulty: 4 }]);
      fixture.detectChanges();

      const row = fixture.debugElement.query(By.css('tbody tr'));
      expect(row.nativeElement.textContent).toContain('Very Difficult');
    });

    it('appends +STR to damage when strength is true', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.control.setValue([{ name: 'Knife', damage: 3, strength: true }]);
      fixture.detectChanges();

      const row = fixture.debugElement.query(By.css('tbody tr'));
      expect(row.nativeElement.textContent).toContain('1D');
      expect(row.nativeElement.textContent).toContain('+STR');
    });

    it('handles null value', () => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.componentInstance.control.setValue(null);
      fixture.detectChanges();

      const emptyText = fixture.debugElement.query(By.css('.text-body-secondary'));
      expect(emptyText.nativeElement.textContent).toBe('No weapons');
    });
  });
});
