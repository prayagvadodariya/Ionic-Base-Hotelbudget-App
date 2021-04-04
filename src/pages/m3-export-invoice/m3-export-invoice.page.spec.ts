import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { M3ExportInvoicePage } from './m3-export-invoice.page';

describe('M3ExportInvoicePage', () => {
  let component: M3ExportInvoicePage;
  let fixture: ComponentFixture<M3ExportInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ M3ExportInvoicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(M3ExportInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
