import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RMDashboardPage } from './rmdashboard.page';

describe('GMDashboardPage', () => {
  let component: RMDashboardPage;
  let fixture: ComponentFixture<RMDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RMDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RMDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
