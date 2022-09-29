import { GymKingDataSource } from "../datasource";
import { gym_brand } from "../entities/gym_brand.entity";

export const gymBrandRepository = GymKingDataSource.getRepository(gym_brand).extend({
    findAll() {
        return this.find();
    },
    findByBrandname(brandname: string) {
        return this.findOneBy({ gym_brandname: brandname });
    },
    saveGymBrand(brandname: string) {
        const newBrand = new gym_brand();
        newBrand.gym_brandname = brandname;
        newBrand.gym_logo = "Default";
        return this.manager.save(newBrand);
    },
    async updateGymBrandLogo(brandname: string, logo: string) {
        return await this.manager.update(gym_brand, {gym_brandname: brandname}, {gym_logo: logo})
    },
    deleteGymBrand(brandname: string) {
        return this.manager.delete(gym_brand, {gym_brandname: brandname})
    }
})
