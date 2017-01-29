/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputThietbisListNavComponent } from './input-thietbis-list-nav.component';

describe('InputThietbisListNavComponent', () => {
  let component: InputThietbisListNavComponent;
  let fixture: ComponentFixture<InputThietbisListNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputThietbisListNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputThietbisListNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
