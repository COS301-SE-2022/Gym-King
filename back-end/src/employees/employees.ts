import { employeeRepository } from "../repositories/gym_employee.repository";
import { badgeClaimRepository } from "../repositories/badge_claim.repository";
import { badgeOwnedRepository } from "../repositories/badge_owned.repository";
import { badgeRepository } from "../repositories/badge.repository";
import { employeeOTPRepository } from "../repositories/employee_otp.repository";

const express = require("express");
const cors = require("cors");
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
   * POST - Insert an employee.
   * @param {string} email email.
   * @param {string} name name.
   * @param {string} surname surname.
   * @param {string} number phone number.
   * @param {string} username username.
   * @param {string} password Password.
   * @param {string} gid gym ID.
   * @returns Message confirming insertion.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .post("/employees/employee", cors(corsOptions), async (req: any, res: any) => {
     try {
       let query = req.body;
       let result = await employeeRepository.saveEmployee(query.email,query.name,query.surname,query.number,query.username,query.password,query.gid);
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
   * POST - create OTP for employee.
   * @param {string} email email of employee.
   * @returns message indicating creation
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .post('/employees/employee/OTP', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      let result = await employeeOTPRepository.deleteEmployeeOTP(query.email);
      const newOTP = createID2(6);
      result = await employeeOTPRepository.saveEmployeeOTP(query.email,newOTP);
      res.json(result);
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
   })
   //=========================================================================================================//
  /**
   * POST - Get an employee's information.
   * @param {string} email employee's email.
   * @param {string} password employee's password.
   * @returns employee information.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .post('/employees/employee/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      const bcrypt = require('bcryptjs')
      let query = req.body;
      const employee = await employeeRepository.findByEmail(query.email);
      if (bcrypt.compareSync(query.password, employee.password)) {
        res.json(employee)
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
   * PUT update an employee password.
   * @param {string} email The email of the employee. 
   * @param {string} otp OTP given by employee.
   * @param {string} newpassword New password.
   * @returns message informing successful update or not.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .put('/employees/employee/password', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const employee = await employeeRepository.findByEmail(query.email);
      const otp = await employeeOTPRepository.findByEmail(query.email);
      if (otp != null && otp.otp == query.otp) {
        const result = await employeeRepository.updateEmployeePassword(employee.email, query.newpassword);
        const otp = await employeeOTPRepository.deleteEmployeeOTP(query.email);
        res.json(result);
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
   * PUT update a gym employee.
   * @param {string} email The email of the employee.
   * @param {string} name The name of the employee.
   * @param {string} surname The surname of the employee. 
   * @param {string} number The phone number of the employee. 
   * @param {string} username The username the employee.
   * @param {string} password The password the employee (NOT ecrypted).
   * @returns Returns params of completed insertion.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .put('/employees/employee/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const bcrypt = require('bcryptjs')
      const employee = await employeeRepository.findByEmail(query.email);
      if (bcrypt.compareSync(query.password, employee.password)) {
        const result = await employeeRepository.updateEmployee(query.email,query.name,query.surname,query.number,query.username);
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
  })
  //=========================================================================================================//
  /**
   * DELETE - Delete an employee.
   * @param {string} email employee email.
   * @param {string} password employee password.
   * @returns message confirming deletion.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .delete("/employees/employee", cors(corsOptions), async (req: any, res: any) => {
     try {
      let query = req.body;
      const bcrypt = require('bcryptjs')
      const employee = await employeeRepository.findByEmail(query.email);
      if (bcrypt.compareSync(query.password, employee.password)) {
        const result = await employeeRepository.deleteEmployee(query.email);
        res.json(result);
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
export {employees};
