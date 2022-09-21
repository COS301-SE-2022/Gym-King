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
    async updateEmployee(email: string, fullname: string, number: string, username: string) {
        return await this.manager.update(gym_employee, { email: email }, {fullname: fullname, number: number, username: username})
    },
    async updateEmployeePassword(email: string, password: string) {
        const bcrypt = require('bcryptjs')
        return await this.manager.update(gym_employee, { email: email }, { password: bcrypt.hashSync(password, bcrypt.genSaltSync())})
    },
    async updateEmployeeProfilePicture(email: string, profilepicture: string) {
        return await this.manager.update(gym_employee, { email: email }, {profile_picture: profilepicture})
    },
    async saveEmployee(email: string, fullname: string, number: string, username: string, password: string, gid: string) {
        const result = await gymRepository.findByGID(gid);
        const gymEntity = new gym();
        gymEntity.g_id = result.g_id;
        gymEntity.gym_brandname = result.gym_brandname;
        gymEntity.gym_address = result.gym_address;
        gymEntity.gym_coord_lat = result.gym_coord_lat;
        gymEntity.gym_coord_long = result.gym_coord_long;
        const bcrypt = require('bcryptjs')
        const employee = new gym_employee();
        employee.email = email;
        employee.fullname = fullname;
        employee.number = number;
        employee.username = username;
        employee.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        employee.g_id = gymEntity;
        return this.manager.save(employee);
    },
    deleteEmployee(email: string) {
        return this.manager.delete(gym_employee, {email: email})
    },
    deleteEmployeeByGID(gid: string) {
        return this.manager.delete(gym_employee, {g_id: gid})
    }
})
