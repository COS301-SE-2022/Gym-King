import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class gym_brand {
    @PrimaryColumn({length: 50})
    gym_brandname: string

    @Column({length: 65535,default: 'Default',nullable: true})
    gym_logo: string
}
