import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Item {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name?: string;
}
