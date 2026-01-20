import { TestBed } from '@angular/core/testing';

import { ComponentFactory } from './component-factory.service';

describe('GetComponentFactoryService', () => {
  let service: ComponentFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
