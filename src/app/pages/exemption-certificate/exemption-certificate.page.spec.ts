import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptionCertificatePage } from './exemption-certificate.page';

describe('ExemptionCertificatePage', () => {
  let component: ExemptionCertificatePage;
  let fixture: ComponentFixture<ExemptionCertificatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemptionCertificatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemptionCertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
