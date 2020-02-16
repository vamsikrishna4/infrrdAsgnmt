import { TestBed } from '@angular/core/testing';

import { StockHandlerService } from './stock-handler.service';

describe('StockHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockHandlerService = TestBed.get(StockHandlerService);
    expect(service).toBeTruthy();
  });
});
