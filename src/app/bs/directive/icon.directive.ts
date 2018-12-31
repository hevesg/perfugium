import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[prfIcon]'
})
export class IconDirective {

  @Input('prfIcon')
  public iconType = 'bell';

  constructor(private el: ElementRef) {
    el.nativeElement.classList.add('fa', 'fa-' + this.iconType);
  }

}
