import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Image {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
 
  @Column()
  public url: string;
 
  @Column()
  public key: string;
}
 
export default Image;