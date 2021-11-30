import { Test, TestingModule } from '@nestjs/testing';
import { CarriageService } from './carriage.service';

describe('CarriageService', () => {
  let service: CarriageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarriageService],
    }).compile();

    service = module.get<CarriageService>(CarriageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
