import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxExemptPage } from './add-tax-exempt.page';

describe('AddTaxExemptPage', () => {
  let component: AddTaxExemptPage;
  let fixture: ComponentFixture<AddTaxExemptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaxExemptPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaxExemptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
