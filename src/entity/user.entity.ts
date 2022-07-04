import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import { Role } from "../shared/enum/role.enum";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  providers: string;

  @Column({ nullable: true })
  last_login: Date;

  @Column({ nullable: true })
  is_active: boolean;

  @Column({ nullable: true })
  updated_at: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({type: 'enum', enum: Role, default: Role.USER})
  role: Role;

}
