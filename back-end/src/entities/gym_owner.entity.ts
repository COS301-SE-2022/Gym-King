import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { gym_owned } from "./gym_owned.entity"

@Entity()
export class gym_owner {
    @PrimaryColumn({length : 320})
    email : string

    @Column({length : 100})
    Name : string

    @Column({length : 100})
    Surname : string

    @Column({length : 10})
    Number : string

    @Column({length : 50})
    Username : string

    @Column({length : 300})
    Password : string

    @OneToMany(() => gym_owned, (gym_owned) => gym_owned.email)
    gyms_owned : gym_owned[]
}
