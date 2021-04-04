import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelloacateAmountPage } from './relloacate-amount.page';

describe('RelloacateAmountPage', () => {
  let component: RelloacateAmountPage;
  let fixture: ComponentFixture<RelloacateAmountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelloacateAmountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelloacateAmountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
