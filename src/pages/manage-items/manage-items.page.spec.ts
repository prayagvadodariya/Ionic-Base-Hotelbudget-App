import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageItemsPage } from './manage-items.page';

describe('ManageItemsPage', () => {
  let component: ManageItemsPage;
  let fixture: ComponentFixture<ManageItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
