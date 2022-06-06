const request = require('supertest');
import { server } from "../employees/employees";

describe('Employee server should exist!', () => {
    test('Testing Employee server', async () => {
        expect(server).toBe(server)
    });
    test('Test if Employee server is defined', async () => {
        expect(server).toBeDefined()
    });
});
describe('Testing GET API Calls', () => {
    test('responds to GET claims', async () => {
        const res = await request(server).get('/claims/claim?bid=&gid=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});
describe('Testing POST API Calls', () => {
    test('responds to POST insert employee', async () => {
        const res = await request(server).post('/users/useremp?email=&name=&surname=&gid=&number=&username=&password=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to POST insert badge', async () => {
        const res = await request(server).post('/badges/badge?gid=&bn=&bd=&bc=&bi=&at=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});
describe('Testing PUT API Calls', () => {
    test('responds to PUT update a claim to owned', async () => {
        const res = await request(server).put('/claims/claim?bid=&email=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to PUT update a badge', async () => {
        const res = await request(server).put('/badges/badge?bid=&gid=&bn=&bd=&bc=&bi=&at=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});
describe('Testing DELETE API Calls', () => {
    test('responds to DELETE a badge', async () => {
        const res = await request(server).delete('/badges/badge?bid=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to DELETE a claim', async () => {
        const res = await request(server).delete('/claims/claim?bid=&email=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});