import { TestBed } from '@angular/core/testing';

import { GetEmployeeByIdService } from './get-employee-by-id.service';

describe('GetEmployeeByIdService', () => {
  let service: GetEmployeeByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEmployeeByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
