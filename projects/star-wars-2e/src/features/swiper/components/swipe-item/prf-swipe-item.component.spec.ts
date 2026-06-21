import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SwiperModule } from '../../swiper-module';
import { PrfSwipeItemComponent } from './prf-swipe-item.component';

const HOST_WIDTH = 80;

function mouseSwipe(host: HTMLElement, startX: number, endX: number): void {
  host.dispatchEvent(new MouseEvent('mousedown', { clientX: startX, bubbles: true }));
  document.dispatchEvent(new MouseEvent('mousemove', { clientX: endX, bubbles: true }));
  document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
}

function mouseDown(host: HTMLElement, clientX = 0): void {
  host.dispatchEvent(new MouseEvent('mousedown', { clientX, bubbles: true }));
}

function mouseUp(): void {
  document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
}

// ── Test hosts ────────────────────────────────────────────────────────────────

type SwipeState = 'start' | 'end' | null;

@Component({
  standalone: false,
  template: `
    <prf-swipe-item (opened)="onOpened($event)">
      <prf-swipe-start><button>start action</button></prf-swipe-start>
      <span data-qa="main">main</span>
      <prf-swipe-end><button>end action</button></prf-swipe-end>
    </prf-swipe-item>
  `,
})
class BothPanelsHostComponent {
  openedValue: SwipeState = null;
  onOpened(v: SwipeState): void {
    this.openedValue = v;
  }
}

@Component({
  selector: 'test-start-only-host',
  standalone: false,
  template: `
    <prf-swipe-item (opened)="onOpened($event)">
      <span data-qa="main">main</span>
      <prf-swipe-start><button>start action</button></prf-swipe-start>
    </prf-swipe-item>
  `,
})
class StartOnlyHostComponent {
  openedValue: SwipeState = null;
  onOpened(v: SwipeState): void {
    this.openedValue = v;
  }
}

@Component({
  selector: 'test-end-only-host',
  standalone: false,
  template: `
    <prf-swipe-item (opened)="onOpened($event)">
      <span data-qa="main">main</span>
      <prf-swipe-end><button>end action</button></prf-swipe-end>
    </prf-swipe-item>
  `,
})
class EndOnlyHostComponent {
  openedValue: SwipeState = null;
  onOpened(v: SwipeState): void {
    this.openedValue = v;
  }
}

@Component({
  selector: 'test-no-panels-host',
  standalone: false,
  template: `
    <prf-swipe-item>
      <span data-qa="main">main</span>
    </prf-swipe-item>
  `,
})
class NoPanelsHostComponent {}

// ── Helpers ───────────────────────────────────────────────────────────────────

function setupFixture<T>(hostType: new () => T): {
  fixture: ComponentFixture<T>;
  host: T;
  swipeItem: PrfSwipeItemComponent;
  hostElement: HTMLElement;
  mainEl: HTMLElement;
} {
  const fixture = TestBed.createComponent(hostType);
  fixture.detectChanges();

  const swipeItemDebug = fixture.debugElement.query(By.directive(PrfSwipeItemComponent));
  const swipeItem = swipeItemDebug.componentInstance as PrfSwipeItemComponent;
  const hostElement = swipeItemDebug.nativeElement as HTMLElement;
  const mainEl = fixture.debugElement.query(By.css('[data-qa="swipe-main"]'))
    .nativeElement as HTMLElement;

  // JSDOM has no layout engine — mock host offsetWidth so gesture clamping works
  Object.defineProperty(hostElement, 'offsetWidth', { configurable: true, get: () => HOST_WIDTH });

  return { fixture, host: fixture.componentInstance, swipeItem, hostElement, mainEl };
}

// ── Specs ─────────────────────────────────────────────────────────────────────

describe('PrfSwipeItemComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperModule],
      declarations: [
        BothPanelsHostComponent,
        StartOnlyHostComponent,
        EndOnlyHostComponent,
        NoPanelsHostComponent,
      ],
    }).compileComponents();
  });

  describe('transition', () => {
    it('disables transition while dragging', () => {
      const { fixture, hostElement, mainEl } = setupFixture(BothPanelsHostComponent);

      mouseDown(hostElement, 0);
      fixture.detectChanges();

      expect(mainEl.style.transition).toBe('none');
    });

    it('restores transition after drag ends', () => {
      const { fixture, hostElement, mainEl } = setupFixture(BothPanelsHostComponent);

      mouseDown(hostElement, 0);
      mouseUp();
      fixture.detectChanges();

      expect(mainEl.style.transition).toBe('transform 300ms ease');
    });
  });

  describe('with both panels', () => {
    describe('swiping right', () => {
      it('opens the start panel when dragged past the threshold', () => {
        const { fixture, hostElement, mainEl } = setupFixture(BothPanelsHostComponent);

        mouseSwipe(hostElement, 0, 60);
        fixture.detectChanges();

        expect(mainEl.style.transform).toBe('translateX(calc(100% + 0px))');
      });

      it('emits "start" when the start panel opens', () => {
        const { fixture, host, hostElement } = setupFixture(BothPanelsHostComponent);

        mouseSwipe(hostElement, 0, 60);
        fixture.detectChanges();

        expect(host.openedValue).toBe('start');
      });

      it('snaps back when dragged below the threshold', () => {
        const { fixture, hostElement, mainEl } = setupFixture(BothPanelsHostComponent);

        mouseSwipe(hostElement, 0, 30);
        fixture.detectChanges();

        expect(mainEl.style.transform).toBe('translateX(0px)');
      });

      it('does not emit when snapping back', () => {
        const { fixture, host, hostElement } = setupFixture(BothPanelsHostComponent);

        mouseSwipe(hostElement, 0, 30);
        fixture.detectChanges();

        expect(host.openedValue).toBeNull();
      });
    });

    describe('swiping left', () => {
      it('opens the end panel when dragged past the threshold', () => {
        const { fixture, hostElement, mainEl } = setupFixture(BothPanelsHostComponent);

        mouseSwipe(hostElement, 0, -60);
        fixture.detectChanges();

        expect(mainEl.style.transform).toBe('translateX(calc(-100% + 0px))');
      });

      it('emits "end" when the end panel opens', () => {
        const { fixture, host, hostElement } = setupFixture(BothPanelsHostComponent);

        mouseSwipe(hostElement, 0, -60);
        fixture.detectChanges();

        expect(host.openedValue).toBe('end');
      });

      it('snaps back when dragged below the threshold', () => {
        const { fixture, hostElement, mainEl } = setupFixture(BothPanelsHostComponent);

        mouseSwipe(hostElement, 0, -30);
        fixture.detectChanges();

        expect(mainEl.style.transform).toBe('translateX(0px)');
      });
    });
  });

  describe('with start panel only', () => {
    it('does not move when swiped left (no end panel)', () => {
      const { fixture, hostElement, mainEl } = setupFixture(StartOnlyHostComponent);

      mouseSwipe(hostElement, 0, -60);
      fixture.detectChanges();

      expect(mainEl.style.transform).toBe('translateX(0px)');
    });

    it('does not emit when swiped left', () => {
      const { fixture, host, hostElement } = setupFixture(StartOnlyHostComponent);

      mouseSwipe(hostElement, 0, -60);
      fixture.detectChanges();

      expect(host.openedValue).toBeNull();
    });
  });

  describe('with end panel only', () => {
    it('does not move when swiped right (no start panel)', () => {
      const { fixture, hostElement, mainEl } = setupFixture(EndOnlyHostComponent);

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();

      expect(mainEl.style.transform).toBe('translateX(0px)');
    });

    it('does not emit when swiped right', () => {
      const { fixture, host, hostElement } = setupFixture(EndOnlyHostComponent);

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();

      expect(host.openedValue).toBeNull();
    });
  });

  describe('with no panels', () => {
    it('does not move in either direction', () => {
      const { fixture, hostElement, mainEl } = setupFixture(NoPanelsHostComponent);

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();
      expect(mainEl.style.transform).toBe('translateX(0px)');

      mouseSwipe(hostElement, 0, -60);
      fixture.detectChanges();
      expect(mainEl.style.transform).toBe('translateX(0px)');
    });
  });

  describe('close()', () => {
    it('resets the transform to closed', () => {
      const { fixture, hostElement, mainEl, swipeItem } = setupFixture(BothPanelsHostComponent);

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();

      swipeItem.close();
      fixture.detectChanges();

      expect(mainEl.style.transform).toBe('translateX(0px)');
    });

    it('emits null', () => {
      const { fixture, host, hostElement, swipeItem } = setupFixture(BothPanelsHostComponent);

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();

      swipeItem.close();

      expect(host.openedValue).toBeNull();
    });
  });

  describe('host state classes', () => {
    it('has no state class by default', () => {
      const { hostElement } = setupFixture(BothPanelsHostComponent);

      expect(hostElement.classList).not.toContain('is-open-start');
      expect(hostElement.classList).not.toContain('is-open-end');
      expect(hostElement.classList).not.toContain('is-dragging');
    });

    it('adds is-dragging class once drag passes the threshold', () => {
      const { fixture, hostElement } = setupFixture(BothPanelsHostComponent);

      mouseDown(hostElement, 0);
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 60, bubbles: true }));
      fixture.detectChanges();

      expect(hostElement.classList).toContain('is-dragging');
    });

    it('does not add is-dragging class for sub-threshold drag', () => {
      const { fixture, hostElement } = setupFixture(BothPanelsHostComponent);

      mouseDown(hostElement, 0);
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 30, bubbles: true }));
      fixture.detectChanges();

      expect(hostElement.classList).not.toContain('is-dragging');
    });

    it('removes is-dragging class after drag ends', () => {
      const { fixture, hostElement } = setupFixture(BothPanelsHostComponent);

      mouseDown(hostElement, 0);
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 60, bubbles: true }));
      mouseUp();
      fixture.detectChanges();

      expect(hostElement.classList).not.toContain('is-dragging');
    });

    it('adds is-open-start class when swiped right past threshold', () => {
      const { fixture, hostElement } = setupFixture(BothPanelsHostComponent);

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();

      expect(hostElement.classList).toContain('is-open-start');
      expect(hostElement.classList).not.toContain('is-open-end');
      expect(hostElement.classList).not.toContain('is-dragging');
    });

    it('adds is-open-end class when swiped left past threshold', () => {
      const { fixture, hostElement } = setupFixture(BothPanelsHostComponent);

      mouseSwipe(hostElement, 0, -60);
      fixture.detectChanges();

      expect(hostElement.classList).toContain('is-open-end');
      expect(hostElement.classList).not.toContain('is-open-start');
      expect(hostElement.classList).not.toContain('is-dragging');
    });

    it('removes is-open-* classes immediately after close()', () => {
      const { fixture, hostElement, swipeItem } = setupFixture(BothPanelsHostComponent);
      jest.useFakeTimers();

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();

      swipeItem.close();
      fixture.detectChanges();

      expect(hostElement.classList).not.toContain('is-open-start');
      expect(hostElement.classList).not.toContain('is-open-end');

      jest.useRealTimers();
    });

    it('adds is-closing class immediately after close()', () => {
      const { fixture, hostElement, swipeItem } = setupFixture(BothPanelsHostComponent);
      jest.useFakeTimers();

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();

      swipeItem.close();
      fixture.detectChanges();

      expect(hostElement.classList).toContain('is-closing');

      jest.useRealTimers();
    });

    it('removes is-closing class after the transition duration', () => {
      const { fixture, hostElement, swipeItem } = setupFixture(BothPanelsHostComponent);
      jest.useFakeTimers();

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();

      swipeItem.close();
      fixture.detectChanges();

      jest.advanceTimersByTime(swipeItem['TRANSITION_DURATION_MS']);
      fixture.detectChanges();

      expect(hostElement.classList).not.toContain('is-closing');

      jest.useRealTimers();
    });

    it('does not add is-opening class after close()', () => {
      const { fixture, hostElement, swipeItem } = setupFixture(BothPanelsHostComponent);
      jest.useFakeTimers();

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();
      swipeItem.close();
      fixture.detectChanges();

      expect(hostElement.classList).not.toContain('is-opening');

      jest.useRealTimers();
    });
  });

  describe('is-opening class', () => {
    it('adds is-opening class immediately when settled to open', () => {
      const { fixture, hostElement, swipeItem } = setupFixture(BothPanelsHostComponent);
      jest.useFakeTimers();

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();

      expect(hostElement.classList).toContain('is-opening');

      jest.useRealTimers();
    });

    it('removes is-opening class after transition duration', () => {
      const { fixture, hostElement, swipeItem } = setupFixture(BothPanelsHostComponent);
      jest.useFakeTimers();

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();

      jest.advanceTimersByTime(swipeItem['TRANSITION_DURATION_MS']);
      fixture.detectChanges();

      expect(hostElement.classList).not.toContain('is-opening');
      expect(hostElement.classList).toContain('is-open-start');

      jest.useRealTimers();
    });

    it('does not add is-opening class when snap-back occurs (below threshold)', () => {
      const { fixture, hostElement } = setupFixture(BothPanelsHostComponent);

      mouseSwipe(hostElement, 0, 30);
      fixture.detectChanges();

      expect(hostElement.classList).not.toContain('is-opening');
    });
  });

  describe('is-closing class', () => {
    it('does not linger if close() is called again before timer expires', () => {
      const { fixture, hostElement, swipeItem } = setupFixture(BothPanelsHostComponent);
      jest.useFakeTimers();

      mouseSwipe(hostElement, 0, 60);
      fixture.detectChanges();
      swipeItem.close();
      fixture.detectChanges();

      jest.advanceTimersByTime(swipeItem['TRANSITION_DURATION_MS'] / 2);
      swipeItem.close();
      fixture.detectChanges();

      jest.advanceTimersByTime(swipeItem['TRANSITION_DURATION_MS']);
      fixture.detectChanges();

      expect(hostElement.classList).not.toContain('is-closing');

      jest.useRealTimers();
    });
  });
});
