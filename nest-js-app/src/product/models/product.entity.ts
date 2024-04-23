import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";
import {Role} from "../../role/models/role.entity";
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(()=> Role)
    // @JoinColumn({name: 'role_id'})
    // role: Role;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;

    @Column({type: 'timestamp', nullable: true})
    deleted_at: string;
}