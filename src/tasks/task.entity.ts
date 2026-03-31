import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  dueDate: string;

  // low | medium | high
  @Column({ default: 'medium' })
  priority: string;

  // pending | done | overdue
  @Column({ default: 'pending' })
  status: string;

  // muan | japan | kla
  @Column({ nullable: true })
  assignedTo: string;

  // none | daily | weekly | monthly | yearly
  @Column({ default: 'none' })
  repeat: string;

  @Column({ nullable: true })
  clientId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
