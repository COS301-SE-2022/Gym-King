jest.setTimeout(25000);
import "reflect-metadata";
import { GymKingDataSource } from "../datasource";
import { badgeClaimRepository } from "../repositories/badge_claim.repository";
import { badgeOwnedRepository } from "../repositories/badge_owned.repository";
import { userRepository } from "../repositories/gym_user.repository";
import { userOTPRepository } from "../repositories/user_otp.repository";
import { server } from "../server";
const request = require('supertest');
let gid:string;
let bid1:string;
let bid2:string;
let otp:any;
let apikey:string;
let ownerApikey:string;
let employeeApikey:string;
beforeAll(async () => {
    await GymKingDataSource.initialize()
    .then(() => {
        console.log("Connection established!")
    })
    .catch((err) => {
        console.log("Connection not made: "+err);
    })
    await request(server).post('/brands/brand').send({
        "brandname": "Test Brand 1"
    });
    await request(server).post('/brands/brand').send({
        "brandname": "Test Brand 2"
    });
    await request(server).post('/brands/brand').send({
        "brandname": "Test Brand"
    });
    await request(server).post('/brands/brand').send({
        "brandname": "Changed Brand 1"
    });
    await request(server).post('/owners/owner').send({
        "email":"owner@example.com",
        "fullname":"Test Test",
        "number":"0123456789",
        "username":"Test",
        "password":"Test"
    });
    let response = await request(server).post('/users/login').send({
        "email":"owner@example.com",
        "password":"Test",
        "usertype":"gym_owner"
    });
    ownerApikey = response.body.apikey;
    response = await request(server).post('/gyms/gym').send({
        "email":"owner@example.com",
        "apikey":ownerApikey,
        "gymName":"Test",
        "gymBrandName": "Test Brand",
        "gymAddress": "Test Address",
        "gymCoordLong": -25.8661,
        "gymCoordLat": 28.1905,
        "gymIcon":"Test Logo"
    });
    gid = response.body.g_id;
    await request(server).post('/employees/employee').send({
        "ownerEmail":"owner@example.com",
        "apikey":ownerApikey,
        "email": "employee@example.com",
        "fullname": "Test Test",
        "number": "0123456789",
        "username":"Test",
        "password":"Test",
        "gid":gid
    });
    response = await request(server).post('/users/login').send({
        "email":"employee@example.com",
        "password":"Test",
        "usertype":"gym_employee"
    });
    employeeApikey = response.body.apikey;
    response = await request(server).post('/badges/badge').send({
        "email":"employee@example.com",
        "apikey":employeeApikey,
        "gid":gid,
        "badgename":"Test Badge 1",
        "badgedescription":"Description",
        "badgechallenge":"Challenge",
        "badgeicon":"b_cycle",
        "requirement1":"3",
        "requirement2":"2",
        "requirement3":"1",
        "activitytype":"CARDIO",
        "tags":"test,test"
    });
    bid1 = response.body.b_id;
    response = await request(server).post('/badges/badge').send({
        "email":"employee@example.com",
        "apikey":employeeApikey,
        "gid":gid,
        "badgename":"Test Badge 2",
        "badgedescription":"Description",
        "badgechallenge":"Challenge",
        "badgeicon":"b_bicep",
        "requirement1":"1",
        "requirement2":"2",
        "requirement3":"3",
        "activitytype":"STRENGTH",
        "tags":"test,test"
    });
    bid2 = response.body.b_id;
});
describe('Testing POST API Calls', () => {
    describe('responds to POST insert user', () => {
        test('responds to incorrect gym brand insert user', async () => {
            const response = await request(server).post('/users/user').send({
                "email": "test@example.com",
                "fullname": "Test Test",
                "number": "0123456789",
                "username":"Test",
                "password":"Test",
                "membership":"Incorrect brand"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false, 'message':'Invalid gym brand!'})
        })
        test('responds to incorrect email insert user', async () => {
            const response = await request(server).post('/users/user').send({
                "email": "WrongEmail",
                "fullname": "Test Test",
                "number": "0123456789",
                "username":"Test",
                "password":"Test",
                "membership":"Test Brand 1"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false, 'message':'Invalid email entered!'})
        })
        test('responds to correct insert user', async () => {
            const response = await request(server).post('/users/user').send({
                "email": "test@example.com",
                "fullname": "Test Test",
                "number": "0123456789",
                "username":"Test",
                "password":"Test",
                "membership":"Test Brand 1"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':true})
        })
        test('responds to correct insert user', async () => {
            const response = await request(server).post('/users/user').send({
                "email": "friend@example.com",
                "fullname": "Friend Friend",
                "number": "9876543210",
                "username":"Friend",
                "password":"Friend",
                "membership":"Test Brand 2"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':true})
        })
    });
    test('responds to correct GET user profile picture by username', async () => {
        const response = await request(server).get('/users/user/picture/Test')
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('NONE');
    });
    test('responds to incorrect GET user profile picture by username', async () => {
        const response = await request(server).get('/users/user/picture/wrong')
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({'message':'Invalid username!'});
    });
    describe('Testing Login calls', () => {
        test('responds to correct POST login user', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "test@example.com",
                "password":"Test",
                "usertype":"gym_user"
            });
            let result = await userRepository.findByEmail('test@example.com');
            apikey = result.apikey
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({"username":"Test","profile_picture":"NONE",'success':true,'apikey':apikey})
        });
        test('responds to incorrect password POST login user', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "test@example.com",
                "password":"Wrong",
                "usertype":"gym_user"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': false, 'results':"invalid password" })
        });
        test('responds to incorrect email POST login user', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "wrong@example.com",
                "password":"Test",
                "usertype":"gym_user"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': false, 'results':'invalid email or password'})
        });
    });
    describe('responds to POST check if friends', () => {
        test('responds to incorrect POST check if friends', async () => {
            const response = await request(server).post('/users/user/checkIfFriends').send({
                'user1email':'InvalidEmail',
                'apikey':apikey,
                'user2email':'InvalidEmail'
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false, 'message':'Invalid emails entered!'});
        })
        test('responds to incorrect POST check if friends', async () => {
            const response = await request(server).post('/users/user/checkIfFriends').send({
                'user1email':'test@example.com',
                'apikey':apikey,
                'user2email':'InvalidEmail'
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false, 'message':'Invalid emails entered!'});
        })
        test('responds to incorrect POST check if friends', async () => {
            const response = await request(server).post('/users/user/checkIfFriends').send({
                'user1email':'InvalidEmail',
                'apikey':apikey,
                'user2email':'friend@example.com'
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false, 'message':'Invalid emails entered!'});
        })
        test('responds to incorrect POST check if friends', async () => {
            const response = await request(server).post('/users/user/checkIfFriends').send({
                'user1email':'wrong@example.com',
                'apikey':apikey,
                'user2email':'friend@example.com'
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false, 'message':'User does not exist!'});
        })
        test('responds to incorrect POST check if friends', async () => {
            const response = await request(server).post('/users/user/checkIfFriends').send({
                'user1email':'friend@example.com',
                'apikey':apikey,
                'user2email':'test@example.com'
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false,'message':'Invalid email or apikey!'});
        })
        test('responds to incorrect POST check if friends', async () => {
            const response = await request(server).post('/users/user/checkIfFriends').send({
                'user1email':'test@example.com',
                'apikey':'wrong',
                'user2email':'friend@example.com'
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false,'message':'Invalid email or apikey!'});
        })
        test('responds to incorrect POST check if friends', async () => {
            const response = await request(server).post('/users/user/checkIfFriends').send({
                'user1email':'test@example.com',
                'apikey':apikey,
                'user2email':'friend@example.com'
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual(false);
        })
    })
    describe('responds to POST insert user OTP', () => {
        test('responds to incorrect POST insert user OTP', async () => {
            const response = await request(server).post('/users/user/OTP').send({
                "email": "InvalidEmail",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false, 'message':'Invalid email entered!'});
        })
        test('responds to incorrect POST insert user OTP', async () => {
            const response = await request(server).post('/users/user/OTP').send({
                "email": "fakeEmail@example.com",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': false ,'message':'User does not exist!' });
        })
        test('responds to correct POST insert user OTP', async () => {
            const response = await request(server).post('/users/user/OTP').send({
                "email": "test@example.com",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':true});
            otp = await userOTPRepository.findByEmail("test@example.com");
            otp = otp.otp;
        })
    });
    describe('responds to POST get user info', () => {
        test('responds to correct POST get user info', async () => {
            const response = await request(server).post('/users/user/info').send({
                "email": "test@example.com",
                "apikey":apikey
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                email:'test@example.com',
                fullname: 'Test Test',
                number: '0123456789',
                username: 'Test',
                profile_picture: 'NONE',
                gym_membership: "Test Brand 1"
            })
        });
        test('responds to incorrect apikey POST get user info', async () => {
            const response = await request(server).post('/users/user/info').send({
                "email": "test@example.com",
                "apikey":"wrong",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or apikey!'})
        });
        test('responds to incorrect email POST get user info', async () => {
            const response = await request(server).post('/users/user/info').send({
                "email": "wrong@example.com",
                "apikey":apikey
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or apikey!'})
        });
    });
});
describe('Testing GET API Calls', () => {
    test('responds to GET badge 1', async () => {
        const response = await request(server).get('/badges/badge/'+bid1)
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            "b_id":bid1,
            "g_id":gid,
            "badgename":"Test Badge 1",
            "badgedescription":"Description",
            "badgechallenge":"Challenge",
            "badgeicon":"b_cycle",
            "requirement1":"3",
            "requirement2":"2",
            "requirement3":"1",
            "activitytype":"CARDIO",
            "tags":"test,test"
        })
    });
    test('responds to GET badge 2', async () => {
        const response = await request(server).get('/badges/badge/'+bid2)
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            "b_id":bid2,
            "g_id":gid,
            "badgename":"Test Badge 2",
            "badgedescription":"Description",
            "badgechallenge":"Challenge",
            "badgeicon":"b_bicep",
            "requirement1":"1",
            "requirement2":"2",
            "requirement3":"3",
            "activitytype":"STRENGTH",
            "tags":"test,test"
        })
    });
    test('responds to GET badges by gym ID', async () => {
        const response = await request(server).get('/badges/gym/'+gid)
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([{
            "b_id":bid1,
            "g_id":gid,
            "badgename":"Test Badge 1",
            "badgedescription":"Description",
            "badgechallenge":"Challenge",
            "badgeicon":"b_cycle",
            "requirement1":"3",
            "requirement2":"2",
            "requirement3":"1",
            "activitytype":"CARDIO",
            "tags":"test,test"
        },{
            "b_id":bid2,
            "g_id":gid,
            "badgename":"Test Badge 2",
            "badgedescription":"Description",
            "badgechallenge":"Challenge",
            "badgeicon":"b_bicep",
            "requirement1":"1",
            "requirement2":"2",
            "requirement3":"3",
            "activitytype":"STRENGTH",
            "tags":"test,test"
        }])
    });
    test('responds to GET gym', async () => {
        const response = await request(server).get('/gyms/gym/'+gid)
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            g_id: gid,
            gym_name : "Test",
            gym_brandname: "Test Brand",
            gym_address: "Test Address",
            gym_coord_long: -25.8661,
            gym_coord_lat: 28.1905
        })
    });
    test('responds to GET badge claims', async () => {
        await badgeClaimRepository.saveClaim(bid1,"test@example.com","Test","test1","test2","test3","ProofURL");
        const response = await request(server).post('/users/claims/').send({
            "email": "test@example.com",
            "apikey": apikey
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([{
            "b_id": {
                "activitytype": "CARDIO",
                "b_id": bid1,
                "badgechallenge": "Challenge",
                "badgedescription": "Description",
                "badgeicon": "b_cycle",
                "badgename": "Test Badge 1",
                "requirement1":"3",
                "requirement2":"2",
                "requirement3":"1",
                "g_id": gid,
                "tags":"test,test"
            }, 
            "email": "test@example.com", 
            "input1": "test1", 
            "input2": "test2", 
            "input3": "test3", 
            "proof": "ProofURL", 
            "username": "Test"
        }])
    });
    test('responds to GET badge owned', async () => {
        await badgeOwnedRepository.saveOwned(bid2,"test@example.com","Test","test1","test2","test3");
        const response = await request(server).get('/users/owned/Test')
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([{
            "b_id": {
                "activitytype": "STRENGTH",
                "b_id": bid2,
                "badgechallenge": "Challenge",
                "badgedescription": "Description",
                "badgeicon": "b_bicep",
                "badgename": "Test Badge 2",
                "requirement1":"1",
                "requirement2":"2",
                "requirement3":"3",
                "g_id": gid,
                "tags":"test,test"
            }, 
            "email": "test@example.com", 
            "input1": "test1", 
            "input2": "test2", 
            "input3": "test3", 
            "username": "Test"
        }])
    });
    test('responds to GET brands', async () => {
        const response = await request(server).get('/brands/brand/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([
            { gym_brandname: 'Test Brand 1', gym_logo: 'Default' },
            { gym_brandname: 'Test Brand 2', gym_logo: 'Default' },
            { gym_brandname: 'Test Brand', gym_logo: 'Default' },
            { gym_brandname: 'Changed Brand 1', gym_logo: 'Default' }
        ]);
    })
    test('responds to GET brands by brandname', async () => {
        const response = await request(server).get('/brands/brand/Test Brand 1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(
            { gym_brandname: 'Test Brand 1', gym_logo: 'Default' }
        );
    })
    test('responds to GET brands by brandname', async () => {
        const response = await request(server).get('/brands/brand/Test Brand 2');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(
            { gym_brandname: 'Test Brand 2', gym_logo: 'Default' }
        );
    })
    test('responds to GET gyms by gym name', async () => {
        const response = await request(server).get('/gyms/gym/name/Test');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            g_id: gid,
            gym_name : "Test",
            gym_brandname: "Test Brand",
            gym_address: "Test Address",
            gym_coord_long: -25.8661,
            gym_coord_lat: 28.1905
        });
    })
    describe('Testing get brands by brandname', () => {
        test('responds to GET brand logo by brand name', async () => {
            const response = await request(server).get('/brands/brand/logo/Test Brand');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual('Default');
        })
        test('responds to GET wrong brand logo by brand name', async () => {
            const response = await request(server).get('/brands/brand/logo/Wrong');
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({'message':'Invalid gym brand!'});
        })
        test('responds to GET brand badges by brand name', async () => {
            const response = await request(server).get('/brands/brand/badges/Test Brand');
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject([
                {"activitytype": "CARDIO", "b_id": bid1, "badgechallenge": "Challenge", "badgedescription": "Description", "badgeicon": "b_cycle", "badgename": "Test Badge 1", "g_id": gid, "requirement1": "3", "requirement2": "2", "requirement3": "1", "tags": "test,test"}, 
                {"activitytype": "STRENGTH", "b_id": bid2, "badgechallenge": "Challenge", "badgedescription": "Description", "badgeicon": "b_bicep", "badgename": "Test Badge 2", "g_id": gid, "requirement1": "1", "requirement2": "2", "requirement3": "3", "tags": "test,test"}
            ]);
        })
        test('responds to GET wrong brand badges by brand name', async () => {
            const response = await request(server).get('/brands/brand/badges/Wrong');
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject([]);
        })
    });
    describe('Testing get user by username', () => {
        test('responds to GET user by username', async () => {
            const response = await request(server).get('/users/user/Test');
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                fullname:"Test Test",
                username:"Test",
                profile_picture:"NONE" 
            });
        })
        test('responds to GET user by username', async () => {
            const response = await request(server).get('/users/user/picture/Test');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual("NONE");
        })
        test('responds to GET wrong user by username', async () => {
            const response = await request(server).get('/users/user/wrong');
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({'message':'Invalid Username!'});
        })
        test('responds to GET picture wrong user by username', async () => {
            const response = await request(server).get('/users/user/picture/wrong');
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({'message':'Invalid username!'});
        })
    })
});
describe('Testing PUT API Calls', () => {
    describe('Testing PUT update user info', () => {
        test('responds to correct apikey PUT update user info', async () => {
            let response = await request(server).put('/users/user/info').send({
                "email": "test@example.com",
                "apikey":apikey,
                "fullname": "Changed Test",
                "number": "9876543210",
                "username":"Changed",
                "membership":"Changed Brand 1"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success': true})
            response = await request(server).post('/users/user/info').send({
                "email": "test@example.com",
                "apikey": apikey
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                email:'test@example.com',
                fullname: 'Changed Test',
                number: '9876543210',
                username: 'Changed',
                profile_picture: 'NONE',
                gym_membership:"Changed Brand 1"
            });
        });
        test('responds to incorrect apikey PUT change user info', async () => {
            let response = await request(server).put('/users/user/info').send({
                "email": "test@example.com",
                "apikey":"wrong",
                "fullname": "Changed Test",
                "number": "9876543210",
                "username":"Changed",
                "membership":"Changed Brand 1"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or apikey!'})
        });
        test('responds to incorrect email PUT change user info', async () => {
            let response = await request(server).put('/users/user/info').send({
                "email": "wrong@example.com",
                "apikey": apikey,
                "fullname": "Changed Test",
                "number": "9876543210",
                "username":"Changed",
                "membership":"Changed Brand 1"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or apikey!'})
        });
        test('responds to incorrect membership PUT change user info', async () => {
            let response = await request(server).put('/users/user/info').send({
                "email": "test@example.com",
                "apikey": apikey,
                "fullname": "Changed Test",
                "number": "9876543210",
                "username":"Changed",
                "membership":"Incorrect membership"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid gym brand!'})
        });
    });
    describe('Testing PUT update user password', () => {
        test('responds to incorrect invalid email PUT change user password', async () => {
            let response = await request(server).put('/users/user/password').send({
                "email": "InvalidEmail",
                "otp":otp,
                "newpassword": "Changed",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email!'})
        });
        test('responds to incorrect otp PUT change user password', async () => {
            let response = await request(server).put('/users/user/password').send({
                "email": "test@example.com",
                "otp":"wrong",
                "newpassword": "Changed",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or OTP!'})
        });
        test('responds to incorrect email PUT change user password', async () => {
            let response = await request(server).put('/users/user/password').send({
                "email": "wrong@example.com",
                "otp":otp,
                "newpassword": "Changed",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or OTP!'})
        });
        test('responds to correct PUT change user password', async () => {
            let response = await request(server).put('/users/user/password').send({
                "email": "test@example.com",
                "otp":otp,
                "newpassword": "Changed",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true })
            response = await request(server).post('/users/login').send({
                "email": "test@example.com",
                "password":"Changed",
                "usertype":"gym_user"
            });
            let result = await userRepository.findByEmail('test@example.com');
            apikey = result.apikey
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({"username":"Changed","profile_picture":"NONE",'success':true,'apikey':apikey})
        });
    });
});
describe('Testing DELETE API Calls', () => {
    describe('Testing DELETE user', () => {
        test('responds to incorrect apikey DELETE user', async () => {
            let response = await request(server).delete('/users/delete').send({
                "email": "test@example.com",
                "apikey": "wrong"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or apikey!'})
        });
        test('responds to incorrect email DELETE user', async () => {
            let response = await request(server).delete('/users/delete').send({
                "email": "wrong@example.com",
                "apikey": apikey
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or apikey!'})
        });
        test('responds to correct DELETE user', async () => {
            let response = await request(server).delete('/users/delete').send({
                "email": "test@example.com",
                "apikey": apikey
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true })
        });
    });
})
