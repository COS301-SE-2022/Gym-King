const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const fs = require('fs');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8100'
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
const users = express.Router()
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
  //=========================================================================================================//
  /**
   * ...
   * @param 
   * @returns 
   */
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
  //=========================================================================================================//
  /**
   * ...
   * @param 
   * @returns 
   */
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
  //=========================================================================================================//
  /**
   * ...
   * @param 
   * @returns 
   */
  .get('/leaderboard/score', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query.gid;
      const client = await pool.connect();
      let result = await client.query("SELECT iv.B_id, b.Badgename, iv.Username, iv.Count, b.Activitytype FROM BADGE as b "+ 
      "inner join ( SELECT B_ID, Username, Count FROM BADGE_OWNED WHERE B_ID IN ( SELECT B_ID FROM BADGE WHERE G_ID = '"+query+"' ) ) as iv "+
      "on b.B_id = iv.B_id");
      const results = { 'success': true, 'results': (result) ? result.rows : null};
      res.json( results );
      client.release();
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * GET to get badge model by its name for IOS
   * @param {string} id The name of the badge model
   * @returns {USDZ file}
   */
  .get('/Model/iOS', cors(corsOptions), async(req: any, res: any)=>{
    if(req.query.id){
      const file = './src/assets/models/'+req.query.id+'.usdz';
      fs.access(file, fs.F_OK, (err: any) => {
        if (err) {
          
          const results = { success: false, results: "404 Badge model not found" };
          res.json(results);
          return
        }
        res.download(file); 
      })
    }
    else{
      const results = { success: false, results: "400 bad request" };
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * GET to get badge model by its name for Android
   * @param {string} id The name of the badge model
   * @returns {GLB file}
   */
  .get('/Model/Android/AR0', cors(corsOptions), async(req: any, res: any)=>{
    if(req.query.id){
      const file = './src/assets/models/'+req.query.id+'.glb';
      fs.access(file, fs.F_OK, (err: any) => {
        if (err) {
          
          const results = { success: false, results: "404 Badge model not found" };
          res.json(results);
          return
        }
        res.download(file); 
      })
    }
    else{
      const results = { success: false, results: "400 bad request" };
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * ...
   * @param 
   * @returns 
   */
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
  //=========================================================================================================//
  /**
   * ...
   * @param 
   * @returns 
   */
  users
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post('/users/login', cors(corsOptions), async (req: any, res: any) => {
    try {
      const bcrypt = require('bcryptjs')

      let query = req.query;
      const client = await pool.connect();
      
      if (req.body.username != null && req.body.password != null) {
        let uN=req.body.username;
        let uP = req.body.password;
        var result = await client.query(
          "SELECT * FROM GYM_USER " +
            "WHERE Username = '" +
            uN +"'"
            
        );
        if(result.rows == null) {
          res.status(404); 
          res.json( { 'success': false, 'results':'invalid username or password'} );
          client.release();
        }
        else {
          if(result.rows.length==0) {
            res.status(404);
            res.json( { 'success': false, 'results':'invalid username or password'} );
            client.release();
          }
          else{
            let hashPass = result.rows[0].password;
            if(!bcrypt.compareSync(uP, hashPass)) {
              res.status(400);
              res.json( { 'success': false, 'results':"invalid password" } );
              client.release();
            }else{
              const results = { 'success': true, 'results': (result) ? result.rows : null};
              res.json( results );
              client.release();
            }
          }
        
        }
    }else {
      res.status(400);
      res.json(  { 'success': false, 'results':'missing username or password'} );
      client.release();
    }

    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
      
    }
  })
  //=========================================================================================================//
  /**
   * ...
   * @param 
   * @returns 
   */
  users
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post('/users/user', cors(corsOptions), async (req: any, res: any) => {
    try {
      
      const bcrypt = require('bcryptjs')
      let query = req.body;
      const client = await pool.connect();
      let result = await client.query("INSERT INTO GYM_USER"+
      "(email,name,surname,number,username,password) VALUES"+
      "('"+query.email+"','"+query.name+"','"+query.surname+"','"+query.number+"','"+query.username+"','"+bcrypt.hashSync(query.password, bcrypt.genSaltSync())+"')");
      const results = { 'success': true, 'results': (result) ? result.rows : null};
      res.json( {results,query} );
      client.release();
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
export {users}