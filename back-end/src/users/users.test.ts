jest.setTimeout(25000);
import "reflect-metadata";
import { GymKingDataSource } from "../datasource";
import { badgeClaimRepository } from "../repositories/badge_claim.repository";
import { badgeOwnedRepository } from "../repositories/badge_owned.repository";
import { userOTPRepository } from "../repositories/user_otp.repository";
import { server } from "../server";
const request = require('supertest');
let gid;
let bid1;
let bid2;
let otp;
beforeAll(async () => {
    await GymKingDataSource.initialize()
    .then(() => {
        console.log("Connection established!")
    })
    .catch((err) => {
        console.log("Connection not made: "+err);
    })
    let response = await request(server).post('/gyms/gym').send({
        "gymBrandName": "Test Brand",
        "gymAddress": "Test Address",
        "gymCoordLong": -25.8661,
        "gymCoordLat": 28.1905,
        "gymIcon":"Test Logo"
    });
    gid = response.body.g_id;
    response = await request(server).post('/badges/badge').send({
        "gid":gid,
        "badgename":"Test Badge 1",
        "badgedescription":"Description",
        "badgechallenge":"Challenge",
        "badgeicon":"b_cycle",
        "activitytype":"CARDIO"
    });
    bid1 = response.body.b_id;
    response = await request(server).post('/badges/badge').send({
        "gid":gid,
        "badgename":"Test Badge 2",
        "badgedescription":"Description",
        "badgechallenge":"Challenge",
        "badgeicon":"b_bicep",
        "activitytype":"STRENGTH"
    });
    bid2 = response.body.b_id;
});
describe('Testing POST API Calls', () => {
    describe('responds to POST insert user', () => {
        test('responds to incorrect insert user', async () => {
            const response = await request(server).post('/users/user').send({
                "email": "WrongEmail",
                "name": "Test",
                "surname": "Test",
                "number": "0123456789",
                "username":"Test",
                "password":"Test"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false, 'message':'Invalid email entered!'})
        })
        test('responds to correct insert user', async () => {
            const response = await request(server).post('/users/user').send({
                "email": "test@example.com",
                "name": "Test",
                "surname": "Test",
                "number": "0123456789",
                "username":"Test",
                "password":"Test"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':true})
        })
    });
    test('responds to correct GET user profile picture by email', async () => {
        const response = await request(server).get('/users/user/picture/test@example.com')
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('NONE');
    });
    test('responds to incorrect GET user profile picture by email', async () => {
        const response = await request(server).get('/users/user/picture/wrong')
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({'message':'Invalid email!'});
    });
    describe('Testing Login calls', () => {
        test('responds to correct POST login user', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "test@example.com",
                "password":"Test",
                "usertype":"gym_user"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({"profile_picture":"NONE",'success':true})
        });
        test('responds to incorrect password POST login user', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "test@example.com",
                "password":"Wrong",
                "usertype":"gym_user"
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toStrictEqual({ 'success': false, 'results':"invalid password" })
        });
        test('responds to incorrect email POST login user', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "wrong@example.com",
                "password":"Test",
                "usertype":"gym_user"
            });
            expect(response.statusCode).toBe(404);
            expect(response.body).toStrictEqual({ 'success': false, 'results':'invalid email or password'})
        });
    });
    describe('responds to POST insert user OTP', () => {
        test('responds to incorrect POST insert user OTP', async () => {
            const response = await request(server).post('/users/user/OTP').send({
                "email": "InvalidEmail",
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
                "password":"Test",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                email:'test@example.com',
                name: 'Test',
                surname: 'Test',
                number: '0123456789',
                username: 'Test',
                profile_picture: 'NONE'
            })
        });
        test('responds to incorrect password POST get user info', async () => {
            const response = await request(server).post('/users/user/info').send({
                "email": "test@example.com",
                "password":"wrong",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
        test('responds to incorrect email POST get user info', async () => {
            const response = await request(server).post('/users/user/info').send({
                "email": "wrong@example.com",
                "password":"test",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
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
            "activitytype":"CARDIO"
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
            "activitytype":"STRENGTH"
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
            "activitytype":"CARDIO"
        },{
            "b_id":bid2,
            "g_id":gid,
            "badgename":"Test Badge 2",
            "badgedescription":"Description",
            "badgechallenge":"Challenge",
            "badgeicon":"b_bicep",
            "activitytype":"STRENGTH"
        }])
    });
    test('responds to GET gym', async () => {
        const response = await request(server).get('/gyms/gym/'+gid)
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            g_id: gid,
            gym_brandname: "Test Brand",
            gym_address: "Test Address",
            gym_coord_long: -25.8661,
            gym_coord_lat: 28.1905,
            gym_icon:"Test Logo"
        })
    });
    test('responds to GET badge claims', async () => {
        await badgeClaimRepository.saveClaim(bid1,"test@example.com","Test","test1","test2","test3","ProofURL");
        const response = await request(server).get('/users/claims/test@example.com')
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([{
            "b_id": {
                "activitytype": "CARDIO",
                "b_id": bid1,
                "badgechallenge": "Challenge",
                "badgedescription": "Description",
                "badgeicon": "b_cycle",
                "badgename": "Test Badge 1",
                "g_id": gid
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
        const response = await request(server).get('/users/owned/test@example.com')
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([{
            "b_id": {
                "activitytype": "STRENGTH",
                "b_id": bid2,
                "badgechallenge": "Challenge",
                "badgedescription": "Description",
                "badgeicon": "b_bicep",
                "badgename": "Test Badge 2",
                "g_id": gid
            }, 
            "email": "test@example.com", 
            "input1": "test1", 
            "input2": "test2", 
            "input3": "test3", 
            "username": "Test"
        }])
    });
});
describe('Testing PUT API Calls', () => {
    describe('Testing PUT update user info', () => {
        test('responds to correct password PUST update user info', async () => {
            let response = await request(server).put('/users/user/info').send({
                "email": "test@example.com",
                "password":"Test",
                "name": "Changed",
                "surname": "Changed",
                "number": "9876543210",
                "username":"Changed"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success': true})
            response = await request(server).post('/users/user/info').send({
                "email": "test@example.com",
                "password":"Test"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                email:'test@example.com',
                name: 'Changed',
                surname: 'Changed',
                number: '9876543210',
                username: 'Changed',
                profile_picture: 'NONE'
            });
        });
        test('responds to incorrect password PUT change user info', async () => {
            let response = await request(server).put('/users/user/info').send({
                "email": "test@example.com",
                "password":"wrong",
                "name": "Changed",
                "surname": "Changed",
                "number": "9876543210",
                "username":"Changed"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
        test('responds to incorrect email PUT change user info', async () => {
            let response = await request(server).put('/users/user/info').send({
                "email": "wrong@example.com",
                "password":"Test",
                "name": "Changed",
                "surname": "Changed",
                "number": "9876543210",
                "username":"Changed"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
    });
    describe('Testing PUT update user password', () => {
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
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({"profile_picture":"NONE",'success':true})
        });
    });
});
describe('Testing DELETE API Calls', () => {
    describe('Testing DELETE user', () => {
        test('responds to incorrect password DELETE user', async () => {
            let response = await request(server).delete('/users/delete').send({
                "email": "test@example.com",
                "password":"wrong"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
        test('responds to incorrect email DELETE user', async () => {
            let response = await request(server).delete('/users/delete').send({
                "email": "wrong@example.com",
                "password":"Test"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
        test('responds to correct DELETE user', async () => {
            let response = await request(server).delete('/users/delete').send({
                "email": "test@example.com",
                "password":"Changed"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true })
        });
    });
})
