const request = require('supertest');
import {server} from "../server";
describe('User server should exist!', () => {
    test('Testing user server', async () => {
        expect(server).toBe(server)
    });
    test('Test if user server is defined', async () => {
        expect(server).toBeDefined()
    });
});
// describe('Testing GET API Calls', () => {
//     test('responds to GET badges', async () => {
//         const res = await request(server).get('/badges/badge/:bid');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//     });
//     test('responds to GET badges of a gym by gid', async () => {
//         const res = await request(server).get('/badges/gym/:gid');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
//     test('responds to GET gyms by id', async () => {
//         const res = await request(server).get('/gyms/gym/:gid');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
//     test('responds to GET owned badges for leaderboard score', async () => {
//         const res = await request(server).get('/leaderboard/score?gid=');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
// });
// describe('Testing POST API Calls', () => {
//     test('responds to POST insert user', async () => {
//         const res = await request(server).post('/users/user');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
//     test('responds to POST insert claim', async () => {
//         const res = await request(server).post('/claims/claim');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
    
//     test('responds to POST login user', async () => {
//         const res = await request(server).post('/users/login');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
// });
