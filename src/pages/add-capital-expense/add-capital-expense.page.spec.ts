import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCapitalExpensePage } from './add-capital-expense.page';

describe('AddCapitalExpensePage', () => {
  let component: AddCapitalExpensePage;
  let fixture: ComponentFixture<AddCapitalExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCapitalExpensePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCapitalExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
