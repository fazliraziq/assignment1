import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  side: string;

  @Column()
  price: string;
}
