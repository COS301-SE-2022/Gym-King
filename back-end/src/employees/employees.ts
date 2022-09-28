import { employeeRepository } from "../repositories/gym_employee.repository";
import { badgeClaimRepository } from "../repositories/badge_claim.repository";
import { badgeOwnedRepository } from "../repositories/badge_owned.repository";
import { badgeRepository } from "../repositories/badge.repository";
import { employeeOTPRepository } from "../repositories/employee_otp.repository";
import { firebase_admin } from "../firebase.connection";
import { ownerRepository } from "../repositories/gym_owner.repository";
import { ownerOTPRepository } from "../repositories/owner_otp.repository";

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require('multer');
const employeepicture = multer();
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const storageRef = firebase_admin.storage().bucket(process.env.FIREBASE_DB_URL)
//=============================================================================================//
//Nodemailer email connection 
//=============================================================================================//
var emailer = nodemailer.createTransport({
  tls: {
    rejectUnauthorized: false
  },
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
  'http://localhost:3000',
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
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw()) 
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
      let claims = await badgeClaimRepository.findByGID(query);
      res.json(claims);
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * POST - return claim of a user and a badge.
   * @param {string} empEmail employee email.
   * @param {string} apikey employee api key.
   * @param {string} bid badge ID used to find claim.
   * @param {string} email email used to find claim.
   * @returns A claim made by user for badge.
   */
   .post("/claims/claim/getClaim", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      const employee = await employeeRepository.findByEmail(query.empEmail);
      if (employee != null && employee.apikey == query.apikey) {
        let result = await badgeClaimRepository.findByBIDandEmail(query.bid, query.email);
        res.json(result);
      }
      else {
        res.json({'message':'Invalid email or apikey!'})
      }
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * GET a employees profile picture.
   * @param {string} username employee email.
   * @returns {image} 
   */
   .get('/employees/employee/picture/:username', cors(corsOptions), async(req: any, res: any)=>{
    const query = req.params.username;
    const employee = await employeeRepository.findByUsername(query);
    if (employee != null){
      res.json(employee.profile_picture);
    } else{
      res.json({'message':'Invalid username!'})
    }
  })
  //=========================================================================================================//
  /**
   * POST - Insert an employee.
   * @param {string} ownerEmail owner email.
   * @param {string} apikey owner api key.
   * @param {string} email employee email.
   * @param {string} fullname The full name of employee.
   * @param {string} number phone number.
   * @param {string} username username.
   * @param {string} password Password.
   * @param {string} gid gym ID.
   * @returns Message confirming insertion.
   */
   .post("/employees/employee", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      if (query.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && query.ownerEmail.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      {
        const owner = await ownerRepository.findByEmail(query.ownerEmail);
        if (owner != null && owner.apikey == query.apikey) {
          let result = await employeeRepository.saveEmployee(query.email,query.fullname,query.number,query.username,query.password,query.gid);
          res.json({'success':true});
        }
        else {
          res.json({'message':'Invalid email or apikey!'})
        }
      } else {
        res.json({'success':false, 'message':'Invalid email entered!'})
      }
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * POST - Insert a badge into the database.
   * @param {string} email employee or owner email.
   * @param {string} apikey employee api key.
   * @param {string} gid gym ID for badge.
   * @param {string} badgename badge name.
   * @param {string} badgedescription badge description.
   * @param {string} badgechallenge badge challenge.
   * @param {string} badgeicon Icon for badge.
   * @param {string} requirement1 requirement 1 for badge.
   * @param {string} requirement2 requirement 2 for badge.
   * @param {string} requirement3 requirement 3 for badge.
   * @param {string} activitytype Activity type.
   * @param {string[]} tags list of tags.
   * @returns message confirming.
   */
  .post("/badges/badge", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let employee = await employeeRepository.findByEmail(query.email)
      let owner = await ownerRepository.findByEmail(query.email)
      if (employee != null && employee.apikey == query.apikey || owner != null && owner.apikey == query.apikey) {
        let ID = createID(3);
        let result = await badgeRepository.saveBadge(ID,query.gid,query.badgename,query.badgedescription,query.badgechallenge,query.activitytype,query.requirement1,query.requirement2,query.requirement3,query.badgeicon,query.tags);
        res.json(result);
      }
      else {
        res.json({'message':'Invalid email or apikey!'})
      }
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
   .post('/employees/employee/OTP', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      if (query.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      {
        let employeee = await employeeRepository.findByEmail(query.email);
        if(employeee != null && employeee.email == query.email)
        {
          let result = await employeeOTPRepository.deleteEmployeeOTP(query.email);
          const newOTP = createID2(6);
          result = await employeeOTPRepository.saveEmployeeOTP(query.email,newOTP);
          const emailerOptions = {
            from: process.env.EMAIL,
            to: employeee.email,
            subject: "GYMKING Employee OTP",
            text: 'Hello there, '
            +employeee.fullname+'!'+
            '!\nThis is an email notifying you of the creation of an OTP for your account.\n'+
            'Your OTP is: '+newOTP+'\n'+
            'This OTP will only be valid for 5 minutes!\n'+
            'If this was not you please ignore this email!'
          }
          if (query.email != 'test@example.com'){
            emailer.sendMail(emailerOptions, function(error : any, info : any){
              if(error) {
                console.log(error);
                res.json({'success': false, 'message': 'OTP email failed to send!'})
              } else {
                res.json({ 'success': true });
              }
            })
          } else {
            res.json({ 'success': true });
          }
        } else {
          res.json({ 'success': false ,'message':'Employee does not exist!' });
        }
      } else {
        res.json({'success':false, 'message':'Invalid email entered!'})
      }
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
   * @param {string} apikey employee's api key.
   * @returns employee information.
   */
   .post('/employees/employee/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      const employee = await employeeRepository.findByEmail(query.email);
      if (employee != null && employee.apikey == query.apikey) {
        res.json(employee)
      }
      else {
        res.json({'message':'Invalid email or apikey!'})
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
   .put('/employees/employee/password', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      if (query.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      {
        const employee = await employeeRepository.findByEmail(query.email);
        const otp = await employeeOTPRepository.findByEmail(query.email);
        if (otp != null && otp.otp == query.otp && (new Date().getTime() - new Date(otp.otptimestamp).getTime())*0.001/60 < 5) {
          const result = await employeeRepository.updateEmployeePassword(employee.email, query.newpassword);
          const otp = await employeeOTPRepository.deleteEmployeeOTP(query.email);
          res.json({ 'success': true });
        }
        else {
          res.json({'message':'Invalid email or OTP!'});
        }
      } else {
        res.json({'message':'Invalid email!'});
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
   * @param {string} fullname The full name of the employee.
   * @param {string} number The phone number of the employee. 
   * @param {string} username The username the employee.
   * @param {string} apikey The api key the employee.
   * @returns Returns params of completed insertion.
   */
   .put('/employees/employee/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const employee = await employeeRepository.findByEmail(query.email);
      if (employee != null && employee.apikey == query.apikey) {
        const result = await employeeRepository.updateEmployee(query.email,query.fullname,query.number,query.username);
        res.json({'success':true});
      }
      else {
        res.json({'message':'Invalid email or apikey!'})
      }
    }catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * PUT update a employee user profile picture.
   * @param {string} email The email of the employee.
   * @param {string} apikey The api key of the employee (NOT ecrypted).
   * @param {file} profilepicture the picture.
   * @returns message informing successful update.
   */
   .put('/employees/employee/picture', employeepicture.single('profilepicture'), cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const file = req.file;
      const employee = await employeeRepository.findByEmail(query.email);
      let oldFileName = '';
      if (employee.profile_picture != null && employee.profile_picture.includes('/')){
        oldFileName = employee.profile_picture.split('/');
        if (oldFileName.length == 5){
          oldFileName = oldFileName[4];
          oldFileName = oldFileName.replace(/%2F/g,'/')
        }
        else{
          oldFileName = 'empty';
        }
      }
      else {
        oldFileName = 'empty';
      }
      if (employee != null && employee.apikey == query.apikey) {
        await storageRef.file(oldFileName).delete({ignoreNotFound: true});
        let newFileName = ``;
        if (file.mimetype == 'image/jpeg'){
          newFileName = `employees/${Date.now()}.jpg`;
        }
        else if (file.mimetype == 'image/png') {
          newFileName = `employees/${Date.now()}.png`;
        }
        else {
          res.json({'message':'Invalid file type.'})
          return;
        }
        const blob = storageRef.file(newFileName);
        const blobStream = blob.createWriteStream({
          resumable: false,
          metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
          }
        });
        blobStream.on('error', err => {
          res.json({'success':false})
        });
        blobStream.on('finish', async () => {
          await storageRef.file(newFileName).makePublic();
          await employeeRepository.updateEmployeeProfilePicture(employee.email,storageRef.file(newFileName).publicUrl());
          res.json({'success':true});
        });
        blobStream.end(req.file.buffer);
      }
      else {
        res.json({'message':'Invalid email or apikey!'})
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
   * @param {string} empEmail employee email.
   * @param {string} apikey employee api key.
   * @param {string} bid badge ID used to find badge.
   * @param {string} email email used to find the user.
   * @returns The badge_owned inserted or error message.
   */
  .put("/claims/claim", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let employee = await employeeRepository.findByEmail(query.empEmail);
      let result = await badgeClaimRepository.findByBIDandEmail(query.bid, query.email);
      if (employee != null && employee.apikey == query.apikey) {
        const ret = result;
        if (ret != null && ret.email == query.email && ret.b_id.b_id == query.bid){
          let oldFileName = '';
          if (ret.proof != null && ret.proof.includes('/')){
            oldFileName = ret.proof.split('/');
            if (oldFileName.length == 5){
              oldFileName = oldFileName[4];
              oldFileName = oldFileName.replace(/%2F/g,'/')
            }
            else{
              oldFileName = 'empty';
            }
          }
          else {
            oldFileName = 'empty';
          }
          await storageRef.file(oldFileName).delete({ignoreNotFound: true});
          result = await badgeClaimRepository.deleteClaim(ret.b_id.b_id, ret.email);
          result = await badgeOwnedRepository.findByBIDandEmail(ret.b_id.b_id,ret.email);
          if (result != null) {
            result = await badgeOwnedRepository.updateByBIDandEmail(ret.b_id.b_id,ret.email,ret.input1,ret.input2,ret.input3);
          } else {
            result = await badgeOwnedRepository.saveOwned(ret.b_id.b_id,ret.email,ret.username,ret.input1,ret.input2,ret.input3);
          }
          res.json({'success':true});
        }
        else {
          res.json({'message': 'Claim does not exist.'})
        }
      } else {
        res.json({'message':'Invalid email or apikey!'})
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
   * @param {string} email employee or owner email.
   * @param {string} apikey employee api key.
   * @param {string} bid badge ID used to find badge.
   * @param {string} gid gym ID of the badge.
   * @param {string} badgename edited badgename.
   * @param {string} badgedescription edited badgedescription.
   * @param {string} badgechallenge edited badgechallenge.
   * @param {string} activitytype edited activitytype.
   * @param {string} requirement1 edited requirement 1 for badge.
   * @param {string} requirement2 edited requirement 2 for badge.
   * @param {string} requirement3 edited requirement 3 for badge.
   * @param {string} badgeicon edited badgeicon.
   * @param {string[]} tags new list of tags.
   * @returns Message confirming update.
   */
  .put("/badges/badge", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let employee = await employeeRepository.findByEmail(query.email);
      let owner = await ownerRepository.findByEmail(query.email);
      if (employee != null && employee.apikey == query.apikey || owner != null && owner.apikey == query.apikey) {
        let result = await badgeRepository.updateBadge(query.bid,query.gid,query.badgename,query.badgedescription,query.badgechallenge,query.activitytype,query.requirement1,query.requirement2,query.requirement3,query.badgeicon,query.tags);
        res.json({'success':true});
      } else {
        res.json({'message':'Invalid email or apikey!'})
      }
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * DELETE - Delete a badge.
   * @param {string} email employee email.
   * @param {string} apikey employee api key.
   * @param {string} bid badge ID used to find badge.
   * @returns Message confirming Deletion.
   */
  .delete("/badges/badge", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let employee = await employeeRepository.findByEmail(query.email);
      let owner = await ownerRepository.findByEmail(query.email);
      if (employee != null && employee.apikey == query.apikey || owner != null && owner.apikey == query.apikey) {
        let result = await badgeClaimRepository.deleteAllClaimsByBID(query.bid);
        result = await badgeOwnedRepository.deleteAllOwnedByBID(query.bid);
        result = await badgeRepository.deleteBadge(query.bid);
        res.json({'success':true});
      } else {
        res.json({'message':'Invalid email or apikey!'})
      }
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * DELETE - Delete a claim.
   * @param {string} empEmail employee email.
   * @param {string} apikey employee api key.
   * @param {string} bid unique bid used to delete the claim.
   * @param {string} email unique email used to delete the claim.
   * @returns message confirming deletion.
   */
  .delete("/claims/claim", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let employee = await employeeRepository.findByEmail(query.empEmail);
      console.log(employee);
      console.log(query);
      if (employee != null && employee.apikey == query.apikey) {
        let claim = await badgeClaimRepository.findByBIDandEmail(query.bid, query.email);
        if (claim != null && claim.email == query.email && claim.b_id.b_id == query.bid){
          let oldFileName = '';
          if (claim.proof != null && claim.proof.includes('/')){
            oldFileName = claim.proof.split('/');
            if (oldFileName.length == 5){
              oldFileName = oldFileName[4];
              oldFileName = oldFileName.replace(/%2F/g,'/')
            }
            else{
              oldFileName = 'empty';
            }
          }
          else {
            oldFileName = 'empty';
          }
          await storageRef.file(oldFileName).delete({ignoreNotFound: true});
          await badgeClaimRepository.deleteClaim(query.bid,query.email);
          res.json({'success':true})
        }
        else{
          res.json({'message':'Invalid email or badge ID!'})
        }
      } else {
        res.json({'message':'Invalid email or apikey!'})
      }
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * DELETE - Delete an employee.
   * @param {string} owneremail owner email.
   * @param {string} apikey owner's api key.
   * @param {string} employeeemail employee email.
   * @returns message confirming deletion.
   */
   .delete("/employees/employee", cors(corsOptions), async (req: any, res: any) => {
     try {
      let query = req.body;
      const employee = await employeeRepository.findByEmail(query.employeeemail);
      const owner = await ownerRepository.findByEmail(query.owneremail);
      let oldFileName = '';
      if (employee.profile_picture != null && employee.profile_picture.includes('/')){
        oldFileName = employee.profile_picture.split('/');
        if (oldFileName.length == 5){
          oldFileName = oldFileName[4];
          oldFileName = oldFileName.replace(/%2F/g,'/')
        }
        else{
          oldFileName = 'empty';
        }
      }
      else {
        oldFileName = 'empty';
      }
      if (owner != null && owner.apikey == query.apikey) {
        await storageRef.file(oldFileName).delete({ignoreNotFound: true});
        let result = await employeeOTPRepository.deleteEmployeeOTP(employee.email);
        result = await employeeRepository.deleteEmployee(employee.email);
        const results = { 'success': true };
        res.json(results);
      }
      else {
        res.json({'message':'Invalid email or apikey!'})
      }
     } catch (err) {
       const results = { success: false, results: err };
       console.error(err);
       res.json(results);
     }
   })
export {employees};
