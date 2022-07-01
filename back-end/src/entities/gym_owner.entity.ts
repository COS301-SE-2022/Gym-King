import { Entity, Column, PrimaryColumn } from "typeorm"

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
}
