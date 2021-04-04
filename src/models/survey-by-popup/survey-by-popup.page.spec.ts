import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyByPopupPage } from './survey-by-popup.page';

describe('SurveyByPopupPage', () => {
  let component: SurveyByPopupPage;
  let fixture: ComponentFixture<SurveyByPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyByPopupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyByPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
