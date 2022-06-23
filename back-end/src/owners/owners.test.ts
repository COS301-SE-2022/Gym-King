const request = require('supertest');
import {server} from "../server";
describe('Owners server should exist!', () => {
    test('Testing Owners server', async () => {
        expect(server).toBe(server)
    });
    test('Test if Owners server is defined', async () => {
        expect(server).toBeDefined()
    });
});
describe('Testing GET API Calls', () => {
    test('responds to GET gyms owned by an owner', async () => {
        const res = await request(server).get('/gyms/owned?email=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});
describe('Testing POST API Calls', () => {
    test('responds to POST insert owner', async () => {
        const res = await request(server).post('/owners/owner?email=&name=&surname=&number=&username=&password=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to POST insert owned gym', async () => {
        const res = await request(server).post('/gyms/owned?email=&gid=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to POST insert gym', async () => {
        const res = await request(server).post('/gyms/gym?gbn=&ga=&gclo=&gcla=&gi=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});