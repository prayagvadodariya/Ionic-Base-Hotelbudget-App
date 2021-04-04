import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportInvoiceListPage } from './export-invoice-list.page';

describe('ExportInvoiceListPage', () => {
  let component: ExportInvoiceListPage;
  let fixture: ComponentFixture<ExportInvoiceListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportInvoiceListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportInvoiceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
