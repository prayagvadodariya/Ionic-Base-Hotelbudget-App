import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPassOnNotePage } from './show-pass-on-note.page';

describe('ShowPassOnNotePage', () => {
  let component: ShowPassOnNotePage;
  let fixture: ComponentFixture<ShowPassOnNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPassOnNotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPassOnNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
