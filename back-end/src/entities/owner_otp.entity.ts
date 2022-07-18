import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { gym_owner } from "./gym_owner.entity"

@Entity()
export class owner_otp {
    @PrimaryColumn({type: "varchar", length: 320})
    @ManyToOne(() => gym_owner, (gym_owner) => gym_owner.email)
    @JoinColumn({name: "email"})
    email: gym_owner

    @Column({length: 6})
    otp: string

    @Column({type: "date", default: "NOW()"})
    date: Date
}
