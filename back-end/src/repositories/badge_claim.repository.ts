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
        return this.findBy({ b_id: bid });
    },
    findByEmail(email: string) {
        return this.findBy({email: email });
    },
    findByBIDandEmail(bid: string, email:string) {
        return this.findOneBy({b_id: bid,email: email });
    },
    async findByGID(gid: string){
        return badgeRepository.query(`SELECT gu.email, gu.username, gu.profile_picture, iv.b_id, iv.input1, iv.input2, iv.input3, iv.proof, iv.date FROM GYM_USER as gu  
        inner join (SELECT * FROM BADGE_CLAIM WHERE B_ID IN ( SELECT B_ID FROM BADGE WHERE G_ID = $1)) as iv 
        on gu.email = iv.email`,[gid])
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
        userEntity.fullname = u.fullname;
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
    },
    deleteAllClaimsByBID(bid: string) {
        return this.manager.delete(badge_claim, {b_id: bid})
    },
    deleteAllClaimsByEmail(email: string) {
        return this.manager.delete(badge_claim, {email: email})
    }
})
