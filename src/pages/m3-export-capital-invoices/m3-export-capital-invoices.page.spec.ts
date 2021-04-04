import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { M3ExportCapitalInvoicesPage } from './m3-export-capital-invoices.page';

describe('M3ExportCapitalInvoicesPage', () => {
  let component: M3ExportCapitalInvoicesPage;
  let fixture: ComponentFixture<M3ExportCapitalInvoicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ M3ExportCapitalInvoicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(M3ExportCapitalInvoicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
