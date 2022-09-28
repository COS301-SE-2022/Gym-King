import { GymKingDataSource } from "../datasource";
import { subscription } from "../entities/subscription.entity";
import { userRepository } from "../repositories/gym_user.repository";
import { gymRepository } from "./gym.repository";

/**
 * this repository holds all the gym subsriptions 
 */
export const subscriptionRepository = GymKingDataSource.getRepository(subscription).extend({
    
    // search queries ======================================================= //
    findAll() {
        return this.find();
    },

    /**
     * find all gyms the user is subsribed to
     * @param email the from User's email
     * @returns list of subsriptions that contain the given 'fromUser'
     */
    async findBySubscriber(email: string) {
        return this.findBy({fromUser: email });
    },

    /**
     * get all the subscribers to a gym
     * @param gid 
     * @returns list of subsribers
     */
    async findBySubbed(gid: string){
        return this.findBy({toGym: gid });
    },

    /**
     * Checks if user is subscribed to a gym.
     * @param {string} email the from User's email
     * @param {string} gid gym's ID
     * @returns {boolean}
     */
     async checkIfSubscribed(email: string, gid: string) {
        let result = await this.findOneBy({fromUser: email, toGym: gid});
        if (result != null){
            return true;
        } else {
            return false;
        }
    },

    /**
     * creates a new subsription relation between a user and a gym
     * @param fromEmail the user who requests the subsription
     * @param toGymID the gym being subsribed to
     * @returns success status
     */
    async createSubscription(fromEmail: string, toGymID: string){
        
        const newSub= new subscription();
        let fromUser = await userRepository.findByEmail(fromEmail);
        let toGym = await gymRepository.findByGID(toGymID);

        newSub.fromUser = fromUser;
        newSub.toGym = toGym;

        return this.manager.save(newSub);

    },

    /**
     * deletes the relation between the given user and the given gym
     * @param fromEmail the user email
     * @param toGymID the gym id
     * @returns success status
     */
    async removeSubsription(fromEmail: string, toGymID: string){
        return this.manager.delete(subscription, {fromUser: fromEmail, toGym: toGymID})
    },

    /**
     * find a specific subscription relationship
     * @param fromEmail the user email
     * @param toGymID the gym id
     * @returns a subsriber and subscribe-ee
     */
    async findByFromTo(fromEmail: string, toGymID: string){
        return this.findOneBy({ fromUser: fromEmail, toGym: toGymID });
    },


})
