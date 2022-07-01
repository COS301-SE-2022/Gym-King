import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class gym {
    @PrimaryColumn()
    G_ID : string

    @Column()
    Gym_Brandname : string

    @Column()
    Gym_Address : string

    @Column()
    Gym_Coord_Lat : number

    @Column()
    Gym_Coord_Long : number

    @Column()
    Gym_Icon : string
}
