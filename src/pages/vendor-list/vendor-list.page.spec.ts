import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorListPage } from './vendor-list.page';

describe('VendorListPage', () => {
  let component: VendorListPage;
  let fixture: ComponentFixture<VendorListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
