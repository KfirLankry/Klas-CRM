import { TestBed } from '@angular/core/testing';

import { GauthGuard } from './gauth.guard';

describe('GauthGuard', () => {
  let guard: GauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
