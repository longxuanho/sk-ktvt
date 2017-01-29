/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreferencesProfileService } from './preferences-profile.service';

describe('PreferencesProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferencesProfileService]
    });
  });

  it('should ...', inject([PreferencesProfileService], (service: PreferencesProfileService) => {
    expect(service).toBeTruthy();
  }));
});
