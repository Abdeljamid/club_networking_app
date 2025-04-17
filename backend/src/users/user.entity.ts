import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  company_name: string;

  @Column({ nullable: true })
  company_sector: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  linkedin_url: string;

  @Column({ nullable: true })
  website_url: string;

  @Column({ default: "user" })
  role: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
