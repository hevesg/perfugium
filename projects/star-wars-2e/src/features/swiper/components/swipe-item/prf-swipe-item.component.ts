import {
  AfterViewInit,
  Component,
  ContentChild,
  HostListener,
  computed,
  output,
  signal,
} from '@angular/core';
import { PrfSwipeStartComponent } from '../swipe-start/prf-swipe-start.component';
import { PrfSwipeEndComponent } from '../swipe-end/prf-swipe-end.component';

type SwipeState = 'start' | 'end' | null;

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
      width: 100%;
    }
  `,
})
export class PrfSwipeItemComponent implements AfterViewInit {
  private readonly SWIPE_THRESHOLD_PX = 50;

  @ContentChild(PrfSwipeStartComponent)
  protected readonly startPanel?: PrfSwipeStartComponent;

  @ContentChild(PrfSwipeEndComponent)
  protected readonly endPanel?: PrfSwipeEndComponent;

  readonly opened = output<SwipeState>();

  private readonly isOpen = signal<SwipeState>(null);
  protected readonly dragOffset = signal(0);
  protected readonly isDragging = signal(false);

  private startX = 0;
  private startPanelWidth = 0;
  private endPanelWidth = 0;

  ngAfterViewInit(): void {
    this.startPanelWidth = this.startPanel?.elementRef.nativeElement.offsetWidth ?? 0;
    this.endPanelWidth = this.endPanel?.elementRef.nativeElement.offsetWidth ?? 0;
  }

  protected readonly mainTransform = computed(() => {
    const open = this.isOpen();
    const drag = this.dragOffset();

    if (open === 'start') return `translateX(${this.startPanelWidth + drag}px)`;
    if (open === 'end') return `translateX(${-this.endPanelWidth + drag}px)`;
    return `translateX(${drag}px)`;
  });

  protected readonly mainTransition = computed(() =>
    this.isDragging() ? 'none' : 'transform 300ms ease',
  );

  close(): void {
    this.isOpen.set(null);
    this.dragOffset.set(0);
    this.opened.emit(null);
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
    const open = this.isOpen();
    let clamped = rawOffset;

    if (open === null) {
      if (rawOffset > 0 && !this.startPanel) clamped = 0;
      if (rawOffset < 0 && !this.endPanel) clamped = 0;
      clamped = Math.min(clamped, this.startPanel ? this.startPanelWidth : 0);
      clamped = Math.max(clamped, this.endPanel ? -this.endPanelWidth : 0);
    } else if (open === 'start') {
      clamped = Math.min(rawOffset, 0);
      clamped = Math.max(clamped, -this.startPanelWidth);
    } else if (open === 'end') {
      clamped = Math.max(rawOffset, 0);
      clamped = Math.min(clamped, this.endPanelWidth);
    }

    this.dragOffset.set(clamped);
  }

  private settle(): void {
    const offset = this.dragOffset();
    const open = this.isOpen();
    let next: SwipeState = open;

    if (open === null) {
      if (offset >= this.SWIPE_THRESHOLD_PX && this.startPanel) next = 'start';
      else if (offset <= -this.SWIPE_THRESHOLD_PX && this.endPanel) next = 'end';
    }

    this.isOpen.set(next);
    this.dragOffset.set(0);
    this.isDragging.set(false);

    if (next !== open) {
      this.opened.emit(next);
    }
  }
}
