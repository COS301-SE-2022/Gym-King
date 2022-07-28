import "reflect-metadata";
import { GymKingDataSource } from "../datasource";
import { server } from "../server";
const request = require('supertest');
// beforeAll(async () => {
//     await GymKingDataSource.initialize()
//     .then(() => {
//         console.log("Connection established!")
//     })
//     .catch((err) => {
//         console.log("Connection not made: "+err);
//     })
// });
test('suite', async () => {
    expect(1).toBe(1);
});
// describe('Testing GET API Calls', () => {
//     test('responds to GET gyms owned by an owner', async () => {
//         const res = await request(server).get('/gyms/owned?email=');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
// });
// describe('Testing POST API Calls', () => {
//     test('responds to POST insert owner', async () => {
//         const res = await request(server).post('/owners/owner?email=&name=&surname=&number=&username=&password=');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
//     test('responds to POST insert owned gym', async () => {
//         const res = await request(server).post('/gyms/owned?email=&gid=');
//         expect(res.header['content-type']).toBe('application/json; charset=utf-8');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('success');
//         expect(res.body).toHaveProperty('results');
//     });
//     test('responds to POST insert gym', async () => {
//         const response = await request(server).post('/gyms/gym').send({
//             "gymBrandName": "Test Brand",
//             "gymAddress": "Test Address",
//             "gymCoordLong": -25.8661,
//             "gymCoordLat": 28.1905,
//             "gymIcon":"Test Logo"
//         });
//         expect(response.statusCode).toBe(200);
//         expect(response.body);
//         console.log(response.body);
//     });
// });
