import { GymKingDataSource } from "../datasource";
import { gym_owner } from "../entities/gym_owner.entity";
import { owner_otp } from "../entities/owner_otp.entity";
import { ownerRepository } from "./gym_owner.repository";

export const ownerOTPRepository = GymKingDataSource.getRepository(owner_otp).extend({
    findAll() {
        return this.find();
    },
    findByEmail(email: string) {
        return this.findOneBy({ email: email });
    },
    async saveOwnerOTP(email: string, otp: string) {
        let result = await ownerRepository.findByEmail(email);
        const ownerEntity = new gym_owner();
        ownerEntity.email = result.email;
        ownerEntity.name = result.name;
        ownerEntity.surname = result.surname;
        ownerEntity.number = result.number;
        ownerEntity.username = result.username;
        ownerEntity.password = result.password;
        const newOwnerOTP = new owner_otp();
        newOwnerOTP.email = ownerEntity;
        newOwnerOTP.otp = otp;
        return this.manager.save(newOwnerOTP);
    },
    deleteOwnerOTP(email: string) {
        return this.manager.delete(owner_otp, {email: email})
    }
})
