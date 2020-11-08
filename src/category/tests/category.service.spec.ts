import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../service/category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    /* const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
    }).compile();
    service = module.get<CategoryService>(CategoryService); */
    service = new CategoryService();

  });

  it('it should returns categories', () => {
    expect(service.list()).toMatchObject([
      'Category A',
      'Category B',
      'Category C',
    ]);
  });
});
