import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"
import { gym } from "./gym.entity"

@Entity()
export class gym_employee {
    @PrimaryColumn({length : 320})
    email : string

    @ManyToOne(() => gym, (gym) => gym.G_ID)
    G_ID : gym

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
}
