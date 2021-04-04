import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBudgetPage } from './report-budget.page';

describe('ReportBudgetPage', () => {
  let component: ReportBudgetPage;
  let fixture: ComponentFixture<ReportBudgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBudgetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBudgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
