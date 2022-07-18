import { GymKingDataSource } from "../datasource";
import { gym_owner } from "../entities/gym_owner.entity";

export const ownerRepository = GymKingDataSource.getRepository(gym_owner).extend({
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
    async updateOwner(email: string, name: string, surname: string, number: string, username: string) {
        return await this.manager.update(gym_owner, { email: email }, {name: name, surname: surname, number: number, username: username})
    },
    async updateOwnerPassword(email: string, password: string) {
        const bcrypt = require('bcryptjs')
        return await this.manager.update(gym_owner, { email: email }, { password: bcrypt.hashSync(password, bcrypt.genSaltSync())})
    },
    saveOwner(email: string, name: string, surname: string, number: string, username: string, password: string) {
        const bcrypt = require('bcryptjs')
        const owner = new gym_owner();
        owner.email = email;
        owner.name = name;
        owner.surname = surname;
        owner.number = number;
        owner.username = username;
        owner.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        return this.manager.save(owner);
    },
    deleteOwner(email: string) {
        return this.manager.delete(gym_owner, {email: email})
    }
})
