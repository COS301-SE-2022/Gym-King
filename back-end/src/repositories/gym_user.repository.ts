import { GymKingDataSource } from "../datasource";
import { gym_user } from "../entities/gym_user.entity";

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
    saveUser(email: string, name: string, surname: string, number: string, username: string, password: string) {
        const bcrypt = require('bcryptjs')
        const user = new gym_user();
        user.email = email;
        user.name = name;
        user.surname = surname;
        user.number = number;
        user.username = username;
        user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        return this.manager.save(user);
    },
    deleteUser(email: string) {
        return this.manager.delete(gym_user, {email: email})
    }
})
