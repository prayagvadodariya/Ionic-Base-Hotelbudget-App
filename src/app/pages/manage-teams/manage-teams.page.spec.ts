import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeamsPage } from './manage-teams.page';

describe('ManageTeamsPage', () => {
  let component: ManageTeamsPage;
  let fixture: ComponentFixture<ManageTeamsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTeamsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
