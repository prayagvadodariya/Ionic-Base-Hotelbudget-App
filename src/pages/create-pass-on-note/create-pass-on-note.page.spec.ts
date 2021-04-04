import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePassOnNotePage } from './create-pass-on-note.page';

describe('CreatePassOnNotePage', () => {
  let component: CreatePassOnNotePage;
  let fixture: ComponentFixture<CreatePassOnNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePassOnNotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePassOnNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
