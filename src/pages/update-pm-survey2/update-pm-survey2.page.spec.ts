import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePmSurvey2Page } from './update-pm-survey2.page';

describe('UpdatePmSurvey2Page', () => {
  let component: UpdatePmSurvey2Page;
  let fixture: ComponentFixture<UpdatePmSurvey2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePmSurvey2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePmSurvey2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
