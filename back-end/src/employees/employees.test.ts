jest.setTimeout(25000)
import "reflect-metadata";
import { GymKingDataSource } from "../datasource";
import { badgeClaimRepository } from "../repositories/badge_claim.repository";
import { employeeOTPRepository } from "../repositories/employee_otp.repository";
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
    response = await request(server).post('/owners/owner').send({
        "email":"owner@example.com",
        "name":"Test",
        "surname":"Test",
        "number":"0123456789",
        "username":"Test",
        "password":"Test"
    });
    response = await request(server).post('/users/user').send({
        "email": "user@example.com",
        "name": "Test",
        "surname": "Test",
        "number": "0123456789",
        "username":"Test",
        "password":"Test"
    });
});
describe('Testing POST API Calls', () => {
    describe('responds to POST insert employee', () => {
        test('responds to correct POST insert employee', async () => {
            const response = await request(server).post('/employees/employee').send({
                "email": "test@example.com",
                "name": "Test",
                "surname": "Test",
                "number": "0123456789",
                "username":"Test",
                "password":"Test",
                "gid":gid
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':true})
        })
        test('responds to incorrect POST insert employee', async () => {
            const response = await request(server).post('/employees/employee').send({
                "email": "InvalidEmail",
                "name": "Test",
                "surname": "Test",
                "number": "0123456789",
                "username":"Test",
                "password":"Test",
                "gid":gid
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false, 'message':'Invalid email entered!'})
        })
    });
    test('responds to POST insert a badge', async () => {
        let response = await request(server).post('/badges/badge').send({
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
        await badgeClaimRepository.saveClaim(bid1,"user@example.com","Test","test1","test2","test3","ProofURL");
        await badgeClaimRepository.saveClaim(bid2,"user@example.com","Test","test1","test2","test3","ProofURL");
    });
    describe('Testing Login calls', () => {
        test('responds to correct POST login employee', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "test@example.com",
                "password":"Test",
                "usertype":"gym_employee"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({"profile_picture":"NONE",'success':true})
        });
        test('responds to incorrect password POST login employee', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "test@example.com",
                "password":"Wrong",
                "usertype":"gym_employee"
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toStrictEqual({ 'success': false, 'results':"invalid password" })
        });
        test('responds to incorrect email POST login employee', async () => {
            const response = await request(server).post('/users/login').send({
                "email": "wrong@example.com",
                "password":"Test",
                "usertype":"gym_employee"
            });
            expect(response.statusCode).toBe(404);
            expect(response.body).toStrictEqual({ 'success': false, 'results':'invalid email or password'})
        });
    });
    describe('responds to POST insert employee OTP', () => {
        test('responds to incorrect POST insert employee OTP', async () => {
            const response = await request(server).post('/employees/employee/OTP').send({
                "email": "fakeEmail@example.com",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': false ,'message':'Employee does not exist!' });
        })
        test('responds to incorrect POST insert employee OTP', async () => {
            const response = await request(server).post('/employees/employee/OTP').send({
                "email": "InvalidEmail",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':false, 'message':'Invalid email entered!'});
        })
        test('responds to correct POST insert employee OTP', async () => {
            const response = await request(server).post('/employees/employee/OTP').send({
                "email": "test@example.com",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':true});
            otp = await employeeOTPRepository.findByEmail("test@example.com");
            otp = otp.otp;
        })
    });
    describe('responds to POST get employee info', () => {
        test('responds to correct POST get employee info', async () => {
            const response = await request(server).post('/employees/employee/info').send({
                "email": "test@example.com",
                "password":"Test",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                email:'test@example.com',
                g_id: {
                    g_id: gid,
                    gym_address: "Test Address",
                    gym_brandname: "Test Brand",
                    gym_coord_lat: 28.1905,
                    gym_coord_long: -25.8661,
                    gym_icon: 'Test Logo'
                },
                name: 'Test',
                surname: 'Test',
                number: '0123456789',
                username: 'Test',
                profile_picture: 'NONE'
            })
        });
        test('responds to incorrect password POST get employee info', async () => {
            const response = await request(server).post('/employees/employee/info').send({
                "email": "test@example.com",
                "password":"wrong",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
        test('responds to incorrect email POST get user info', async () => {
            const response = await request(server).post('/employees/employee/info').send({
                "email": "wrong@example.com",
                "password":"test",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
    });
});
describe('Testing GET API Calls', () => {
    test('responds to correct GET employee profile picture by email', async () => {
        const response = await request(server).get('/employees/employee/picture/test@example.com')
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('NONE');
    });
    test('responds to incorrect GET employee profile picture by email', async () => {
        const response = await request(server).get('/employees/employee/picture/wrong')
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({'message':'Invalid email!'});
    });
    test('responds to GET claims of a gym', async () => {
        const response = await request(server).get('/claims/gym/'+gid)
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([
            {
              email: 'user@example.com',
              username: 'Test',
              profile_picture: 'NONE',
              b_id: bid1,
              input1: 'test1',
              input2: 'test2',
              input3: 'test3',
              proof: 'ProofURL'
            },
            {
              email: 'user@example.com',
              username: 'Test',
              profile_picture: 'NONE',
              b_id: bid2,
              input1: 'test1',
              input2: 'test2',
              input3: 'test3',
              proof: 'ProofURL',
            }
          ]);
    });
    test('responds to GET claim of badge 1 by email and bid', async () => {
        const response = await request(server).get('/claims/claim?bid='+bid1+'&email=user@example.com')
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            username: 'Test',
            input1: 'test1',
            input2: 'test2',
            input3: 'test3',
            proof: 'ProofURL',
            b_id: {
              b_id: bid1,
              badgename: 'Test Badge 1',
              badgedescription: 'Description',
              badgechallenge: 'Challenge',
              badgeicon: 'b_cycle',
              activitytype: 'CARDIO',
              g_id: gid
            },
            email: 'user@example.com'
          });
    });
    test('responds to GET claim of badge 2 by email and bid', async () => {
        const response = await request(server).get('/claims/claim?bid='+bid2+'&email=user@example.com')
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            username: 'Test',
            input1: 'test1',
            input2: 'test2',
            input3: 'test3',
            proof: 'ProofURL',
            b_id: {
              b_id: bid2,
              badgename: 'Test Badge 2',
              badgedescription: 'Description',
              badgechallenge: 'Challenge',
              badgeicon: 'b_bicep',
              activitytype: 'STRENGTH',
              g_id: gid
            },
            email: 'user@example.com'
          });
    });
});
describe('Testing PUT API Calls', () => {
    describe('Testing PUT update employee info', () => {
        test('responds to correct password PUT update employee info', async () => {
            let response = await request(server).put('/employees/employee/info').send({
                "email": "test@example.com",
                "password":"Test",
                "name": "Changed",
                "surname": "Changed",
                "number": "9876543210",
                "username":"Changed"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success': true})
            response = await request(server).post('/employees/employee/info').send({
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
        test('responds to incorrect password PUT change employee info', async () => {
            let response = await request(server).put('/employees/employee/info').send({
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
        test('responds to incorrect email PUT change employee info', async () => {
            let response = await request(server).put('/employees/employee/info').send({
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
    describe('Testing PUT update badge', () => {
        test('responds to PUT update badge info', async () => {
            let response = await request(server).put('/badges/badge').send({
                "bid":bid2,
                "gid":gid,
                "badgename":"Test Badge 2 EDITED",
                "badgedescription":"Description",
                "badgechallenge":"Challenge",
                "badgeicon":"b_cycle",
                "activitytype":"CARDIO"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':true})
            response = await request(server).get('/badges/badge/'+bid2)
            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject({
                "badgename":"Test Badge 2 EDITED",
                "badgedescription":"Description",
                "badgechallenge":"Challenge",
                "badgeicon":"b_cycle",
                "activitytype":"CARDIO"
            });
        });
    });
    describe('Testing PUT update employee password', () => {
        test('responds to incorrect otp PUT change employee password', async () => {
            let response = await request(server).put('/employees/employee/password').send({
                "email": "test@example.com",
                "otp":"wrong",
                "newpassword": "Changed",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or OTP!'})
        });
        test('responds to incorrect email PUT change employee password', async () => {
            let response = await request(server).put('/employees/employee/password').send({
                "email": "wrong@example.com",
                "otp":otp,
                "newpassword": "Changed",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or OTP!'})
        });
        test('responds to correct PUT change employee password', async () => {
            let response = await request(server).put('/employees/employee/password').send({
                "email": "test@example.com",
                "otp":otp,
                "newpassword": "Changed",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true })
            response = await request(server).post('/users/login').send({
                "email": "test@example.com",
                "password":"Changed",
                "usertype":"gym_employee"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({"profile_picture":"NONE",'success':true})
        });
    });
    describe('Testing PUT accepting a claim', () => {
        test('responds to incorrect PUT accept a claim', async () => {
            let response = await request(server).put('/claims/claim').send({
                "bid":bid2,
                "email":"wrong@example.com"
            });
            expect(response.statusCode).toBe(404);
            expect(response.body).toStrictEqual({'message': 'Claim does not exist.'})
        });
        test('responds to correct PUT accept a claim', async () => {
            let response = await request(server).put('/claims/claim').send({
                "bid":bid2,
                "email":"user@example.com"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'success':true})
        });
    });
});
describe('Testing DELETE API Calls', () => {
    describe('Testing DELETE employee', () => {
        test('responds to incorrect owner password to DELETE employee', async () => {
            let response = await request(server).delete('/employees/employee').send({
                "owneremail": "owner@example.com",
                "ownerpassword":"wrong",
                "employeeemail": "test@example.com"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
        test('responds to incorrect owner email to DELETE employee', async () => {
            let response = await request(server).delete('/employees/employee').send({
                "owneremail": "wrong@example.com",
                "ownerpassword":"Test",
                "employeeemail": "test@example.com"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or password!'})
        });
        test('responds to correct DELETE employee', async () => {
            let response = await request(server).delete('/employees/employee').send({
                "owneremail": "owner@example.com",
                "ownerpassword":"Test",
                "employeeemail": "test@example.com"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true })
        });
    });
    describe('Testing DELETE claim', () => {
        test('responds to incorrect DELETE claim', async () => {
            let response = await request(server).delete('/claims/claim').send({
                "bid": bid1,
                "email":"wrong@example.com"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({'message':'Invalid email or badge ID!'});
        });
        test('responds to correct DELETE claim', async () => {
            let response = await request(server).delete('/claims/claim').send({
                "bid": bid1,
                "email":"user@example.com"
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true });
        });
    });
    describe('Testing DELETE badge', () => {
        test('responds to DELETE badges', async () => {
            let response = await request(server).delete('/badges/badge').send({
                "bid": bid1
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true })
            response = await request(server).delete('/badges/badge').send({
                "bid": bid2
            });
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({ 'success': true })
        });
    }); 
})
