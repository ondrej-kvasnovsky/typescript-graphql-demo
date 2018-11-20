import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Author {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public firstName?: string;

  @Column()
  public lastName?: string;
}
