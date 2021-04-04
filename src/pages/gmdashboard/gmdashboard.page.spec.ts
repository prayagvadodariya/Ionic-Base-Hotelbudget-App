import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GMDashboardPage } from './gmdashboard.page';

describe('GMDashboardPage', () => {
  let component: GMDashboardPage;
  let fixture: ComponentFixture<GMDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GMDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GMDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
