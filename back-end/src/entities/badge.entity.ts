import { text } from "body-parser";
import "reflect-metadata";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { badge_claim } from "./badge_claim.entity";
import { badge_owned } from "./badge_owned.entity";
import { gym } from "./gym.entity";
@Entity()
export class badge {
    @PrimaryColumn({length: 3})
    b_id: string

    @Column({length: 50})
    badgename: string

    @Column({length: 300})
    badgedescription: string

    @Column({length: 300})
    badgechallenge: string

    @Column({length: 65535,nullable: true})
    badgeicon: string

    @Column({length: 8,nullable: true})
    activitytype: string

    @Column({length: 100,nullable: true})
    requirement1: string

    @Column({length: 100,nullable: true})
    requirement2: string

    @Column({length: 100,nullable: true})
    requirement3: string

    @OneToMany(() => badge_claim, (badge_claim) => badge_claim.b_id)
    badges_claim: badge_claim[]
    
    @OneToMany(() => badge_owned, (badge_owned) => badge_owned.b_id)
    badges_owned: badge_owned[]

    @Column({type:"varchar",length: 4})
    @ManyToOne(() => gym, (gym) => gym.g_id)
    @JoinColumn({name: "g_id"})
    g_id: gym

    @Column({type: "text",nullable: true})
    tags: string
}
