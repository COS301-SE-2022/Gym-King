import { GymKingDataSource } from "../datasource";
import { gym_user } from "../entities/gym_user.entity";
import { user_otp } from "../entities/user_otp.entity";
import { userRepository } from "./gym_user.repository";

export const userOTPRepository = GymKingDataSource.getRepository(user_otp).extend({
    findAll() {
        return this.find();
    },
    findByEmail(email: string) {
        return this.findOneBy({ email: email });
    },
    async saveUserOTP(email: string, otp: string) {
        const result = await userRepository.findByEmail(email);
        const userEntity = new gym_user();
        userEntity.email = result.email;
        userEntity.fullname = result.fullname;
        userEntity.number = result.number;
        userEntity.username = result.username;
        userEntity.password = result.password;
        const newUserOTP = new user_otp();
        newUserOTP.email = userEntity;
        newUserOTP.otp = otp;
        return this.manager.save(newUserOTP);
    },
    deleteUserOTP(email: string) {
        return this.manager.delete(user_otp, {email: email})
    }
})
