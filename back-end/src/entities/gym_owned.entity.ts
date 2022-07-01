import { Entity, ManyToOne, OneToOne, JoinTable, PrimaryColumn } from "typeorm"
import { gym } from "./gym.entity"
import { gym_owner } from "./gym_owner.entity"

@Entity()
export class gym_owned {
    @PrimaryColumn()
    @ManyToOne(() => gym_owner, (gym_owner) => gym_owner.email)
    email : gym_owner

    @PrimaryColumn()
    @OneToOne(() => gym, (gym) => gym.G_ID)
    @JoinTable()
    G_ID : gym
}
