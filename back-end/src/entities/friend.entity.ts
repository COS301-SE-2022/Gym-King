import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { gym_user } from "./gym_user.entity";

@Entity()
export class friend {
    
    @PrimaryColumn({length: 320})
    @ManyToOne(() => gym_user, (gym_user) => gym_user.email)
    @JoinColumn({name: "fromUser"})
    fromUser: gym_user;
    
    @PrimaryColumn({length: 320})
    @ManyToOne(() => gym_user, (gym_user) => gym_user.email)
    @JoinColumn({name: "toUser"})
    toUser: gym_user;

    @Column()
    isPending: boolean;



}
