import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";
import {Role} from "../../role/models/role.entity";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Role)
    @JoinColumn({name: 'role_id'})
    role: Role;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;

    @Column({type: 'timestamp', nullable: true})
    deleted_at: string;
}