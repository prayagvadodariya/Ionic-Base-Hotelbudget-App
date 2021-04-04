import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInvoicesPage } from './search-invoices.page';

describe('SearchInvoicesPage', () => {
  let component: SearchInvoicesPage;
  let fixture: ComponentFixture<SearchInvoicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInvoicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInvoicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
