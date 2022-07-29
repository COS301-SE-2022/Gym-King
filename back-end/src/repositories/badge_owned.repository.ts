import { GymKingDataSource } from "../datasource";
import { badge } from "../entities/badge.entity";
import { badge_owned } from "../entities/badge_owned.entity";
import { gym_user } from "../entities/gym_user.entity";
import { badgeRepository } from "./badge.repository";
import { userRepository } from "./gym_user.repository";

export const badgeOwnedRepository = GymKingDataSource.getRepository(badge_owned).extend({
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
        return this.findOneBy({b_id: bid, email: email });
    },
    async updateByBIDandEmail(bid: string, email: string, username: string, input1: string, input2: string, input3: string){
        if(bid != null && email != null){
            await this.manager.update(badge_owned, { b_id: bid, email: email }, { input1: input1, input2: input2, input3: input3})
            return await this.manager.increment(badge_owned, {b_id: bid, email: email}, "count", 1)
        }
        else{
            return {'message': 'Invalid badge ID or email.'}
        }
    },
    async findByGID(gid: string){
        const badge_owneds = await GymKingDataSource
        .getRepository(badge_owned)
        .createQueryBuilder("badge_owned")
        .where((qb) => {
            const subQuery = qb
                .subQuery()
                .select("badge.b_id")
                .from(badge, "badge")
                .where("badge.g_id = :gid")
                .getQuery()
            return "badge_owned.b_id IN " + subQuery
        })
        .setParameter("gid", gid)
        .getMany()
        return badge_owneds
    },
    async saveOwned(bid: string, email: string, username: string, input1: string, input2: string, input3: string) {
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
        const newOwned = new badge_owned();
        newOwned.b_id = badgeEntity;
        newOwned.email = userEntity;
        newOwned.username = username;
        newOwned.input1 = input1;
        newOwned.input2 = input2;
        newOwned.input3 = input3;
        return this.manager.save(newOwned);
    },
    deleteOwned(bid: string, email: string) {
        return this.manager.delete(badge_owned, {b_id: bid, email: email})
    },
    deleteAllOwnedByBID(bid: string) {
        return this.manager.delete(badge_owned, {b_id: bid})
    },
    deleteAllOwnedByEmail(email: string) {
        return this.manager.delete(badge_owned, {email: email})
    }
})
