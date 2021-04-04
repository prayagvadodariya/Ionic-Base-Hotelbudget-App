import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPmSurveyPage } from './view-pm-survey.page';

describe('ViewPmSurveyPage', () => {
  let component: ViewPmSurveyPage;
  let fixture: ComponentFixture<ViewPmSurveyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPmSurveyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPmSurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
