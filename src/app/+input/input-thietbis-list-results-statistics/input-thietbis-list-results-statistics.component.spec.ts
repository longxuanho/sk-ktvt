/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputThietbisListResultsStatisticsComponent } from './input-thietbis-list-results-statistics.component';

describe('InputThietbisListResultsStatisticsComponent', () => {
  let component: InputThietbisListResultsStatisticsComponent;
  let fixture: ComponentFixture<InputThietbisListResultsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputThietbisListResultsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputThietbisListResultsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
