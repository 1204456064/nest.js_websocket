import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity()
export class sys_user extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', name: 'userName'})
    userName: string

    @Column({type: 'varchar', name: 'password'})
    password: string
}

export interface UserDto {
    userId: string;
    username: string;
    age: number;
}