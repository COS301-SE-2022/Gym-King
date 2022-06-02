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
    test('responds to /', async () => {
        const res = await request(server).get('/');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('GymKing');
    });
    test('responds to /tables/table?table=', async () => {
        const res = await request(server).get('/tables/table?table=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to /badges/badge?badge=', async () => {
        const res = await request(server).get('/badges/badge?badge=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});