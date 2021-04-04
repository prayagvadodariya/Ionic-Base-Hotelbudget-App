import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSignPagePage } from './module-sign-page.page';

describe('ModuleSignPagePage', () => {
  let component: ModuleSignPagePage;
  let fixture: ComponentFixture<ModuleSignPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleSignPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSignPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
