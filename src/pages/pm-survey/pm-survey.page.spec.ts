import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmSurveyPage } from './pm-survey.page';

describe('PmSurveyPage', () => {
  let component: PmSurveyPage;
  let fixture: ComponentFixture<PmSurveyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmSurveyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmSurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
