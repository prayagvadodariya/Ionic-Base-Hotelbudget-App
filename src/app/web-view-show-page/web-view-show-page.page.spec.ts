import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebViewShowPagePage } from './web-view-show-page.page';

describe('WebViewShowPagePage', () => {
  let component: WebViewShowPagePage;
  let fixture: ComponentFixture<WebViewShowPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebViewShowPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebViewShowPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
