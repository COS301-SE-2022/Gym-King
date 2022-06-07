const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');
const allowedOrigins = [
  'http://localhost:3000'
];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
};
const pool = (() => {
  if (process.env.NODE_ENV !== 'production') {
      return new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false
          }
      });
  } else {
      return new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
              rejectUnauthorized: false
            }
      });
  } })
();
let server = express()
  .options('*', cors(corsOptions))
  .get('/badges/badge', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query.bid;
      const client = await pool.connect();
      if (query == "*") {
        let result = await client.query("SELECT * from BADGE");
        const results = { 'success': true, 'results': (result) ? result.rows : null};
        res.json( results );
      } else {
        let result = await client.query("SELECT * from BADGE where B_ID = '"+query+"'");
        const results = { 'success': true, 'results': (result) ? result.rows : null};
        res.json( results );
      }
      client.release();
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .get('/badges/gym', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query.gid;
      const client = await pool.connect();
      let result = await client.query("SELECT * from BADGE WHERE G_ID = '"+query+"'");
      const results = { 'success': true, 'results': (result) ? result.rows : null};
      res.json( results );
      client.release();
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .get('/gyms/gym', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query.gid;
      const client = await pool.connect();
      let result = await client.query("SELECT * from GYM WHERE G_ID = '"+query+"'");
      const results = { 'success': true, 'results': (result) ? result.rows : null};
      res.json( results );
      client.release();
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .get('/Model/iOS/AR0', cors(corsOptions), async(req: any, res: any)=>{
    const file = './Models/AR0.usdz';
    res.download(file); 
  })
  .get('/Model/Android/AR0', cors(corsOptions), async(req: any, res: any)=>{
    const file = './Models/AR0.glb';
    res.download(file); 
  })
  .post('/users/user', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query("INSERT INTO GYM_USER"+
      "(email,name,surname,number,username,password) VALUES"+
      "('"+query.email+"','"+query.name+"','"+query.surname+"','"+query.number+"','"+query.username+"','"+query.password+"')");
      const results = { 'success': true, 'results': (result) ? result.rows : null};
      res.json( {results,query} );
      client.release();
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .post('/claims/claim', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query("INSERT INTO BADGE_CLAIM"+
      "(B_ID,email,username,input1,input2,input3,proof) VALUES"+
      "('"+query.bid+"','"+query.email+"','"+query.username+"','"+query.input1+"','"+query.input2+"','"+query.input3+"','"+query.proof+"')");
      const results = { 'success': true, 'results': (result) ? result.rows : null};
      res.json( {results,query} );
      client.release();
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
export {server}