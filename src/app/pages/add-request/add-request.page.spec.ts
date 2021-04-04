import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestPage } from './add-request.page';

describe('AddRequestPage', () => {
  let component: AddRequestPage;
  let fixture: ComponentFixture<AddRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
