import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmDashboardPage } from './pm-dashboard.page';

describe('PmDashboardPage', () => {
  let component: PmDashboardPage;
  let fixture: ComponentFixture<PmDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
