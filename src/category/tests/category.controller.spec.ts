import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '..//category.controller';
import { CategoryService } from '../category.service';

describe('AppController', () => {
  let appController: CategoryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    appController = app.get<CategoryController>(CategoryController);
  });

  });
});
