import { GymKingDataSource } from "../datasource";
import { badge } from "../entities/badge.entity";
import { gym } from "../entities/gym.entity";
import { gymRepository } from "./gym.repository";

export const badgeRepository = GymKingDataSource.getRepository(badge).extend({
    findAll() {
        return this.find();
    },
    findByBID(bid: string) {
        return this.findOneBy({ b_id: bid });
    },
    findByName(name: string) {
        return this.findOneBy({badgename: name });
    },
    findByActivityType(at: string) {
        return this.find({activitytype: at });
    },
    findByGID(gid: string) {
        return this.find({ g_id: gid });
    },
    async updateBadge(bid: string, gid: string, badgename: string, badgedescription: string, badgechallenge: string, at: string, badgeicon: string) {
        return await this.manager.update(badge, {b_id: bid, g_id: gid}, {badgename: badgename, badgedescription: badgedescription, badgechallenge: badgechallenge, activitytype: at, badgeicon: badgeicon})
    },
    async getLeaderboardByGID(gid: string) {
        return badgeRepository.query(`SELECT iv.B_id, b.Badgename, iv.Username, iv.Count, b.Activitytype FROM BADGE as b  
        inner join (SELECT B_ID, Username, Count FROM BADGE_OWNED WHERE B_ID IN ( SELECT B_ID FROM BADGE WHERE G_ID = '${gid}')) as iv 
        on b.B_id = iv.B_id`)
    },
    async saveBadge(bid: string, gid: string, badgename: string, badgedescription: string, badgechallenge: string, at: string, badgeicon: string) {
        const result = await gymRepository.findByGID(gid);
        const gymEntity = new gym();
        gymEntity.g_id = result.g_id;
        gymEntity.gym_brandname = result.gym_brandname;
        gymEntity.gym_address = result.gym_address;
        gymEntity.gym_coord_lat = result.gym_coord_lat;
        gymEntity.gym_coord_long = result.gym_coord_long;
        gymEntity.gym_icon = result.gym_icon;
        const newBadge = new badge();
        newBadge.b_id = bid;
        newBadge.g_id = gymEntity;
        newBadge.badgename = badgename;
        newBadge.badgedescription = badgedescription;
        newBadge.badgechallenge = badgechallenge;
        newBadge.activitytype = at;
        newBadge.badgeicon = badgeicon;
        return this.manager.save(newBadge);
    },
    deleteBadge(bid: string) {
        return this.manager.delete(badge, {b_id: bid})
    }
})
