import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpensePage } from './add-expense.page';

describe('AddExpensePage', () => {
  let component: AddExpensePage;
  let fixture: ComponentFixture<AddExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpensePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
