import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmServeyNewPage } from './pm-servey-new.page';

describe('PmServeyNewPage', () => {
  let component: PmServeyNewPage;
  let fixture: ComponentFixture<PmServeyNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmServeyNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmServeyNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
