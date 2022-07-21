import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { gym_owned } from "./gym_owned.entity";
@Entity()
export class gym_owner {
    @PrimaryColumn({length: 320})
    email: string

    @Column({length: 100})
    name: string

    @Column({length: 100})
    surname: string

    @Column({length: 10})
    number: string

    @Column({length: 50})
    username: string

    @Column({length: 300})
    password: string

    @OneToMany(() => gym_owned, (gym_owned) => gym_owned.email)
    gyms_owned: gym_owned[]
}
