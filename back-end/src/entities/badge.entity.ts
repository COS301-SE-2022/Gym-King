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

    @Column({length: 65535})
    badgeicon: string

    @Column({length: 8})
    activitytype: string

    @OneToMany(() => badge_claim, (badge_claim) => badge_claim.b_id)
    badges_claim: badge_claim[]
    
    @OneToMany(() => badge_owned, (badge_owned) => badge_owned.b_id)
    badges_owned: badge_owned[]

    @ManyToOne(() => gym, (gym) => gym.g_id)
    @JoinColumn({name: "g_id"})
    g_id: gym
}
