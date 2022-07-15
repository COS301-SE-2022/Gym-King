import { gym_owned } from "../entities/gym_owned.entity";
import { ownedRepository } from "../repositories/gym_owned.repository";

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bodyParser = require('body-parser');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8100'
];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};
const pool = (() => {
  if (process.env.NODE_ENV !== "production") {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } else {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
})();
//=============================================================================================//
//Helper Functions 
//=============================================================================================//
//=========================================================================================================//
  /**
   * Makes a generated ID given a size input.
   * @param {number} size of the generated ID.
   * @returns {string} Generated ID.
   */
function createID(length: any) {
  let ID = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 62));
  }
  return ID;
}
//=============================================================================================//
// OWNER ROUTER
//=============================================================================================//
const owners = express.Router()
  .options("*", cors(corsOptions))
  //=========================================================================================================//
  /**
   * GET - gets all gyms owned by a owner.
   * @param {string} email email of the owner.
   * @returns List of all gyms that the owner owns.
   */
  .get("/gyms/owned/:email", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.params.email;
      let result = await ownedRepository.findGymsByEmail(query);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * POST - Insert that a owner owns a gym.
   * @param {string} gid gym ID of the gym.
   * @param {string} email email of the owner.
   * @returns message confirming the insertion.
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post("/gyms/owned", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let result = await ownedRepository.saveOwned(query.gid,query.email);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
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
  .post("/gyms/gym", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let ID = createID(4);
      let result = await client.query(
        "INSERT INTO GYM" +
          "(G_ID,Gym_BrandName,Gym_Address,Gym_Coord_Long,Gym_Coord_Lat,Gym_Icon) VALUES" +
          "('" +
          ID +
          "','" +
          query.gbn +
          "','" +
          query.ga +
          "','" +
          query.gclo +
          "','" +
          query.gcla +
          "','" +
          query.gi +
          "')"
      );
      const results = { success: true, results: result ? result.rows : null };
      query.gid = ID;
      res.json(query);
      client.release();
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
   //=========================================================================================================//
  /**
   * POST request to add an owner to the db
   * encrypts user's password
   * 
   * @param {Owner Info}
   * @returns http response packet
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post("/owners/owner", cors(corsOptions), async (req: any, res: any) => {
    try {
      const bcrypt = require('bcryptjs')
      let query = req.body;
      const client = await pool.connect();
      let result = await client.query(
        "INSERT INTO GYM_OWNER" +
          "(email,name,surname,number,username,password) VALUES" +
          "('" +
          query.email +
          "','" +
          query.name +
          "','" +
          query.surname +
          "','" +
          query.number +
          "','" +
          query.username +
          "','" +
          bcrypt.hashSync(query.password, bcrypt.genSaltSync()) +
          "')"
      );
      const results = { success: true, results: result ? result.rows : null };
      res.json({ results, query });
      client.release();
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
export {owners};
