import { GymKingDataSource } from "../datasource";
import { friend } from "../entities/friend.entity";
import { userRepository } from "../repositories/gym_user.repository";

/**
 * this repository holds all the friend relations and their states(pending/accepted)
 */
export const friendRepository = GymKingDataSource.getRepository(friend).extend({

    // search queries ======================================================= //
    findAll() {
        return this.find();
    },
    /**
     * find all the 'fromUser' based of their email
     * @param email the from Users email
     * @returns list of request that contain the given 'fromUser'
     */
    findBySender(email: string) {
        return this.findBy({fromuser: email });
    },

    /**
     * find all the 'toUser' based of their email
     * @param email the from Users email
     * @returns list of request that contain the given 'toUser'
     */
    findByReceiver(email: string) {
        return this.findBy({touser: email });
    },

    /**
     * find the friend request from one specific user another specific user
     * @param fromEmail - the user's email who sent the request
     * @param toEmail - the user's who is receiving a friend request
     * @returns a single friend request
     */
    async findByFromTo(fromEmail: string, toEmail: string){
        return this.findOneBy({ fromuser: fromEmail, touser: toEmail });
    },

    /**
     * Check if two user's are friends.
     * @param {string} user1email - the first user email.
     * @param {string} user2email - the second user email.
     * @returns {boolean} true or false.
     */
     async checkIfFriends(user1email: string, user2email: string){
        let result1 = await this.findOneBy({ fromuser: user1email, touser: user2email, ispending: false});
        let result2 = await this.findOneBy({ fromuser: user2email, touser: user1email, ispending: false });
        if (result1 != null || result2 != null){
            return true;
        } else {
            return false;
        }
    },

    /**
     * Check if two user's are pending friends.
     * @param {string} user1email - the first user email.
     * @param {string} user2email - the second user email.
     * @returns {boolean} true or false.
     */
 async checkIfPendingFriends(user1email: string, user2email: string){
    let result1 = await this.findOneBy({ fromuser: user1email, touser: user2email, ispending: true});
    let result2 = await this.findOneBy({ fromuser: user2email, touser: user1email, ispending: true});
    if (result1 != null ){
        return "incoming";
    } else if ( result2 != null){
        return "outgoing";
    } else {
        return "non";
    }
},

    /**
     * gets all the friends(not pending) for a specified user
     * @param userEmail 
     * @returns list of all accepted friends
     */
    async findFriends(userEmail: string){


        let reqs = await this.findBy({ fromuser: userEmail});

        let ret=[];
        for (let i = 0; i < reqs.length; i++) {
            const req = reqs[i];
            console.log(req)
            if(!req.ispending){
                let user = await userRepository.findByEmail(req.touser);
                ret.push({email:user.email,username:user.username,fullname:user.fullname,profile_picture:user.profile_picture})
            }
        }

        reqs =await this.findBy({ touser: userEmail})

        for (let i = 0; i < reqs.length; i++) {
            const req = reqs[i];
            console.log(req)
            if(!req.ispending){
                let user = await userRepository.findByEmail(req.fromuser);
                ret.push({email:user.email,username:user.username,fullname:user.fullname,profile_picture:user.profile_picture})
            }
            

        }

        
        return ret;
    },
    /**
     * gets all the received requests for a specified user
     * @param userEmail 
     * @returns list of received requests
     */
    async findReceivedRequests(userEmail: string){
        let reqs = await this.findBy({ touser: userEmail});
        

        let ret=[];
       
        for (let i = 0; i < reqs.length; i++) {
            const req = reqs[i];
            if(req.ispending){
                let user = await userRepository.findByEmail(req.fromuser);
                ret.push({email:user.email,username:user.username,fullname:user.fullname,profile_picture:user.profile_picture})
            }

        }
        return ret;
    },
    /**
     * gets all the sent requests for a specified user
     * @param userEmail 
     * @returns list of sent requests
     */
     async findSentRequests(userEmail: string){
        let reqs = await this.findBy({ fromuser: userEmail});
        
        let ret=[];
        
        for (let i = 0; i < reqs.length; i++) {
            const req = reqs[i];
            if(req.ispending){
                let user = await userRepository.findByEmail(req.touser);
                ret.push({email:user.email,username:user.username,fullname:user.fullname,profile_picture:user.profile_picture})
            }

        }
        return ret;
    },
    // update queries ======================================================= //

    /**
     * a function to update the pending status
     * @param fromEmail - the user's email who sent the request
     * @param toEmail - the user's who is receiving a friend request
     * @param status - the new status
     */
    async updatePendingStatus(fromEmail: string, toEmail: string, status: boolean) {
        return await this.manager.update(friend, { fromuser: fromEmail, touser: toEmail }, {ispending: status})
    },


    // insert queries ======================================================= //

    /**
     * finds the given users emails from the user repo and then creates a new friend request with those users
     * @param fromEmail the user's email who sent the request
     * @param toEmail the user's who is receiving a friend request
     * @output saves request to the DB
     */
    async createRequest(fromEmail: string, toEmail: string){
        
        const newRequest= new friend();

        let toUser = await userRepository.findByEmail(toEmail);
        let fromUser = await userRepository.findByEmail(fromEmail);

        newRequest.fromuser = fromUser;
        newRequest.touser = toUser;
        newRequest.ispending = true;

        return this.manager.save(newRequest);

    },

    // delete queries ======================================================= //

    /**
     * delete the given request
     */
    deleteRequest(fromEmail: string, toEmail: string){
        try{
            this.manager.delete(friend, {fromuser: fromEmail, touser: toEmail})
        }
        catch(err){
            this.manager.delete(friend, {fromuser: toEmail, touser: fromEmail})
        }
    }
})
