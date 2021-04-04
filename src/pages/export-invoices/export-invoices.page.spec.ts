import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportInvoicesPage } from './export-invoices.page';

describe('ExportInvoicesPage', () => {
  let component: ExportInvoicesPage;
  let fixture: ComponentFixture<ExportInvoicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportInvoicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportInvoicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
