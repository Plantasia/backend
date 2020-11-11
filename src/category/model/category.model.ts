import{ Column, Model, Table} from 'sequelize-typescript'

@Table
export class Category extends Model<Category>{

  @Column
  name: string;

  @Column
  description: string;

  @Column
  imageStorage: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
