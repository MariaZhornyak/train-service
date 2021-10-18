import { Test, TestingModule } from '@nestjs/testing';
import { CarriageController } from './carriage.controller';

describe('CarriageController', () => {
  let controller: CarriageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarriageController],
    }).compile();

    controller = module.get<CarriageController>(CarriageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
