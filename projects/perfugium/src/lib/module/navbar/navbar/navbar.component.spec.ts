import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
  template: '<prf-navbar [brand]="\'hello\'" #navbar></prf-navbar>'
})
export class HostComponent {
  @ViewChild('navbar', { static: true}) navbar!: NavbarComponent;
}

describe('NavbarComponent', () => {
  let hostComponent: HostComponent;
  let component: NavbarComponent;
  let fixture: ComponentFixture<HostComponent>;
  let navbarBrand: HTMLAnchorElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent, HostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    component = hostComponent.navbar;
    fixture.detectChanges();
    navbarBrand = fixture.debugElement.query(By.css('.navbar-brand')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onClickBrand when clicking on brand', () => {
    const spy: any = spyOn(component, 'onClickBrand');
    navbarBrand.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit event when clicking on brand', () => {
    const spy: any = spyOn(component.clickBrand, 'emit');
    navbarBrand.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
