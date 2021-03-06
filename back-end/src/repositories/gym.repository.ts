import { GymKingDataSource } from "../datasource";
import { gym } from "../entities/gym.entity";

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
    saveGym(gid: string, brandname: string, address: string, lat: number, long: number, icon: string) {
        const newGym = new gym();
        newGym.g_id = gid;
        newGym.gym_brandname = brandname;
        newGym.gym_address = address;
        newGym.gym_coord_lat = lat;
        newGym.gym_coord_long = long;
        newGym.gym_icon = icon;
        return this.manager.save(newGym);
    },
    async updateGym(gid: string, brandname: string, address: string, lat: number, long: number, icon: string) {
        return await this.manager.update(gym, {g_id: gid}, {gym_brandname: brandname, gym_address: address, gym_coord_lat: lat, gym_coord_long: long, gym_icon: icon})
    },
    deleteGym(gid: string) {
        return this.manager.delete(gym, {g_id: gid})
    }
})
