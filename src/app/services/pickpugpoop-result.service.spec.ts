import { TestBed } from '@angular/core/testing';

import { PickpugpoopResultService } from './pickpugpoop-result.service';

describe('PickpugpoopResultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickpugpoopResultService = TestBed.get(PickpugpoopResultService);
    expect(service).toBeTruthy();
  });
});
