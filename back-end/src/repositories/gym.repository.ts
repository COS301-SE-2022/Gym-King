import { GymKingDataSource } from "../datasource";
import { gym } from "../entities/gym.entity";
import { gym_brand } from "../entities/gym_brand.entity";

export const gymRepository = GymKingDataSource.getRepository(gym).extend({
    findAll() {
        return this.find();
    },
    findByBrandname(brandname: string) {
        return this.findBy({ gym_brandname: brandname });
    },
    findByGID(gid: string) {
        return this.findOneBy({ g_id: gid });
    },
    async saveGym(gid: string, gymname: string, brandname: string, address: string, lat: number, long: number) {
        const newGym = new gym();
        newGym.g_id = gid;
        newGym.gym_name = gymname;
        newGym.gym_brandname = brandname;
        newGym.gym_address = address;
        newGym.gym_coord_lat = lat;
        newGym.gym_coord_long = long;
        return this.manager.save(newGym);
    },
    async updateGym(gid: string, gymname: string, brandname: gym_brand, address: string, lat: number, long: number) {
        return await this.manager.update(gym, {g_id: gid}, {gym_name: gymname, gym_brandname: brandname, gym_address: address, gym_coord_lat: lat, gym_coord_long: long})
    },
    deleteGym(gid: string) {
        return this.manager.delete(gym, {g_id: gid})
    }
})
