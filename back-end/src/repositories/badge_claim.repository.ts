import { GymKingDataSource } from "../datasource";
import { badge } from "../entities/badge.entity";
import { badge_claim } from "../entities/badge_claim.entity";
import { gym_user } from "../entities/gym_user.entity";
import { badgeRepository } from "./badge.repository";
import { userRepository } from "./gym_user.repository";

export const badgeClaimRepository = GymKingDataSource.getRepository(badge_claim).extend({
    findAll() {
        return this.find();
    },
    findByBID(bid: string) {
        return this.find({ b_id: bid });
    },
    findByEmail(email: string) {
        return this.find({email: email });
    },
    findByBIDandEmail(bid: string, email:string) {
        return this.findOneBy({b_id: bid,email: email });
    },
    async saveClaim(bid: string, email: string, username: string, input1: string, input2: string, input3: string, proof: string) {
        const badgeEntity = new badge();
        const b = await badgeRepository.findByBID(bid);
        badgeEntity.b_id = b.b_id;
        badgeEntity.g_id = b.g_id;
        badgeEntity.badgename = b.badgename;
        badgeEntity.badgedescription = b.badgedescription;
        badgeEntity.badgechallenge = b.badgechallenge;
        badgeEntity.activitytype = b.activitytype;
        badgeEntity.badgeicon = b.badgeicon;
        const userEntity = new gym_user();
        const u = await userRepository.findByEmail(email);
        userEntity.email = u.email;
        userEntity.name = u.name;
        userEntity.surname = u.surname;
        userEntity.number = u.number;
        userEntity.username = u.username;
        userEntity.password = u.password;
        const newClaim = new badge_claim();
        newClaim.b_id = badgeEntity;
        newClaim.email = userEntity;
        newClaim.username = username;
        newClaim.input1 = input1;
        newClaim.input2 = input2;
        newClaim.input3 = input3;
        newClaim.proof = proof;
        return this.manager.save(newClaim);
    },
    deleteClaim(bid: string, email: string) {
        return this.manager.delete(badge_claim, {b_id: bid, email: email})
    }
})
