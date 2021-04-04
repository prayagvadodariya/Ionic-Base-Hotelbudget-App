import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilteringPage } from './modal-filtering.page';

describe('ModalFilteringPage', () => {
  let component: ModalFilteringPage;
  let fixture: ComponentFixture<ModalFilteringPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFilteringPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilteringPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
