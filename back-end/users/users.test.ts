const request = require('supertest');
import { server } from "../users/users";

describe('User server should exist!', () => {
    test('Testing user server', async () => {
        expect(server).toBe(server)
    });
    test('Test if user server is defined', async () => {
        expect(server).toBeDefined()
    });
});
describe('Testing GET API Calls', () => {
    test('responds to GET badges', async () => {
        const res = await request(server).get('/badges/badge?badge=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to GET badges of a gym by gid', async () => {
        const res = await request(server).get('/badges/gym?gid=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to GET gyms by id', async () => {
        const res = await request(server).get('/gyms/gym?gid=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});
describe('Testing POST API Calls', () => {
    test('responds to POST insert user', async () => {
        const res = await request(server).post('/users/user?email=&name=&surname=&number=&username=&password=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to POST insert claim', async () => {
        const res = await request(server).post('/claims/claim?bid=&email=&username=&input1=&input2=&input3=&proof=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});