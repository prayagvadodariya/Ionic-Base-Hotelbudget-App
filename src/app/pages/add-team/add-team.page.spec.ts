import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamPage } from './add-team.page';

describe('AddTeamPage', () => {
  let component: AddTeamPage;
  let fixture: ComponentFixture<AddTeamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeamPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
