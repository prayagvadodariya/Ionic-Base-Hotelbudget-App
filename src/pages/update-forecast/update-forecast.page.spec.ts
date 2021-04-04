import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForecastPage } from './update-forecast.page';

describe('UpdateForecastPage', () => {
  let component: UpdateForecastPage;
  let fixture: ComponentFixture<UpdateForecastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateForecastPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateForecastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
