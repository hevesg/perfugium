import { NgModule } from '@angular/core';
import { PrfSwipeItemComponent } from './components/swipe-item/prf-swipe-item.component';
import { PrfSwipeStartComponent } from './components/swipe-start/prf-swipe-start.component';
import { PrfSwipeEndComponent } from './components/swipe-end/prf-swipe-end.component';

@NgModule({
  declarations: [PrfSwipeItemComponent, PrfSwipeStartComponent, PrfSwipeEndComponent],
  exports: [PrfSwipeItemComponent, PrfSwipeStartComponent, PrfSwipeEndComponent],
})
export class SwiperModule { }
