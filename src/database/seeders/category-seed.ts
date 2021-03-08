import { Category } from '@entities/category.entity'
import { User } from '@entities/user.entity';
import {internet} from 'faker';
import {UserService} from '../../modules/profile/user/user.service'

export default function CategorySeed():Category[]{


  const category1 = new Category() 
  category1.name="Suculentas";
  category1.description =` Essa categoria é destinada às plantas
  suculentas de todas espécie`;
  category1.authorSlug = '237eec28-d2a9-4d0d-8d0b-6d0105475f33'
  category1.authorLogin ='admin@admin.com'
  category1.imageStorage = internet.avatar()

  const category2 = new Category()
  category2.name="Cactáceas";
  category2.description =` Essa categoria é destinada às plantas
  cactáceas de todas espécie`;
  category2.authorSlug = '4fb69684-5126-4b3f-9d29-d65cb7fbf2e2'
  category2.authorLogin ='admin@admin.com'
  category2.imageStorage = internet.avatar()

  const category3 = new Category()
  category3.name="Gramíneas";
  category3.description =` Essa categoria é destinada às plantas
  gramíneas de todas espécie`;
  category3.authorSlug = '875723a6-3a66-402f-b6fa-5f609772c873'
  category3.authorLogin ='admin@admin.com'
  category3.imageStorage = internet.avatar()

  const category4 = new Category()
  category4.name="Briófitas";
  category4.description =` Essa categoria é destinada às plantas
  briófitas de todas espécie`;
  category4.authorSlug = '875723a6-3a66-402f-b6fa-5f609772c873'
  category4.authorLogin ='admin@admin.com'
  category4.imageStorage = internet.avatar()

  const category5 = new Category()
  category5.name="Angiospermas";
  category5.description =` Essa categoria é destinada às plantas
  angiospermas de todas espécie`;
  category5.authorSlug = '875723a6-3a66-402f-b6fa-5f609772c873'
  category5.authorLogin ='admin@admin.com'
  category5.imageStorage = internet.avatar()

  const category6 = new Category()
  category6.name="Flores";
  category6.description =` Essa categoria é destinada às flores
  de todas espécie`;
  category6.authorSlug = '4fb69684-5126-4b3f-9d29-d65cb7fbf2e2'
  category6.authorLogin ='admin@admin.com'
  category6.imageStorage = internet.avatar()


  const category7 = new Category()
  category7.name="Algas";
  category7.description =` Essa categoria é destinada às algas de 
  todas espécie`;
  category7.authorSlug = '237eec28-d2a9-4d0d-8d0b-6d0105475f33'
  category1.authorLogin ='admin@admin.com'
  category7.imageStorage = internet.avatar()


  const category8 = new Category()
  category8.name="Exóticas";
  category8.description =` Essa categoria é destinada às plantas
  exóticas de todas espécie`;
  category8.authorSlug = '4fb69684-5126-4b3f-9d29-d65cb7fbf2e2'
  category8.authorLogin ='admin@admin.com'
  category8.imageStorage = internet.avatar()


  const category9 = new Category()
  category9.name="Ornamentais";
  category9.description =` Essa categoria é destinada às plantas
  ornamentais de todas espécie`;
  category9.authorSlug = '237eec28-d2a9-4d0d-8d0b-6d0105475f33'
  category9.authorLogin ='admin@admin.com'
  category9.imageStorage = internet.avatar()


  const category10 = new Category()
  category10.name="Carnívoras";
  category10.description =` Essa categoria é destinada às plantas
  carnívoras de todas espécie`;
  category10.authorSlug = '237eec28-d2a9-4d0d-8d0b-6d0105475f33'
  category10.authorLogin ='admin@admin.com'
  category10.imageStorage = internet.avatar()

  const categories =[
    category1,
    category2,
    category3,
    category4,
    category5,
    category6,
    category7,
    category8,
    category9,
    category10,
  ]

  return categories
}