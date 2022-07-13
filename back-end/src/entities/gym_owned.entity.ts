import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { gym } from "./gym.entity";
import { gym_owner } from "./gym_owner.entity";
@Entity()
export class gym_owned {
    @PrimaryColumn({length: 320})
    @ManyToOne(() => gym_owner, (gym_owner) => gym_owner.email)
    @JoinColumn({name: "email"})
    email: string

    @PrimaryColumn({length: 4})
    @OneToOne(() => gym, (gym) => gym.g_id)
    @JoinColumn({name: "g_id"})
    g_id: string
}
