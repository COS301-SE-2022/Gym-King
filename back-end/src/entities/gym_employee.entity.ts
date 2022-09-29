import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { gym } from "./gym.entity";
@Entity()
export class gym_employee {
    @PrimaryColumn({length: 320})
    email: string

    @Column({length: 150,nullable: true})
    fullname: string
    
    @Column({length: 10})
    number: string

    @Column({length: 50})
    username: string

    @Column({length: 300})
    password: string

    @Column({length: 65535, default:"NONE",nullable: true})
    profile_picture: string

    @Column({type: "varchar" ,length: 4})
    @ManyToOne(() => gym, (gym) => gym.g_id,{ eager: true })
    @JoinColumn({name: "g_id"})
    g_id: gym

    @Column({length: 64,default: null, nullable: true})
    apikey: string
}
