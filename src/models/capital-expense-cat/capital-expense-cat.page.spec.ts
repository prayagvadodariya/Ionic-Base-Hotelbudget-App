import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalExpenseCatPage } from './capital-expense-cat.page';

describe('CapitalExpenseCatPage', () => {
  let component: CapitalExpenseCatPage;
  let fixture: ComponentFixture<CapitalExpenseCatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalExpenseCatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalExpenseCatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
