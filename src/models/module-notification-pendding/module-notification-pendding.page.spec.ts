import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleNotificationPenddingPage } from './module-notification-pendding.page';

describe('ModuleNotificationPenddingPage', () => {
  let component: ModuleNotificationPenddingPage;
  let fixture: ComponentFixture<ModuleNotificationPenddingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleNotificationPenddingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleNotificationPenddingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
