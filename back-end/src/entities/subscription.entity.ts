import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { gym_user } from "./gym_user.entity";
import { gym } from "./gym.entity";

@Entity()
export class subscription {
    
    @PrimaryColumn({type: "varchar",length: 320})
    @ManyToOne(() => gym_user, (gym_user) => gym_user.email)
    @JoinColumn({name: "fromuser"})
    fromuser: gym_user;
    
    @PrimaryColumn({type: "varchar",length: 4})
    @ManyToOne(() => gym, (gym) => gym.g_id)
    @JoinColumn({name: "togym"})
    togym: gym;

}