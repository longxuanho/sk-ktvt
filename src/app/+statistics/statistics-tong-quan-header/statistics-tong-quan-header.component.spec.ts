/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatisticsTongQuanHeaderComponent } from './statistics-tong-quan-header.component';

describe('StatisticsTongQuanHeaderComponent', () => {
  let component: StatisticsTongQuanHeaderComponent;
  let fixture: ComponentFixture<StatisticsTongQuanHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsTongQuanHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsTongQuanHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
