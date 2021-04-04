import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleShowNotificationComment2Page } from './module-show-notification-comment2.page';

describe('ModuleShowNotificationComment2Page', () => {
  let component: ModuleShowNotificationComment2Page;
  let fixture: ComponentFixture<ModuleShowNotificationComment2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleShowNotificationComment2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleShowNotificationComment2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
