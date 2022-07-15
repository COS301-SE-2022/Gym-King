import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { badge } from "./badge.entity";
import { gym_user } from "./gym_user.entity";
@Entity()
export class badge_owned {
    @Column({length: 50})
    username: string

    @Column({type: "int2", default: 1})
    count: number

    @Column({length: 50})
    input1: string

    @Column({length: 50})
    input2: string

    @Column({length: 50})
    input3: string

    @Column({type: "date", default: "NOW()"})
    date: Date

    @PrimaryColumn({type: "varchar",length: 3})
    @ManyToOne(() => badge, (badge) => badge.b_id)
    @JoinColumn({name: "b_id"})
    b_id: badge

    @PrimaryColumn({type: "varchar",length: 320})
    @ManyToOne(() => gym_user, (gym_user) => gym_user.email)
    @JoinColumn({name: "email"})
    email: gym_user
}
