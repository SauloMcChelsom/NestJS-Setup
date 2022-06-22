import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Generated, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity as User } from './user.entity';

@Entity('user_machine_property')
export class UserMachinePropertyEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    user_agent: string;

    @Column({
        nullable: true,
    })
    window_screen_width: string;

    @Column({
        nullable: true,
    })
    window_screen_height: string;

    @Column({
        nullable: true,
    })
    window_screen_color_depth: string;
  
    @Column({
        nullable: true,
    })
    window_screen_pixel_depth: string;
  
    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

    @ManyToOne((type) => User)
    @JoinColumn({ name: 'user_id' })
    @Column()
    user_id: number;

}