import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { badge } from "./badge.entity";
import { gym_brand } from "./gym_brand.entity";
import { gym_employee } from "./gym_employee.entity";
@Entity()
export class gym {
    @PrimaryColumn({length: 4})
    g_id: string

    @Column({type: "varchar" ,length: 50,nullable: true})
    @ManyToOne(() => gym_brand, (gym_brand) => gym_brand.gym_brandname)
    @JoinColumn({name: "gym_brandname"})
    gym_brandname: string

    @Column({type:"text",nullable: true})
    gym_name: string

    @Column({length: 100,nullable: true})
    gym_address: string

    @Column({type: "float4",nullable: true})
    gym_coord_lat: number

    @Column({type: "float4",nullable: true})
    gym_coord_long: number

    @OneToMany(() => gym_employee, (gym_employee) => gym_employee.g_id)
    gym_employees: gym_employee[]
    
    @OneToMany(() => badge, (badge) => badge.g_id)
    badges: badge[]
}
