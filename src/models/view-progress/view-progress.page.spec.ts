import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgressPage } from './view-progress.page';

describe('ViewProgressPage', () => {
  let component: ViewProgressPage;
  let fixture: ComponentFixture<ViewProgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProgressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
