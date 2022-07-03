import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { gym } from "./gym.entity";

@Entity()
export class badge {
    @PrimaryColumn({length : 3})
    B_ID : string

    @ManyToOne(() => gym, (gym) => gym.G_ID)
    G_ID : gym

    @Column({length : 50})
    BadgeName : string

    @Column({length : 300})
    BadgeDescription : string

    @Column({length : 300})
    BadgeChallenge : string

    @Column({length : 65535})
    BadgeIcon : string

    @Column({length : 8})
    ActivityType : string
}
