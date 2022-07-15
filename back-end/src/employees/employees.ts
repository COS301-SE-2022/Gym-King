import { badgeRepository } from "../repositories/badge.repository";
import { badgeClaimRepository } from "../repositories/badge_claim.repository";
import { badgeOwnedRepository } from "../repositories/badge_owned.repository";

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const bodyParser = require('body-parser');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8100',
  'http://localhost:5000'
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
// EMPLOYEE ROUTER
//=============================================================================================//
const employees = express.Router()
  .options("*", cors(corsOptions))
  //=========================================================================================================//
  /**
   * GET - returns all claims from a specific gym.
   * @param {string} gid gym ID used to find claims.
   * @returns list of claims belonging to a gym.
   */
  .get("/claims/gym/:gid", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.params.gid;
      let result = await badgeClaimRepository.findByGID(query);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * GET - return claim of a user and a badge.
   * @param {string} bid badge ID used to find claim.
   * @param {string} email email used to find claim.
   * @returns A claim made by user for badge.
   */
   .get("/claims/claim", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      let result = await badgeClaimRepository.findByBIDandEmail(query.bid, query.email);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * POST - Insert a badge into the database.
   * @param {string} gid email used to find claim.
   * @param {string} badgename badge ID used to find claim.
   * @param {string} badgedescription email used to find claim.
   * @param {string} badgechallenge badge ID used to find claim.
   * @param {string} badgeicon email used to find claim.
   * @param {string} activitytype email used to find claim.
   * @returns A claim made by user for badge.
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post("/badges/badge", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let ID = createID(3);
      let result = await badgeRepository.saveBadge(ID,query.gid,query.badgename,query.badgedescription,query.badgechallenge,query.activitytype,query.badgeicon);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * PUT - Update accepted badge_claim to badge_owned.
   * @param {string} bid badge ID used to find badge.
   * @param {string} email email used to find the user.
   * @returns The badge_owned inserted or error message.
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .put("/claims/claim", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let result = await badgeClaimRepository.findByBIDandEmail(query.bid, query.email);
      const ret = result;
      if (ret != null){
        result = await badgeClaimRepository.deleteClaim(ret.b_id, ret.email);
        result = await badgeOwnedRepository.findByBIDandEmail(ret.b_id,ret.email);
        if (result != null) {
          result = await badgeOwnedRepository.updateByBIDandEmail(ret.b_id,ret.email,ret.username,ret.input1,ret.input2,ret.input3);
        } else {
          result = await badgeOwnedRepository.saveOwned(ret.b_id,ret.email,ret.username,ret.input1,ret.input2,ret.input3);
        }
        res.json(result);
      }
      else {
        res.status(404).json({'message': 'Claim does not exist.'})
      }
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * PUT - Update a badge.
   * @param {string} bid badge ID used to find badge.
   * @param {string} gid gym ID of the badge.
   * @param {string} badgename edited badgename.
   * @param {string} badgedescription edited badgedescription.
   * @param {string} badgechallenge edited badgechallenge.
   * @param {string} activitytype edited activitytype.
   * @param {string} badgeicon edited badgeicon.
   * @returns Message confirming update.
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .put("/badges/badge", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let result = await badgeRepository.updateBadge(query.bid,query.gid,query.badgename,query.badgedescription,query.badgechallenge,query.activitytype,query.badgeicon);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * DELETE - Delete a badge.
   * @param {string} bid badge ID used to find badge.
   * @returns Message confirming Deletion.
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .delete("/badges/badge", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let result = await badgeClaimRepository.deleteAllClaimsByBID(query.bid);
      result = await badgeOwnedRepository.deleteAllOwnedByBID(query.bid);
      result = await badgeRepository.deleteBadge(query.bid);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * DELETE - Delete a claim.
   * @param {string} bid unique bid used to delete the claim.
   * @param {string} email unique email used to delete the claim.
   * @returns message confirming deletion.
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .delete("/claims/claim", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let result = await badgeClaimRepository.deleteClaim(query.bid,query.email);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  });
  //=========================================================================================================//
  /**
   * POST request to add an employee to the db
   * encrypts user's password
   * 
   * @param {Employee Info}
   * @returns http response packet
   */
  employees
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())

   .post("/users/useremp", cors(corsOptions), async (req: any, res: any) => {
    try {
      const bcrypt = require('bcryptjs')
      let query = req.body;
      const client = await pool.connect();
      let result = await client.query(
        "INSERT INTO GYM_EMPLOYEE" +
          "(email,g_id,name,surname,number,username,password) VALUES" +
          "('" +
          query.email +
          "','" +
          query.gid +
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
export {employees};
