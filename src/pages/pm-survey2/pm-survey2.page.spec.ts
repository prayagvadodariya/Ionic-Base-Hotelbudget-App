import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmSurvey2Page } from './pm-survey2.page';

describe('PmSurvey2Page', () => {
  let component: PmSurvey2Page;
  let fixture: ComponentFixture<PmSurvey2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmSurvey2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmSurvey2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
