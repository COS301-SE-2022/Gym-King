const request = require('supertest');
import { server } from "./gymkingheroku";

describe('Server should exist!', () => {
    test('Testing server', async () => {
        expect(server).toBe(server)
    });
    test('Test if server is defined', async () => {
        expect(server).toBeDefined()
    });
});
describe('Testing GET API Calls', () => {
    test('responds to GET /', async () => {
        const res = await request(server).get('/');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('GymKing');
    });
    test('responds to GET /tables/table?table=', async () => {
        const res = await request(server).get('/tables/table?table=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to GET /badges/badge?badge=', async () => {
        const res = await request(server).get('/badges/badge?badge=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to GET /claims/claim?bid=&gid=', async () => {
        const res = await request(server).get('/claims/claim?bid=&gid=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});
describe('Testing POST API Calls', () => {
    test('responds to POST /gyms/gym?gbn=&ga=&gclo=&gcla=&gi=', async () => {
        const res = await request(server).post('/gyms/gym?gbn=&ga=&gclo=&gcla=&gi=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});