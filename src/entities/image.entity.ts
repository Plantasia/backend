import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Image {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public url: string;
 
  @Column()
  public key: string;
}
 
export default Image;