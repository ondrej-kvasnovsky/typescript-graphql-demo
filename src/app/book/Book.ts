import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Book {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name?: string;
}
