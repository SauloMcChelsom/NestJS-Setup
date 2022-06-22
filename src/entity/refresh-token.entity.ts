import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Generated, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity as User } from './user.entity';

@Entity('refresh_token')
export class RefreshTokenEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    token: string;
  
    @Column()
    expires_in: string;
  
    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

    @ManyToOne((type) => User)
    @JoinColumn({ name: 'user_id' })
    @Column()
    user_id: number;

}