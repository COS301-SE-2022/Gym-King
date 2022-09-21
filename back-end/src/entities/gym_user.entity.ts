import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { badge_claim } from "./badge_claim.entity";
import { badge_owned } from "./badge_owned.entity";
import { gym_brand } from "./gym_brand.entity";
@Entity()
export class gym_user {
    @PrimaryColumn({length: 320})
    email: string

    @Column({length: 150})
    fullname: string

    @Column({length: 10})
    number: string

    @Column({length: 50})
    username: string

    @Column({length: 300})
    password: string

    @Column({type: "varchar" ,length: 50})
    @ManyToOne(() => gym_brand, (gym_brand) => gym_brand.gym_brandname)
    @JoinColumn({name: "gym_membership"})
    gym_membership: string

    @Column({length: 65535, default:"NONE",nullable: true})
    profile_picture: string

    @OneToMany(() => badge_claim, (badge_claim) => badge_claim.email)
    claim_emails: badge_claim[]

    @OneToMany(() => badge_owned, (badge_owned) => badge_owned.email)
    owned_emails: badge_owned[]
}
