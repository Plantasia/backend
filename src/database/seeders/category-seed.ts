import { Category } from '@entities/category.entity'
import {internet} from 'faker';

export default function CategorySeed():Category[]{


  const category1 = new Category()
  category1.name="Suculentas";
  category1.description =` Essa categoria é destinada às plantas
  suculentas de todas espécie`;
  category1.imageStorage = internet.avatar()

  const category2 = new Category()
  category2.name="Cactáceas";
  category2.description =` Essa categoria é destinada às plantas
  cactáceas de todas espécie`;
  category2.imageStorage = internet.avatar()

  const category3 = new Category()
  category3.name="Gramíneas";
  category3.description =` Essa categoria é destinada às plantas
  gramíneas de todas espécie`;
  category3.imageStorage = internet.avatar()

  const category4 = new Category()
  category4.name="Suculentas";
  category4.description =` Essa categoria é destinada às plantas
  suculentas de todas espécie`;
  category4.imageStorage = internet.avatar()

  const category5 = new Category()
  category5.name="Suculentas";
  category5.description =` Essa categoria é destinada às plantas
  suculentas de todas espécie`;
  category5.imageStorage = internet.avatar()

  const category6 = new Category()
  category6.name="Suculentas";
  category6.description =` Essa categoria é destinada às plantas
  suculentas de todas espécie`;
  category6.imageStorage = internet.avatar()


  const category7 = new Category()
  category7.name="Suculentas";
  category7.description =` Essa categoria é destinada às plantas
  suculentas de todas espécie`;
  category7.imageStorage = internet.avatar()


  const category8 = new Category()
  category8.name="Suculentas";
  category8.description =` Essa categoria é destinada às plantas
  suculentas de todas espécie`;
  category8.imageStorage = internet.avatar()


  const category9 = new Category()
  category9.name="Suculentas";
  category9.description =` Essa categoria é destinada às plantas
  suculentas de todas espécie`;
  category9.imageStorage = internet.avatar()

  const category10 = new Category()
  category10.name="Suculentas";
  category10.description =` Essa categoria é destinada às plantas
  suculentas de todas espécie`;
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