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
    test('responds to GET tables', async () => {
        const res = await request(server).get('/tables/table?table=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to GET badges', async () => {
        const res = await request(server).get('/badges/badge?badge=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to GET claims', async () => {
        const res = await request(server).get('/claims/claim?bid=&gid=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
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
    test('responds to POST insert user', async () => {
        const res = await request(server).post('/users/user?email=&name=&surname=&number=&username=&password=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to POST insert employee', async () => {
        const res = await request(server).post('/users/useremp?email=&name=&surname=&gid=&number=&username=&password=');
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
    test('responds to POST insert badge', async () => {
        const res = await request(server).post('/badges/badge?gid=&bn=&bd=&bc=&bi=&at=');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to POST create tables', async () => {
        const res = await request(server).post('/tables/create');
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
    test('responds to DELETE drop all tables', async () => {
        const res = await request(server).delete('/tables/drop');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
    test('responds to DELETE clear table', async () => {
        const res = await request(server).delete('/tables/clear');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('results');
    });
});