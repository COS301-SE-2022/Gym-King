const request = require('supertest');
import { server } from "../owners/owners";
describe('Owners server should exist!', () => {
    test('Testing Owners server', async () => {
        expect(server).toBe(server)
    });
    test('Test if Owners server is defined', async () => {
        expect(server).toBeDefined()
    });
});
describe('Testing POST API Calls', () => {
    test('responds to POST insert gym', async () => {
        const res = await request(server).post('/gyms/gym?gbn=&ga=&gclo=&gcla=&gi=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});