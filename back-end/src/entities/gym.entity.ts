import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { badge } from "./badge.entity";
import { gym_employee } from "./gym_employee.entity";
@Entity()
export class gym {
    @PrimaryColumn({length: 4})
    g_id: string

    @Column({length: 50})
    gym_brandname: string

    @Column({length: 100})
    gym_address: string

    @Column({type: "float4"})
    gym_coord_lat: number

    @Column({type: "float4"})
    gym_coord_long: number

    @Column({length: 65535})
    gym_icon: string

    @OneToMany(() => gym_employee, (gym_employee) => gym_employee.g_id)
    gym_employees: gym_employee[]
    
    @OneToMany(() => badge, (badge) => badge.g_id)
    badges: badge[]
}
