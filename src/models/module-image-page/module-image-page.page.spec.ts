import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleImagePagePage } from './module-image-page.page';

describe('ModuleSignPagePage', () => {
  let component: ModuleImagePagePage;
  let fixture: ComponentFixture<ModuleImagePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleImagePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleImagePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
