import { gymRepository } from "../repositories/gym.repository";
import { ownedRepository } from "../repositories/gym_owned.repository";
import { ownerRepository } from "../repositories/gym_owner.repository";

const express = require("express");
const cors = require("cors");
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
   * POST - Insert that a gym into database.
   * @param {string} gymBrandName gym brand name.
   * @param {string} gymAddress gym address.
   * @param {number} gymCoordLong Longitude coord of gym.
   * @param {number} gymCoordLat Latitude coord of gym.
   * @param {string} gymIcon gym icon code.
   * @returns message confirming the insertion.
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post("/gyms/gym", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let ID = createID(4);
      let result = await gymRepository.saveGym(ID,query.gymBrandName,query.gymAddress,query.gymCoordLat,query.gymCoordLong,query.gymIcon);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * POST - Insert that a gym owner into database.
   * @param {string} email owner email.
   * @param {string} name owner name.
   * @param {string} surname owner surname.
   * @param {string} number owner number.
   * @param {string} username owner username.
   * @param {string} password owner password.
   * @returns message confirming the insertion.
   */
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post("/owners/owner", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let result = await ownerRepository.saveOwner(query.email,query.name,query.surname,query.number,query.username,query.password);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
export {owners};
