import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { gym_owned } from "./gym_owned.entity";
@Entity()
export class gym_owner {
    @PrimaryColumn({length: 320})
    email: string

    @Column({length: 150,nullable: true})
    fullname: string

    @Column({length: 10,nullable: true})
    number: string

    @Column({length: 50,nullable: true})
    username: string

    @Column({length: 300,nullable: true})
    password: string

    @Column({length: 65535, default:"NONE",nullable: true})
    profile_picture: string

    @OneToMany(() => gym_owned, (gym_owned) => gym_owned.email)
    gyms_owned: gym_owned[]
}
