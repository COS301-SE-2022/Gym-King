import { GymKingDataSource } from "../datasource";
import { employee_otp } from "../entities/employee_otp.entity";
import { gym } from "../entities/gym.entity";
import { gym_employee } from "../entities/gym_employee.entity";
import { gymRepository } from "./gym.repository";
import { employeeRepository } from "./gym_employee.repository";


export const employeeOTPRepository = GymKingDataSource.getRepository(employee_otp).extend({
    findAll() {
        return this.find();
    },
    findByEmail(email: string) {
        return this.findOneBy({ email: email });
    },
    async saveEmployeeOTP(email: string, otp: string) {
        let result = await employeeRepository.findByEmail(email);
        const employeeEntity = new gym_employee();
        employeeEntity.email = result.email;
        employeeEntity.fullname = result.fullname;
        employeeEntity.number = result.number;
        employeeEntity.username = result.username;
        employeeEntity.password = result.password;
        const gymEntity = new gym();
        result = await gymRepository.findByGID(result.g_id.g_id);
        gymEntity.g_id = result.g_id;
        gymEntity.gym_brandname = result.gym_brandname;
        gymEntity.gym_address = result.gym_address;
        gymEntity.gym_coord_lat = result.gym_coord_lat;
        gymEntity.gym_coord_long = result.gym_coord_long;
        employeeEntity.g_id = gymEntity;
        const newEmployeeOTP = new employee_otp();
        newEmployeeOTP.email = employeeEntity;
        newEmployeeOTP.otp = otp;
        return this.manager.save(newEmployeeOTP);
    },
    deleteEmployeeOTP(email: string) {
        return this.manager.delete(employee_otp, {email: email})
    }
})
