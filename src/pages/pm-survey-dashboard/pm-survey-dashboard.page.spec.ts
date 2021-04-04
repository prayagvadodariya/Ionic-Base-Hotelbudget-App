import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMSurveyDashboardPage } from './pm-survey-dashboard.page';

describe('PMSurveyDashboardPage', () => {
  let component: PMSurveyDashboardPage;
  let fixture: ComponentFixture<PMSurveyDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMSurveyDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMSurveyDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
