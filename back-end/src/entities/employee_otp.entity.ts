import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { gym_employee } from "./gym_employee.entity"

@Entity()
export class employee_otp {
    @PrimaryColumn({type: "varchar", length: 320})
    @ManyToOne(() => gym_employee, (gym_employee) => gym_employee.email)
    @JoinColumn({name: "email"})
    email: gym_employee

    @Column({length: 6,nullable: true})
    otp: string

    @Column({type: "date", default: "NOW()"})
    date: Date
}
