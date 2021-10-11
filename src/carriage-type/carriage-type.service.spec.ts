import { Test, TestingModule } from '@nestjs/testing';
import { CarriageTypeService } from './carriage-type.service';

describe('CarriageTypeService', () => {
  let service: CarriageTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarriageTypeService],
    }).compile();

    service = module.get<CarriageTypeService>(CarriageTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
