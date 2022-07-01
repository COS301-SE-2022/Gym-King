import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { gym_employee } from "./gym_employee.entity"

@Entity()
export class gym {
    @PrimaryColumn({length : 4})
    G_ID : string

    @Column({length : 50})
    Gym_Brandname : string

    @Column("varchar", { length: 200 })
    Gym_Address : string

    @Column({type:"float4",length : 10})
    Gym_Coord_Lat : number

    @Column({type:"float4",length : 10})
    Gym_Coord_Long : number

    @Column({length : 65535})
    Gym_Icon : string

    @OneToMany(() => gym_employee, (gym_employee) => gym_employee.G_ID)
    gym_employees : gym_employee[]
}
