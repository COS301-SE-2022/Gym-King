import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { badge } from "./badge.entity";
import { gym_user } from "./gym_user.entity";
@Entity()
export class badge_claim {
    @Column({length: 50})
    username: string

    @Column({length: 50})
    input1: string

    @Column({length: 50})
    input2: string

    @Column({length: 50})
    input3: string

    @Column({length: 65535})
    proof: string

    @Column({type: "date", default: "NOW()"})
    date: Date

    @PrimaryColumn({type: "varchar",length: 3})
    @ManyToOne(() => badge, (badge) => badge.b_id, {eager: true})
    @JoinColumn({name: "b_id"})
    b_id: badge

    @PrimaryColumn({type: "varchar",length: 320})
    @ManyToOne(() => gym_user, (gym_user) => gym_user.email)
    @JoinColumn({name: "email"})
    email: gym_user
}
