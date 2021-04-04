import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalExpensePage } from './capital-expense.page';

describe('CapitalExpensePage', () => {
  let component: CapitalExpensePage;
  let fixture: ComponentFixture<CapitalExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalExpensePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
