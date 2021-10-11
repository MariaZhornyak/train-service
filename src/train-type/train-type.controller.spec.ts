import { Test, TestingModule } from '@nestjs/testing';
import { TrainTypeController } from './train-type.controller';

describe('TrainTypeController', () => {
  let controller: TrainTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainTypeController],
    }).compile();

    controller = module.get<TrainTypeController>(TrainTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
