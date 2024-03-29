import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { gym_owner } from "./gym_owner.entity"

@Entity()
export class owner_otp {
    @PrimaryColumn({type: "varchar", length: 320})
    @ManyToOne(() => gym_owner, (gym_owner) => gym_owner.email)
    @JoinColumn({name: "email"})
    email: gym_owner

    @Column({length: 6,nullable: true})
    otp: string

    @Column({type: "timestamptz", default: () => 'CURRENT_TIMESTAMP'})
    otptimestamp: string
}
