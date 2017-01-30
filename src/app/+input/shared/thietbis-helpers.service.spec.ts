/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThietbisHelpersService } from './thietbis-helpers.service';

describe('ThietbisHelpersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThietbisHelpersService]
    });
  });

  it('should ...', inject([ThietbisHelpersService], (service: ThietbisHelpersService) => {
    expect(service).toBeTruthy();
  }));
});
