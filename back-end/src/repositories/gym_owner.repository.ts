import { GymKingDataSource } from "../datasource";
import { gym_employee } from "../entities/gym_employee.entity";
import { gym_owned } from "../entities/gym_owned.entity";
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
    async findEmployeesByOwnerEmail(email: string){
        const employees = await GymKingDataSource
        .getRepository(gym_employee)
        .createQueryBuilder("gym_employee")
        .where((qb) => {
            const subQuery = qb
                .subQuery()
                .select("gym_owned.g_id")
                .from(gym_owned, "gym_owned")
                .where("gym_owned.email = :email")
                .getQuery()
            return "gym_employee.g_id IN " + subQuery
        })
        .setParameter("email", email)
        .getMany()
        return employees
    },
    async updateOwner(email: string, fullname: string, number: string, username: string) {
        return await this.manager.update(gym_owner, { email: email }, {fullname: fullname, number: number, username: username})
    },
    async updateOwnerPassword(email: string, password: string) {
        const bcrypt = require('bcryptjs')
        return await this.manager.update(gym_owner, { email: email }, { password: bcrypt.hashSync(password, bcrypt.genSaltSync())})
    },
    async updateOwnerProfilePicture(email: string, profilepicture: string) {
        return await this.manager.update(gym_owner, { email: email }, {profile_picture: profilepicture})
    },
    saveOwner(email: string, fullname: string, number: string, username: string, password: string) {
        const bcrypt = require('bcryptjs')
        const owner = new gym_owner();
        owner.email = email;
        owner.fullname = fullname;
        owner.number = number;
        owner.username = username;
        owner.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        return this.manager.save(owner);
    },
    deleteOwner(email: string) {
        return this.manager.delete(gym_owner, {email: email})
    }
})
