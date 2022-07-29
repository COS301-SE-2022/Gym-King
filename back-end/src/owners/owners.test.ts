jest.setTimeout(25000)
import "reflect-metadata";
import { GymKingDataSource } from "../datasource";
import { ownerOTPRepository } from "../repositories/owner_otp.repository";
import { server } from "../server";
const request = require('supertest');
let gid1;
let gid2;
let otp;
beforeAll(async () => {
    await GymKingDataSource.initialize()
    .then(() => {
        console.log("Connection established!")
    })
    .catch((err) => {
        console.log("Connection not made: "+err);
    })
});
describe('Testing POST API Calls', () => {
    test('responds to POST insert owner', async () => {
        const response = await request(server).post('/owners/owner').send({
            "email": "owner@example.com",
            "name": "Test",
            "surname": "Test",
            "number": "0123456789",
            "username":"Test",
            "password":"Test"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({'success':true})
    });
    test('responds to POST insert gym', async () => {
        let response = await request(server).post('/gyms/gym').send({
            "gymBrandName": "Test Brand 1",
            "gymAddress": "Test Address 1",
            "gymCoordLong": -25.8661,
            "gymCoordLat": 28.1905,
            "gymIcon":"Test Logo 1"
        });
        expect(response.statusCode).toBe(200);
        gid1 = response.body.g_id;
        expect(response.body).toMatchObject({
            g_id: gid1,
            gym_address: "Test Address 1",
            gym_brandname: "Test Brand 1",
            gym_coord_lat: 28.1905,
            gym_coord_long: -25.8661,
            gym_icon: 'Test Logo 1'
        })
        response = await request(server).post('/gyms/gym').send({
            "gymBrandName": "Test Brand 2",
            "gymAddress": "Test Address 2",
            "gymCoordLong": -25.8661,
            "gymCoordLat": 28.1905,
            "gymIcon":"Test Logo 2"
        });
        expect(response.statusCode).toBe(200);
        gid2 = response.body.g_id;
        expect(response.body).toMatchObject({
            g_id: gid2,
            gym_address: "Test Address 2",
            gym_brandname: "Test Brand 2",
            gym_coord_lat: 28.1905,
            gym_coord_long: -25.8661,
            gym_icon: 'Test Logo 2'
        })
    });
    describe('Testing Login calls', () => {
        test('responds to correct POST login owner', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "owner@example.com",
                "password":"Test",
                "usertype":"gym_owner"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({"profile_picture":"NONE",'success':true})
        });
        test('responds to incorrect password POST login owner', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "owner@example.com",
                "password":"Wrong",
                "usertype":"gym_owner"
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toStrictEqual({ 'success': false, 'results':"invalid password" })
        });
        test('responds to incorrect email POST login owner', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "wrong@example.com",
                "password":"Test",
                "usertype":"gym_owner"
            });
            expect(response.statusCode).toBe(404);
            expect(response.body).toStrictEqual({ 'success': false, 'results':'invalid email or password'})
        });
    });
    test('Testing POST owner owns a gym', async () => {
        let response = await request(server).post('/gyms/owned').send({
            "gid": gid1,
            "email":"owner@example.com"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            g_id: gid1,
            email: "owner@example.com"
        })
        response = await request(server).post('/gyms/owned').send({
            "gid": gid2,
            "email":"owner@example.com"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            g_id: gid2,
            email: "owner@example.com"
        })
        response = await request(server).post('/employees/employee').send({
            "email": "emp1@example.com",
            "name": "Test",
            "surname": "Test",
            "number": "0123456789",
            "username":"Test",
            "password":"Test",
            "gid":gid1
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({'success':true})
        response = await request(server).post('/employees/employee').send({
            "email": "emp2@example.com",
            "name": "Test",
            "surname": "Test",
            "number": "0123456789",
            "username":"Test",
            "password":"Test",
            "gid":gid2
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({'success':true})
    });
    test('responds to POST insert owner OTP', async () => {
        const response = await request(server).post('/owners/owner/OTP').send({
            "email": "owner@example.com",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({'success':true});
        otp = await ownerOTPRepository.findByEmail("owner@example.com");
        otp = otp.otp;
    });
    describe('responds to POST get owner info', () => {
        test('responds to correct POST get owner info', async () => {
            const response = await request(server).post('/owners/owner/info').send({
                "email": "owner@example.com",
                "password": "Test"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                "email": "owner@example.com",
                "name": "Test",
                "surname": "Test",
                "number": "0123456789",
                "username":"Test"
            })
        });
        test('responds to incorrect password POST get owner info', async () => {
            const response = await request(server).post('/owners/owner/info').send({
                "email": "owner@example.com",
                "password": "wrong"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
        test('responds to incorrect email POST get owner info', async () => {
            const response = await request(server).post('/owners/owner/info').send({
                "email": "wrong@example.com",
                "password": "Test"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
    });
});
describe('Testing GET API Calls', () => {
    test('responds to GET employees of owner', async () => {
        const response = await request(server).get('/owners/employees/owner@example.com')
        expect(response.statusCode).toBe(200);
        if (response.body[0].g_id == gid1){
            expect(response.body[0]).toMatchObject({
                email: "emp1@example.com",
                name: "Test",
                surname: "Test",
                number: "0123456789",
                username:"Test",
                g_id:gid1,
                profile_picture: "NONE"
            });
            expect(response.body[1]).toMatchObject({
                email: "emp2@example.com",
                name: "Test",
                surname: "Test",
                number: "0123456789",
                username:"Test",
                g_id:gid2,
                profile_picture: "NONE"
            });
        }
        else {
            expect(response.body[0]).toMatchObject({
                email: "emp2@example.com",
                name: "Test",
                surname: "Test",
                number: "0123456789",
                username:"Test",
                g_id:gid2,
                profile_picture: "NONE"
            });
            expect(response.body[1]).toMatchObject({
                email: "emp1@example.com",
                name: "Test",
                surname: "Test",
                number: "0123456789",
                username:"Test",
                g_id:gid1,
                profile_picture: "NONE"
            });
        }
    });
    test('responds to GET owned gyms', async () => {
        const response = await request(server).get('/gyms/owned/owner@example.com')
        expect(response.statusCode).toBe(200);
        if (response.body[0].g_id == gid1){
            expect(response.body[0]).toMatchObject({ 
                g_id: gid1,
                gym_address: "Test Address 1", 
                gym_brandname: "Test Brand 1", 
                gym_coord_lat: 28.1905, 
                gym_coord_long: -25.8661, 
                gym_icon: "Test Logo 1"
            });
            expect(response.body[1]).toMatchObject({ 
                g_id: gid2,
                gym_address: "Test Address 2", 
                gym_brandname: "Test Brand 2", 
                gym_coord_lat: 28.1905, 
                gym_coord_long: -25.8661, 
                gym_icon: "Test Logo 2"
            });
        }
        else{
            expect(response.body[1]).toMatchObject({ 
                g_id: gid1,
                gym_address: "Test Address 1", 
                gym_brandname: "Test Brand 1", 
                gym_coord_lat: 28.1905, 
                gym_coord_long: -25.8661, 
                gym_icon: "Test Logo 1"
            });
            expect(response.body[0]).toMatchObject({ 
                g_id: gid2,
                gym_address: "Test Address 2", 
                gym_brandname: "Test Brand 2", 
                gym_coord_lat: 28.1905, 
                gym_coord_long: -25.8661, 
                gym_icon: "Test Logo 2"
            });
        }
    });
    test('responds to correct GET owner profile picture by email', async () => {
        const response = await request(server).get('/owners/owner/picture/owner@example.com')
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('NONE');
    });
    test('responds to incorrect GET owner profile picture by email', async () => {
        const response = await request(server).get('/owners/owner/picture/wrong')
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({'message':'Invalid email!'});
    });
});
describe('Testing PUT API Calls', () => {
    describe('Testing PUT update owner info', () => {
        test('responds to correct PUT update owner info', async () => {
            let response = await request(server).put('/owners/owner/info').send({
                "email": "owner@example.com",
                "password":"Test",
                "name": "Changed",
                "surname": "Changed",
                "number": "9876543210",
                "username":"Changed"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success': true})
            response = await request(server).post('/owners/owner/info').send({
                "email": "owner@example.com",
                "password":"Test"
            });
            expect(response.statusCode).toBe(200);
             expect(response.body).toMatchObject({
                email:'owner@example.com',
                name: 'Changed',
                surname: 'Changed',
                number: '9876543210',
                username: 'Changed',
                profile_picture: 'NONE'
            });
        });
        test('responds to incorrect password PUT change owner info', async () => {
            let response = await request(server).put('/owners/owner/info').send({
                "email": "owner@example.com",
                "password":"wrong",
                "name": "Changed",
                "surname": "Changed",
                "number": "9876543210",
                "username":"Changed"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
            });
        test('responds to incorrect email PUT change owner info', async () => {
            let response = await request(server).put('/owners/owner/info').send({
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
    describe('Testing PUT update gym info', () => {
        test('responds to PUT update gym info', async () => {
            let response = await request(server).put('/owner/gym/info').send({
                gid: gid1,
                brandname: "Changed Brand 1",
                address: "Changed Address 1",
                lat: 50,
                long: 50,
                icon: "Changed Icon 1"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success': true})
            response = await request(server).get('/gyms/gym/'+gid1)
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                g_id: gid1,
                gym_brandname: "Changed Brand 1",
                gym_address: "Changed Address 1",
                gym_coord_lat: 50,
                gym_coord_long: 50,
                gym_icon: "Changed Icon 1"
            });
        });
    });
    describe('Testing PUT update owner password', () => {
        test('responds to incorrect otp PUT change owner password', async () => {
            let response = await request(server).put('/owners/owner/password').send({
                "email": "owner@example.com",
                "otp":"wrong",
                "newpassword": "Changed",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or OTP!'})
        });
        test('responds to incorrect email PUT change owner password', async () => {
            let response = await request(server).put('/owners/owner/password').send({
                "email": "wrong@example.com",
                "otp":otp,
                "newpassword": "Changed",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or OTP!'})
        });
        test('responds to correct PUT change owner password', async () => {
            let response = await request(server).put('/owners/owner/password').send({
                "email": "owner@example.com",
                "otp":otp,
                "newpassword": "Changed",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true })
            response = await request(server).post('/users/login').send({
                "email": "owner@example.com",
                "password":"Changed",
                "usertype":"gym_owner"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({"profile_picture":"NONE",'success':true})
        });
    });
});
describe('Testing DELETE API Calls', () => {
    describe('Testing DELETE gym', () => {
        test('responds to incorrect owner password to DELETE gym', async () => {
            let response = await request(server).delete('/owner/delete/gym').send({
                "email": "owner@example.com",
                "password":"wrong",
                "gid": gid1
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
        test('responds to incorrect owner email to DELETE gym', async () => {
            let response = await request(server).delete('/owner/delete/gym').send({
                "email": "wrong@example.com",
                "password":"Changed",
                "gid": gid1
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
        test('responds to correct DELETE gym', async () => {
            let response = await request(server).delete('/owner/delete/gym').send({
                "email": "owner@example.com",
                "password":"Changed",
                "gid": gid1
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true })
        });
    });
    describe('Testing DELETE owner', () => {
        test('responds to incorrect password DELETE owner', async () => {
            let response = await request(server).delete('/owners/delete').send({
                "email": "owner@example.com",
                "password": "wrong"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'});
        });
        test('responds to incorrect email DELETE owner', async () => {
            let response = await request(server).delete('/owners/delete').send({
                "email": "wrong@example.com",
                "password": "Changed"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'});
        });
        test('responds to correct DELETE owner', async () => {
            let response = await request(server).delete('/owners/delete').send({
                "email": "owner@example.com",
                "password": "Changed"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true });
        });
    });
});
