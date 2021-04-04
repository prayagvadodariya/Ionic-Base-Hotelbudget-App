import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxExemptPage } from './tax-exempt.page';

describe('TaxExemptPage', () => {
  let component: TaxExemptPage;
  let fixture: ComponentFixture<TaxExemptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxExemptPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxExemptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
