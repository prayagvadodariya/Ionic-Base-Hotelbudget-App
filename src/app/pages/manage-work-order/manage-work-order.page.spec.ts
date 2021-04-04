import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkOrderPage } from './manage-work-order.page';

describe('ManageWorkOrderPage', () => {
  let component: ManageWorkOrderPage;
  let fixture: ComponentFixture<ManageWorkOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWorkOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
