import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('deals')
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: '' })
  eventName: string;

  @Column()
  clientName: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  dealValue: number;

  @Column({ default: 'USD' })
  currency: string;

  // lead_identified | contacted | meeting_scheduled | proposal_in_negotiation | close_won | close_loss
  @Column({ default: 'lead_identified' })
  stage: string;

  @Column({ type: 'int', default: 5 })
  probability: number;

  @Column({ type: 'date', nullable: true })
  approachEndDate: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  // muan | japan | kla
  @Column({ nullable: true })
  createdBy: string;

  @Column({ type: 'int', nullable: true, default: null })
  order: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
