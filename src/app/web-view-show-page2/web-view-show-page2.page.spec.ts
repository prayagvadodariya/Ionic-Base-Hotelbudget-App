import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebViewShowPage2Page } from './web-view-show-page2.page';

describe('WebViewShowPage2Page', () => {
  let component: WebViewShowPage2Page;
  let fixture: ComponentFixture<WebViewShowPage2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebViewShowPage2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebViewShowPage2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
