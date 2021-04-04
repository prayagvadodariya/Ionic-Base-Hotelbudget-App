import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulViewProgressNewPage } from './modul-view-progress-new.page';

describe('ModulViewProgressNewPage', () => {
  let component: ModulViewProgressNewPage;
  let fixture: ComponentFixture<ModulViewProgressNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulViewProgressNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulViewProgressNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
