import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkOrderPage } from './create-work-order.page';

describe('CreateWorkOrderPage', () => {
  let component: CreateWorkOrderPage;
  let fixture: ComponentFixture<CreateWorkOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
