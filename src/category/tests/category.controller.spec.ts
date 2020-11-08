import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../controller/category.controller';
import { CategoryService } from '../service/category.service';

describe('AppController', () => {
  let appController: CategoryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();

    appController = app.get<CategoryController>(CategoryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(CategoryController.getHello()).toBe('Hello World!');
    });
  });
});
