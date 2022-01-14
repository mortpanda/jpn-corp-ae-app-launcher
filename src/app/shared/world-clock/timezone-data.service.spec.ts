import { TestBed } from '@angular/core/testing';

import { TimezoneDataService } from './timezone-data.service';

describe('TimezoneDataService', () => {
  let service: TimezoneDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimezoneDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
