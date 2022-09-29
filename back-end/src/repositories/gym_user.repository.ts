import { GymKingDataSource } from "../datasource";
import { gym_user } from "../entities/gym_user.entity";
import { badgeOwnedRepository } from "./badge_owned.repository";

export const userRepository = GymKingDataSource.getRepository(gym_user).extend({
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
    async notificationToggle(email: string) {
        let user = await userRepository.findByEmail(email);
        if (user.notificationtoggle){
            await this.manager.update(gym_user, { email: email }, {notificationtoggle: false})
            return false;
        } else {
            await this.manager.update(gym_user, { email: email }, {notificationtoggle: true})
            return true;
        }
    },
    async suggestBadges(email: string, membership: string) {
        let tags = ["cardio", "running", "cycling", "hiit", "endurance", "steps","elliptical","rowing","short","long","strength","musclebuilding","push","pull","lift","core","upperbody","lowerbody","fullbody","crossfit","gold","silver","bronze"];
        let counts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        let tallies = [];
        let ownedBadges = await badgeOwnedRepository.findByEmail(email);
        if (ownedBadges != null && ownedBadges.length > 0){
            for (let x = 0; x < ownedBadges.length; x++) {
                const badge = ownedBadges[x];
                let currentTags = badge.b_id.tags;
                currentTags = currentTags.split(',');
                for (let i = 0; i < currentTags.length; i++) {
                    const tag = currentTags[i];
                    counts[tags.indexOf(tag)] = counts[tags.indexOf(tag)] + 1;
                }
            }
            for (let x = 0; x < 23; x++) {
                tallies.push([tags[x],counts[x]]);
            }
            tallies = tallies.sort(([a,b],[c,d]) => d - b);
            let suggestedBrandBadges = await userRepository.query(`SELECT * FROM BADGE 
            WHERE b_id NOT IN (SELECT b_id FROM BADGE_OWNED WHERE email = $1) AND 
            g_id IN (SELECT g_id FROM GYM WHERE gym_brandname = $2) AND (
                (tags LIKE Concat('%',cast($3 as VARCHAR),'%') AND tags LIKE Concat('%',cast($4 as VARCHAR),'%') AND tags LIKE Concat('%',cast($5 as VARCHAR),'%') AND tags LIKE Concat('%',cast($6 as VARCHAR),'%') AND tags LIKE Concat('%',cast($7 as VARCHAR),'%'))
                OR (tags LIKE Concat('%',cast($3 as VARCHAR),'%') AND tags LIKE Concat('%',cast($4 as VARCHAR),'%') AND tags LIKE Concat('%',cast($5 as VARCHAR),'%') AND tags LIKE Concat('%',cast($6 as VARCHAR),'%'))
                OR (tags LIKE Concat('%',cast($3 as VARCHAR),'%') AND tags LIKE Concat('%',cast($4 as VARCHAR),'%') AND tags LIKE Concat('%',cast($5 as VARCHAR),'%'))
                OR (tags LIKE Concat('%',cast($3 as VARCHAR),'%') AND tags LIKE Concat('%',cast($4 as VARCHAR),'%'))
                OR (tags LIKE Concat('%',cast($3 as VARCHAR),'%'))
            ) LIMIT 5`,[email,membership,tallies[0][0],tallies[1][0],tallies[2][0],tallies[3][0],tallies[4][0]]);
            return suggestedBrandBadges;
        } else {
            return ownedBadges;
        }
    },
    async updateUser(email: string, fullname: string, number: string, username: string, membership: string) {
        return await this.manager.update(gym_user, { email: email }, {fullname: fullname,  number: number, username: username, gym_membership: membership})
    },
    async updateUserPassword(email: string, password: string) {
        const bcrypt = require('bcryptjs')
        return await this.manager.update(gym_user, { email: email }, { password: bcrypt.hashSync(password, bcrypt.genSaltSync())})
    },
    async updateUserAPIKey(email: string, apikey: string) {
        return this.manager.update(gym_user, { email: email }, {apikey: apikey})
    },
    async updateUserProfilePicture(email: string, profilepicture: string) {
        return await this.manager.update(gym_user, { email: email }, {profile_picture: profilepicture})
    },
    async updateUserPushToken(email: string, token: string){
        return await this.manager.update(gym_user, { email: email }, {pushkey: token})
    },
    saveUser(email: string, fullname: string, number: string, username: string, password: string, membership: string) {
        const bcrypt = require('bcryptjs')
        const user = new gym_user();
        user.email = email;
        user.fullname = fullname;
        user.number = number;
        user.username = username;
        user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        user.gym_membership = membership;
        return this.manager.save(user);
    },
    deleteUser(email: string) {
        return this.manager.delete(gym_user, {email: email})
    }
})
