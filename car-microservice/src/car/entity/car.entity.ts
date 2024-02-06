import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'car' })
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  model: string;

  @Column({ nullable: false })
  year: string;

  @Column({ nullable: false })
  pricePerDay: number;

  @Column({ nullable: false })
  available: boolean;

  @Column({ nullable: false })
  userId: string;
}
