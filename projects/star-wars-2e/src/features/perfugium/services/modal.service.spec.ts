import { TestBed } from '@angular/core/testing';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { ModalService } from './modal.service';

@Component({ template: '' })
class MockModalComponent {}

describe('ModalService', () => {
  let service: ModalService;
  let mockDialog: { open: jest.Mock };
  let mockDialogRef: { closed: Subject<unknown> };

  beforeEach(() => {
    mockDialogRef = { closed: new Subject() };
    mockDialog = {
      open: jest.fn().mockReturnValue(mockDialogRef),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: Dialog, useValue: mockDialog }],
    });
    service = TestBed.inject(ModalService);
  });

  describe('open', () => {
    it('calls Dialog.open with the component', () => {
      service.open(MockModalComponent, {});

      expect(mockDialog.open).toHaveBeenCalledWith(
        MockModalComponent,
        expect.any(Object)
      );
    });

    it('passes data to dialog config', () => {
      const testData = { title: 'Test', value: 42 };

      service.open(MockModalComponent, testData);

      expect(mockDialog.open).toHaveBeenCalledWith(
        MockModalComponent,
        expect.objectContaining({ data: testData })
      );
    });

    it('configures dialog with correct width', () => {
      service.open(MockModalComponent, {});

      expect(mockDialog.open).toHaveBeenCalledWith(
        MockModalComponent,
        expect.objectContaining({ width: '500px' })
      );
    });

    it('configures dialog with correct maxWidth', () => {
      service.open(MockModalComponent, {});

      expect(mockDialog.open).toHaveBeenCalledWith(
        MockModalComponent,
        expect.objectContaining({ maxWidth: '90vw' })
      );
    });

    it('configures dialog with disableClose set to true', () => {
      service.open(MockModalComponent, {});

      expect(mockDialog.open).toHaveBeenCalledWith(
        MockModalComponent,
        expect.objectContaining({ disableClose: true })
      );
    });

    it('returns the closed observable from DialogRef', () => {
      const result = service.open(MockModalComponent, {});

      expect(result).toBe(mockDialogRef.closed);
    });

    it('emits result when dialog closes', (done) => {
      const expectedResult = { value: 'test result' };

      service.open<{ value: string }, object, MockModalComponent>(
        MockModalComponent,
        {}
      ).subscribe((result) => {
        expect(result).toEqual(expectedResult);
        done();
      });

      mockDialogRef.closed.next(expectedResult);
    });

    it('emits undefined when dialog closes without result', (done) => {
      service.open(MockModalComponent, {}).subscribe((result) => {
        expect(result).toBeUndefined();
        done();
      });

      mockDialogRef.closed.next(undefined);
    });
  });
});
