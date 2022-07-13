import { badgeRepository } from "../repositories/badge.repository";
import { badgeClaimRepository } from "../repositories/badge_claim.repository";
import { gymRepository } from "../repositories/gym.repository";
import { userRepository } from "../repositories/gym_user.repository";

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const fs = require('fs');

//=============================================================================================//
//Helper Functions 
//=============================================================================================//

  //=========================================================================================================//
  /**
   * Helper functions to get the distance between two coordinates
   * @param {float} lat1
   * @param {float} lon1
   * @param {float} lat2
   * @param {float} lon2
   * @returns {float} distance between points 
   */
  function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number)  
  {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var latNew1 = toRad(lat1);
    var latNew2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latNew1) * Math.cos(latNew2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }
  //=========================================================================================================//
  /**
   * Converts numeric degrees to radians
   * @param {float} Value a value in degree format
   * @returns {float} value in radians
   */
  function toRad(Value) 
  {
      return Value * Math.PI / 180;
  }



//=============================================================================================//
// USER API
//=============================================================================================//
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
  //=========================================================================================================//
  /**
   * GET - returns all badges with input of * or returns the specific badge from b_id.
   * @param {string} bid give badge ID for specific badge or * for all badges.
   * @returns A list with information on all badges or specific badge.
   */
  .get('/badges/badge/:bid', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.params.bid;
      if (query == "*") {
        const result = await badgeRepository.findAll();
        res.json( result );
      } else {
        const result = await badgeRepository.findByBID(query);
        res.json( result );
      }
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * GET - returns all badges that belong to a specific gym.
   * @param {string} gid input of the gym ID to find all badges that belong to gym.
   * @returns A list with information on all badges that belong to gym.
   */
  .get('/badges/gym/:gid', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.params.gid;
      const result = await badgeRepository.findByGID(query)
      res.json( result );
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * GET - return gym information from giving its gym ID
   * @param {string} gid input of the gym ID to find gym.
   * @return Information on gym found by ID.
   */
  .get('/gyms/gym/:gid', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.params.gid;
      const result = await gymRepository.findByGID(query)
      res.json( result );
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
  .get('/Model/iOS/AR0', cors(corsOptions), async(req: any, res: any)=>{
      const file = './src/assets/models/AR0.usdz';
      fs.access(file, fs.F_OK, (err: any) => {
        if (err) {
          
          const results = { success: false, results: "404 Badge model not found" };
          res.json(results);
          return
        }
        res.download(file); 
      })
    
  })
  //=========================================================================================================//
  /**
   * GET to get badge model by its name for Android
   * @param {string} id The name of the badge model
   * @returns {GLB file}
   */
  .get('/Model/Android/AR0', cors(corsOptions), async(req: any, res: any)=>{

      const file = './src/assets/models/concept.glb';
      fs.access(file, fs.F_OK, (err: any) => {
        if (err) {
          
          const results = { success: false, results: "404 Badge model not found" };
          res.json(results);
          return
        }
        res.download(file); 
      })

  })
  //=========================================================================================================//
  /**
   * POST save a users claim for a badge to database.
   * @param {string} bid The badge ID of the badge.
   * @param {string} email The email of the user who claims they completed it.
   * @param {string} username The username of the user who claims they completed it.
   * @param {string} input1 The first input 
   * @param {string} input2 The second input 
   * @param {string} input3 The third input 
   * @param {string} proof The code of the image used to find the proof.
   * @returns Returns params of completed insertion.
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .post('/claims/claim', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let result = await badgeClaimRepository.saveClaim(query.bid, query.email, query.username, query.input1, query.input2, query.input3, query.proof)
      res.json( result );
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

      let query = req.body;
      const client = await pool.connect();
      
      if (query.username != null && query.password != null && query.usertype != null) {
        
        let uT = query.usertype;
        if(query.usertype !== "gym_owner" && query.usertype !== "gym_employee"){
          uT="gym_user";
        }
        let uN=query.username;
        let uP = query.password;
        var result = await client.query(
          "SELECT * FROM "+uT +
            " WHERE Username = '" +
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
   * POST save a gym user to the database.
   * @param {string} email The email of the user.
   * @param {string} name The name of the user.
   * @param {string} surname The surname of the user. 
   * @param {string} number The phone number of the user. 
   * @param {string} username The username the user created.
   * @param {string} password The password the user created (NOT ecrypted).
   * @returns Returns params of completed insertion.
   */
  users
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post('/users/user', cors(corsOptions), async (req: any, res: any) => {
    try {
      const result = await userRepository.saveUser(req.body.email,req.body.name,req.body.surname,req.body.number,req.body.username,req.body.password);
      const results = { 'success': true, 'results': (result) ? result.rows : null};
      res.json( {results, body: req.body} );
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * POST - returns all gyms within a certain radius of the user
   * @param {string} latCoord latitude of user
   * @param {string} longCoord longitude of user
   * @param {string} radius circle radius in KM to check for gyms
   * @returns a list of gyms and their locations
   */
  users
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post('/gyms/aroundme', cors(corsOptions), async (req: any, res: any) => {
    try {
      if (req.body.latCoord != null && req.body.longCoord != null) {
        let lat = parseFloat(req.body.latCoord);
        let long = parseFloat(req.body.longCoord);
        let rad = 20.0;
        if(req.body.radius != null) {rad = parseFloat(req.body.radius) }
        // SQL statement to get all gyms
        let outGyms = [];
        var gyms = await gymRepository.findAll();
        gyms.forEach(element => {
          // get magnitde between user and each gym coordinate
          let magnitude = calcCrow(lat,long,element.gym_coord_lat,element.gym_coord_long);
          // If magnitude is within radius then add it to the results
          if(magnitude <= rad){
            outGyms.push(element);
          }
        });
        const results = { 'success': true, 'results': outGyms };
        res.json(results);
      }else {
        res.status(400);
        res.json(  { 'success': false, 'results':'user coordinates not given'} );
      }
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * DELETE - Delete a user.
   * @param {string} email unique email used to delete the user.
   * @returns message confirming deletion.
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .delete('/users/delete', cors(corsOptions), async (req: any, res: any) => {
    const result = await userRepository.deleteUser(req.body.email)  
    res.json(result)
  })
  
export {users}
