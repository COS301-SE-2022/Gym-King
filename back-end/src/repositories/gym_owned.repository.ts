import { GymKingDataSource } from "../datasource";
import { gym } from "../entities/gym.entity";
import { gym_owned } from "../entities/gym_owned.entity";
import { gym_owner } from "../entities/gym_owner.entity";
import { gymRepository } from "./gym.repository";
import { ownerRepository } from "./gym_owner.repository";

export const gymOwnedRepository = GymKingDataSource.getRepository(gym_owned).extend({
    findAll() {
        return this.find();
    },
    findByGID(gid: string) {
        return this.find({ g_id: gid });
    },
    findByEmail(email: string) {
        return this.find({ email: email });
    },
    findByGIDandEmail(gid: string, email: string) {
        return this.findOneBy({ g_id: gid, email: email });
    },
    async findGymsByEmail(email: string) {
        const gymsOwned = await GymKingDataSource
        .getRepository(gym)
        .createQueryBuilder("gym")
        .where((qb) => {
            const subQuery = qb
                .subQuery()
                .select("go.g_id")
                .from(gym_owned, "go")
                .where("go.email = :email")
                .getQuery()
            return "gym.g_id IN " + subQuery
        })
        .setParameter("email", email)
        .getMany()
        return gymsOwned
    },
    async saveOwned(gid: string, email: string) {
        let result = await gymRepository.findByGID(gid);
        const gymEntity = new gym();
        gymEntity.g_id = result.g_id;
        gymEntity.gym_brandname = result.gym_brandname;
        gymEntity.gym_address = result.gym_address;
        gymEntity.gym_coord_lat = result.gym_coord_lat;
        gymEntity.gym_coord_long = result.gym_coord_long;
        gymEntity.gym_icon = result.gym_icon;
        result = await ownerRepository.findByEmail(email);
        console.log(result);
        const ownerEntity = new gym_owner();
        ownerEntity.email = result.email;
        ownerEntity.name = result.name;
        ownerEntity.surname = result.surname;
        ownerEntity.number = result.number;
        ownerEntity.username = result.username;
        ownerEntity.password = result.password;
        const newOwned = new gym_owned();
        newOwned.email = ownerEntity;
        newOwned.g_id = gymEntity;
        return this.manager.save(newOwned);
    },
    deleteOwned(gid: string, email: string) {
        return this.manager.delete(gym_owned, { g_id:gid, email: email })
    },
    deleteAllByGID(gid: string) {
        return this.manager.delete(gym_owned, { g_id: gid })
    },
    deleteAllByEmail(email: string) {
        return this.manager.delete(gym_owned, { email: email })
    }
})
