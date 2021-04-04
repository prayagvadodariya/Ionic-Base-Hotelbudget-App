import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalExpenseInnerPage } from './capital-expense-inner.page';

describe('CapitalExpenseInnerPage', () => {
  let component: CapitalExpenseInnerPage;
  let fixture: ComponentFixture<CapitalExpenseInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalExpenseInnerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalExpenseInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
