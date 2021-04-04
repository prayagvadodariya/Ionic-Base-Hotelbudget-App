import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExpensePage } from './show-expense.page';

describe('ShowExpensePage', () => {
  let component: ShowExpensePage;
  let fixture: ComponentFixture<ShowExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowExpensePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
