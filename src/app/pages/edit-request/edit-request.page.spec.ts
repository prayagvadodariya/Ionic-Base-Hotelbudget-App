import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestPage } from './edit-request.page';

describe('EditRequestPage', () => {
  let component: EditRequestPage;
  let fixture: ComponentFixture<EditRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
