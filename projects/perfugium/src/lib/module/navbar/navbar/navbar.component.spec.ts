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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onClickBrand when clicking on brand', () => {
    const spy: any = spyOn(component, 'onClickBrand');
    const navbarBrand: HTMLAnchorElement = fixture.debugElement.query(By.css('.navbar-brand')).nativeElement;
    navbarBrand.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
