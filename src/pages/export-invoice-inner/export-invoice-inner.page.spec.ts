import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportInvoiceInnerPage } from './export-invoice-inner.page';

describe('ExportInvoiceInnerPage', () => {
  let component: ExportInvoiceInnerPage;
  let fixture: ComponentFixture<ExportInvoiceInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportInvoiceInnerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportInvoiceInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
