import { GymKingDataSource } from "../datasource";
import { gym } from "../entities/gym.entity";
import { gym_employee } from "../entities/gym_employee.entity";
import { gymRepository } from "./gym.repository";

export const employeeRepository = GymKingDataSource.getRepository(gym_employee).extend({
    findAll() {
        return this.find();
    },
    findByName(firstName: string) {
        return this.findOneBy({name: firstName });
    },
    findBySurname(Surname: string) {
        return this.findOneBy({surname: Surname });
    },
    findByFullname(firstName: string,Surname: string) {
        return this.findOneBy({name:firstName, surname: Surname });
    },
    findByEmail(email: string) {
        return this.findOneBy({ email: email });
    },
    findByNumber(number: string) {
        return this.findOneBy({ number: number });
    },
    findByUsername(username: string) {
        return this.findOneBy({ username: username });
    },
    findByGID(gid: string) {
        return this.findBy({ g_id: gid });
    },
    async saveEmployee(email: string, name: string, surname: string, number: string, username: string, password: string, gid: string) {
        const result = await gymRepository.findByGID(gid);
        const gymEntity = new gym();
        gymEntity.g_id = result.g_id;
        gymEntity.gym_brandname = result.gym_brandname;
        gymEntity.gym_address = result.gym_address;
        gymEntity.gym_coord_lat = result.gym_coord_lat;
        gymEntity.gym_coord_long = result.gym_coord_long;
        gymEntity.gym_icon = result.gym_icon;
        const bcrypt = require('bcryptjs')
        const employee = new gym_employee();
        employee.email = email;
        employee.name = name;
        employee.surname = surname;
        employee.number = number;
        employee.username = username;
        employee.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        employee.g_id = gymEntity;
        return this.manager.save(employee);
    },
    deleteEmployee(email: string) {
        return this.manager.delete(gym_employee, {email: email})
    }
})
