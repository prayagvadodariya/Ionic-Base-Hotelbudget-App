import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExpensePage } from './update-expense.page';

describe('UpdateExpensePage', () => {
  let component: UpdateExpensePage;
  let fixture: ComponentFixture<UpdateExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExpensePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
