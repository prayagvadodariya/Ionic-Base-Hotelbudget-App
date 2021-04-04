import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleShowNotificationCommentPage } from './module-show-notification-comment.page';

describe('ModuleShowNotificationCommentPage', () => {
  let component: ModuleShowNotificationCommentPage;
  let fixture: ComponentFixture<ModuleShowNotificationCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleShowNotificationCommentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleShowNotificationCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
