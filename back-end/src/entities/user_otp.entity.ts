import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { gym_user } from "./gym_user.entity"

@Entity()
export class user_otp {
    @PrimaryColumn({type: "varchar", length: 320})
    @ManyToOne(() => gym_user, (gym_user) => gym_user.email)
    @JoinColumn({name: "email"})
    email: gym_user

    @Column({length: 6})
    otp: string

    @Column({type: "date", default: "NOW()"})
    date: Date
}
