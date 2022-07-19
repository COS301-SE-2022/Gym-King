import { gymRepository } from "../repositories/gym.repository";
import { gymOwnedRepository } from "../repositories/gym_owned.repository";
import { ownerRepository } from "../repositories/gym_owner.repository";
import { ownerOTPRepository } from "../repositories/owner_otp.repository";

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
/**
   * Makes a generated ID given a size input.
   * @param {number} size of the generated ID.
   * @returns {string} Generated ID.
   */
 function createID2(length: any) {
  let ID = "";
  let characters =
    "0123456789";
  for (var i = 0; i < length; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 10));
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
   * GET - get all employees who fall under an owner of gym.
   * @param {string} email email of the owner.
   * @returns List of all employees who work for a gym owned by owner.
   */
   .get("/owners/employees/:email", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.params.email;
      let result = await ownerRepository.findEmployeesByOwnerEmail(query);
      res.json(result);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * GET - gets all gyms owned by a owner.
   * @param {string} email email of the owner.
   * @returns List of all gyms that the owner owns.
   */
  .get("/gyms/owned/:email", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.params.email;
      let result = await gymOwnedRepository.findGymsByEmail(query);
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
      let result = await gymOwnedRepository.saveOwned(query.gid,query.email);
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
  //=========================================================================================================//
  /**
   * POST - create OTP for owner.
   * @param {string} email email of owner.
   * @returns message indicating creation
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .post('/owners/owner/OTP', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      let result = await ownerOTPRepository.deleteOwnerOTP(query.email);
      const newOTP = createID2(6);
      result = await ownerOTPRepository.saveOwnerOTP(query.email,newOTP);
      const results = { 'success': true };
      res.json(results);
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
   })
   //=========================================================================================================//
  /**
   * POST - Get an owner's information.
   * @param {string} email owner's email.
   * @param {string} password owner's password.
   * @returns owner information.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .post('/owners/owner/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      const bcrypt = require('bcryptjs')
      let query = req.body;
      const owner = await ownerRepository.findByEmail(query.email);
      if (bcrypt.compareSync(query.password, owner.password)) {
        res.json(owner)
      }
      else {
        res.json({'message':'Invalid email or password!'})
      }
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
   })
   //=========================================================================================================//
  /**
   * PUT update a gym owner.
   * @param {string} email The email of the owner.
   * @param {string} name The name of the owner.
   * @param {string} surname The surname of the owner. 
   * @param {string} number The phone number of the owner. 
   * @param {string} username The username the owner.
   * @param {string} password The password the owner (NOT ecrypted).
   * @returns Returns params of completed insertion.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .put('/owners/owner/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const bcrypt = require('bcryptjs')
      const owner = await ownerRepository.findByEmail(query.email);
      if (bcrypt.compareSync(query.password, owner.password)) {
        const result = await ownerRepository.updateOwner(query.email,query.name,query.surname,query.number,query.username);
        res.json(result);
      }
      else {
        res.json({'message':'Invalid email or password!'})
      }
    }catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * PUT update an owner password.
   * @param {string} email The email of the owner. 
   * @param {string} otp OTP given by owner.
   * @param {string} newpassword New password.
   * @returns message informing successful update or not.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .put('/owners/owner/password', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const owner = await ownerRepository.findByEmail(query.email);
      const otp = await ownerOTPRepository.findByEmail(query.email);
      if (otp != null && otp.otp == query.otp) {
        const result = await ownerRepository.updateOwnerPassword(owner.email, query.newpassword);
        const otp = await ownerOTPRepository.deleteOwnerOTP(query.email);
        const results = { 'success': true };
        res.json(results);
      }
      else {
        res.json({'message':'Invalid email or OTP!'})
      }
    }catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * DELETE - Delete an owner.
   * @param {string} email unique email used to delete the owner.
   * @param {string} password owner password.
   * @returns message confirming deletion.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .delete('/owners/delete', cors(corsOptions), async (req: any, res: any) => {
     try {
       let query = req.body;
       const bcrypt = require('bcryptjs')
       const owner = await ownerRepository.findByEmail(query.email);
       if (bcrypt.compareSync(query.password, owner.password)) {
         let result = await gymOwnedRepository.deleteAllByEmail(owner.email);
         result = await ownerOTPRepository.deleteOwnerOTP(owner.email);
         result = await ownerRepository.deleteOwner(owner.email);
         const results = { 'success': true };
         res.json(results);
       }
       else {
         res.json({'message':'Invalid email or password!'})
       }
     } catch (err) {
       const results = { success: false, results: err };
       console.error(err);
       res.json(results);
     }
   })
export {owners};
