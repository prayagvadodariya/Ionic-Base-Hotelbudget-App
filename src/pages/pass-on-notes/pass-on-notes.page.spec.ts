import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassOnNotesPage } from './pass-on-notes.page';

describe('PassOnNotesPage', () => {
  let component: PassOnNotesPage;
  let fixture: ComponentFixture<PassOnNotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassOnNotesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassOnNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
