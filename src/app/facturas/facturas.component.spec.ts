/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FacturasComponent } from './facturas.component';

describe('FacturasComponent', () => {
  let component: FacturasComponent;
  let fixture: ComponentFixture<FacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
