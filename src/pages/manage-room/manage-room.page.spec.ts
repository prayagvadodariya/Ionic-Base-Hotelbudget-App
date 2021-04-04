import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoomPage } from './manage-room.page';

describe('ManageRoomPage', () => {
  let component: ManageRoomPage;
  let fixture: ComponentFixture<ManageRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
