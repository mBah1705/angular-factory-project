import { TestBed } from '@angular/core/testing';

import { FieldFactory } from './field-factory.service';

describe('FieldFactoryService', () => {
  let service: FieldFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
