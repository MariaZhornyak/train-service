import { Test, TestingModule } from '@nestjs/testing';
import { CarriageTypeController } from './carriage-type.controller';

describe('CarriageTypeController', () => {
  let controller: CarriageTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarriageTypeController],
    }).compile();

    controller = module.get<CarriageTypeController>(CarriageTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
