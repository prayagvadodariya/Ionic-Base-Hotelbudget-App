import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCapitalInvoiceListPage } from './export-capital-invoices-list.page';

describe('ExportCapitalInvoiceListPage', () => {
  let component: ExportCapitalInvoiceListPage;
  let fixture: ComponentFixture<ExportCapitalInvoiceListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportCapitalInvoiceListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportCapitalInvoiceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
