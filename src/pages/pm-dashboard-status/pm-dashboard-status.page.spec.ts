import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmDashboardStatusPage } from './pm-dashboard-status.page';

describe('PmDashboardStatusPage', () => {
  let component: PmDashboardStatusPage;
  let fixture: ComponentFixture<PmDashboardStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmDashboardStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmDashboardStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
