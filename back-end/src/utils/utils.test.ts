const request = require('supertest');
import {server} from "../server";
describe('Extras server should exist!', () => {
    test('Testing Extras server', async () => {
        expect(server).toBe(server)
    });
    test('Test if Extras server is defined', async () => {
        expect(server).toBeDefined()
    });
});
// describe('Testing GET API Calls', () => {
//     test('responds to GET /', async () => {
//         const res = await request(server).get('/');
//         expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.text).toEqual('GymKing');
//     });
//     test('responds to GET tables', async () => {
//         const res = await request(server).get('/tables/table?table=');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
// });
// describe('Testing POST API Calls', () => {
//     test('responds to POST create tables', async () => {
//         const res = await request(server).post('/tables/create');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
// });
// describe('Testing DELETE API Calls', () => {
//     // test('responds to DELETE drop all tables', async () => {
//     //     const res = await request(server).delete('/tables/drop');
//     //     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//     //     expect(res.statusCode).toBe(200);
//     //     expect(res.body).toHaveProperty('success');
//     //     expect(res.body).toHaveProperty('results');
//     // });
//     test('responds to DELETE clear table', async () => {
//         const res = await request(server).delete('/tables/clear');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
// });
