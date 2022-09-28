import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { gym_user } from "./gym_user.entity";

@Entity()
export class friend {
    
    @PrimaryColumn({type:"varchar", length: 320})
    @ManyToOne(() => gym_user, (gym_user) => gym_user.email)
    @JoinColumn({name: "fromuser"})
    fromuser: gym_user;
    
    @PrimaryColumn({type:"varchar", length: 320})
    @ManyToOne(() => gym_user, (gym_user) => gym_user.email)
    @JoinColumn({name: "touser"})
    touser: gym_user;

    @Column({type:"boolean", default: true})
    ispending: boolean;



}
