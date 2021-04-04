import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcategotyPage } from './addcategoty.page';

describe('AddcategotyPage', () => {
  let component: AddcategotyPage;
  let fixture: ComponentFixture<AddcategotyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcategotyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcategotyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
