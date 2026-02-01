import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { ModalService } from '../services/modal.service';
import { PerfugiumModule } from '../perfugium-module';

@Component({ template: '', standalone: false })
class MockModalComponent {}

const TEST_MODAL_KEY = 'test-modal';

@Component({
  standalone: false,
  template: `
    <input
      [formControl]="control"
      [formModal]="modalKey"
      [formModalData]="modalData"
    />
  `,
})
class TestHostComponent {
  control = new FormControl('initial value');
  modalKey = TEST_MODAL_KEY;
  modalData = { title: 'Test Modal' };
}

describe('FormModalDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let mockModalService: { open: jest.Mock };
  let modalClosed$: Subject<unknown>;

  beforeEach(async () => {
    modalClosed$ = new Subject();
    mockModalService = {
      get: jest.fn().mockReturnValue(MockModalComponent),
      open: jest.fn().mockReturnValue(modalClosed$.asObservable()),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PerfugiumModule],
      declarations: [TestHostComponent],
      providers: [{ provide: ModalService, useValue: mockModalService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('open', () => {
    it('calls modalService.get with the modal key', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('click', null);

      expect(mockModalService.get).toHaveBeenCalledWith(TEST_MODAL_KEY);
    });

    it('calls modalService.open with the component from get', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('click', null);

      expect(mockModalService.open).toHaveBeenCalledWith(
        MockModalComponent,
        expect.any(Object)
      );
    });

    it('passes formModalData to modalService.open', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('click', null);

      expect(mockModalService.open).toHaveBeenCalledWith(
        MockModalComponent,
        expect.objectContaining({ title: 'Test Modal' })
      );
    });

    it('passes current control value to modalService.open', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('click', null);

      expect(mockModalService.open).toHaveBeenCalledWith(
        MockModalComponent,
        expect.objectContaining({ value: 'initial value' })
      );
    });

    it('merges formModalData with control value', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('click', null);

      expect(mockModalService.open).toHaveBeenCalledWith(MockModalComponent, {
        title: 'Test Modal',
        value: 'initial value',
      });
    });

    it('updates control value when modal returns a result', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('click', null);
      modalClosed$.next('new value');

      expect(hostComponent.control.value).toBe('new value');
    });

    it('does not update control value when modal returns null', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('click', null);
      modalClosed$.next(null);

      expect(hostComponent.control.value).toBe('initial value');
    });

    it('does not update control value when modal returns undefined', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('click', null);
      modalClosed$.next(undefined);

      expect(hostComponent.control.value).toBe('initial value');
    });
  });

  describe('host bindings', () => {
    it('opens modal on click', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('click', null);

      expect(mockModalService.open).toHaveBeenCalled();
    });

    it('opens modal on keyup.enter', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('keyup.enter', null);

      expect(mockModalService.open).toHaveBeenCalled();
    });

    it('opens modal on keyup.space', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('keyup.space', { preventDefault: jest.fn() });

      expect(mockModalService.open).toHaveBeenCalled();
    });

    it('sets tabindex to 0', () => {
      const input = fixture.debugElement.query(By.css('input'));

      expect(input.attributes['tabindex']).toBe('0');
    });
  });

  describe('with default formModalData', () => {
    @Component({
      standalone: false,
      template: `<input [formControl]="control" [formModal]="modalKey" />`,
    })
    class MinimalHostComponent {
      control = new FormControl('test');
      modalKey = TEST_MODAL_KEY;
    }

    beforeEach(async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, PerfugiumModule],
        declarations: [MinimalHostComponent],
        providers: [{ provide: ModalService, useValue: mockModalService }],
      }).compileComponents();

      fixture = TestBed.createComponent(MinimalHostComponent) as ComponentFixture<any>;
      fixture.detectChanges();
    });

    it('passes empty object as formModalData when not provided', () => {
      const input = fixture.debugElement.query(By.css('input'));

      input.triggerEventHandler('click', null);

      expect(mockModalService.open).toHaveBeenCalledWith(MockModalComponent, {
        value: 'test',
      });
    });
  });
});
