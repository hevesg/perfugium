import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import { PrfSwipeStartComponent } from '../swipe-start/prf-swipe-start.component';
import { PrfSwipeEndComponent } from '../swipe-end/prf-swipe-end.component';

type SwipeOutputState = 'start' | 'end' | null;
type PanelState = 'opening-start' | 'open-start' | 'opening-end' | 'open-end' | 'closing' | null;

@Component({
  selector: 'prf-swipe-item',
  standalone: false,
  template: `
    <ng-content select="prf-swipe-start"></ng-content>

    <div
      class="swipe-main"
      [style.transform]="mainTransform()"
      [style.transition]="mainTransition()"
      data-qa="swipe-main"
    >
      <ng-content></ng-content>
    </div>

    <ng-content select="prf-swipe-end"></ng-content>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }

    .swipe-main {
      position: relative;
      z-index: 1;
    }
  `,
  host: {
    '[class.is-open-start]': 'panelState() === "open-start" || panelState() === "opening-start"',
    '[class.is-open-end]': 'panelState() === "open-end" || panelState() === "opening-end"',
    '[class.is-opening]': 'panelState() === "opening-start" || panelState() === "opening-end"',
    '[class.is-closing]': 'panelState() === "closing"',
    '[class.is-dragging]': 'isPastThreshold()',
  },
})
export class PrfSwipeItemComponent {
  private readonly SWIPE_THRESHOLD_PX = 50;
  protected readonly TRANSITION_DURATION_MS = 300;
  private readonly elementRef = inject(ElementRef);

  @ContentChild(PrfSwipeStartComponent)
  protected readonly startPanel?: PrfSwipeStartComponent;

  @ContentChild(PrfSwipeEndComponent)
  protected readonly endPanel?: PrfSwipeEndComponent;

  readonly opened = output<SwipeOutputState>();

  protected readonly panelState = signal<PanelState>(null);
  protected readonly dragOffset = signal(0);
  protected readonly isDragging = signal(false);
  protected readonly isPastThreshold = computed(
    () => this.isDragging() && Math.abs(this.dragOffset()) >= this.SWIPE_THRESHOLD_PX,
  );

  private readonly openSide = computed<SwipeOutputState>(() => {
    const s = this.panelState();
    if (s === 'open-start' || s === 'opening-start') return 'start';
    if (s === 'open-end' || s === 'opening-end') return 'end';
    return null;
  });

  private startX = 0;
  private stateTimer?: ReturnType<typeof setTimeout>;

  private get hostWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }

  private scheduleTransition(next: PanelState): void {
    clearTimeout(this.stateTimer);
    this.stateTimer = setTimeout(() => this.panelState.set(next), this.TRANSITION_DURATION_MS);
  }

  protected readonly mainTransform = computed(() => {
    const side = this.openSide();
    const drag = this.dragOffset();
    if (side === 'start') return `translateX(calc(100% + ${drag}px))`;
    if (side === 'end') return `translateX(calc(-100% + ${drag}px))`;
    return `translateX(${drag}px)`;
  });

  protected readonly mainTransition = computed(() =>
    this.isDragging() ? 'none' : 'transform 300ms ease',
  );

  close(): void {
    this.panelState.set('closing');
    this.dragOffset.set(0);
    this.opened.emit(null);
    this.scheduleTransition(null);
  }

  @HostListener('touchstart', ['$event'])
  protected onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.isDragging.set(true);
  }

  @HostListener('touchmove', ['$event'])
  protected onTouchMove(event: TouchEvent): void {
    if (!this.isDragging()) return;
    this.applyDrag(event.touches[0].clientX - this.startX);
  }

  @HostListener('touchend')
  protected onTouchEnd(): void {
    this.settle();
  }

  @HostListener('mousedown', ['$event'])
  protected onMouseDown(event: MouseEvent): void {
    this.startX = event.clientX;
    this.isDragging.set(true);
  }

  @HostListener('document:mousemove', ['$event'])
  protected onMouseMove(event: MouseEvent): void {
    if (!this.isDragging()) return;
    this.applyDrag(event.clientX - this.startX);
  }

  @HostListener('document:mouseup')
  protected onMouseUp(): void {
    if (!this.isDragging()) return;
    this.settle();
  }

  private applyDrag(rawOffset: number): void {
    const side = this.openSide();
    let clamped = rawOffset;

    if (side === null) {
      if (rawOffset > 0 && !this.startPanel) clamped = 0;
      if (rawOffset < 0 && !this.endPanel) clamped = 0;
      clamped = Math.min(clamped, this.startPanel ? this.hostWidth : 0);
      clamped = Math.max(clamped, this.endPanel ? -this.hostWidth : 0);
    } else if (side === 'start') {
      clamped = Math.min(rawOffset, 0);
    } else if (side === 'end') {
      clamped = Math.max(rawOffset, 0);
    }

    this.dragOffset.set(clamped);
  }

  private settle(): void {
    const offset = this.dragOffset();
    const side = this.openSide();
    let nextSide: SwipeOutputState = side;

    if (side === null) {
      if (offset >= this.SWIPE_THRESHOLD_PX && this.startPanel) nextSide = 'start';
      else if (offset <= -this.SWIPE_THRESHOLD_PX && this.endPanel) nextSide = 'end';
    }

    this.dragOffset.set(0);
    this.isDragging.set(false);

    if (nextSide !== side) {
      this.opened.emit(nextSide);
      if (nextSide === 'start') {
        this.panelState.set('opening-start');
        this.scheduleTransition('open-start');
      } else if (nextSide === 'end') {
        this.panelState.set('opening-end');
        this.scheduleTransition('open-end');
      }
    }
  }
}
