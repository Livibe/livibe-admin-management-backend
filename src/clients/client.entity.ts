import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column({ nullable: true, default: null })
  industry: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true, default: null })
  status: string;

  @Column({ nullable: true })
  notes: string;

  // Contact 1
  @Column({ nullable: true })
  contact1Name: string;

  @Column({ nullable: true })
  contact1Phone: string;

  @Column({ nullable: true })
  contact1Email: string;

  // Contact 2
  @Column({ nullable: true })
  contact2Name: string;

  @Column({ nullable: true })
  contact2Phone: string;

  @Column({ nullable: true })
  contact2Email: string;

  // Contact person Gmail
  @Column({ nullable: true })
  contactPersonGmail: string;

  // Who approached: muan | japan | kla
  @Column({ nullable: true })
  whoApproach: string;

  // Stable key from Google Sheet / Excel row — used to upsert without relying on company name
  @Column({ nullable: true, unique: true })
  sheetRowId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
