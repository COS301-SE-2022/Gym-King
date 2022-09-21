import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { gym_owned } from "./gym_owned.entity";
@Entity()
export class gym_owner {
    @PrimaryColumn({length: 320})
    email: string

    @Column({length: 150})
    fullname: string

    @Column({length: 10})
    number: string

    @Column({length: 50})
    username: string

    @Column({length: 300})
    password: string

    @Column({length: 65535, default:"NONE",nullable: true})
    profile_picture: string

    @OneToMany(() => gym_owned, (gym_owned) => gym_owned.email)
    gyms_owned: gym_owned[]
}
