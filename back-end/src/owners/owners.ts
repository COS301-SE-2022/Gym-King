import { badgeRepository } from "../repositories/badge.repository";
import { badgeClaimRepository } from "../repositories/badge_claim.repository";
import { badgeOwnedRepository } from "../repositories/badge_owned.repository";
import { gymRepository } from "../repositories/gym.repository";
import { employeeRepository } from "../repositories/gym_employee.repository";
import { gymOwnedRepository } from "../repositories/gym_owned.repository";
import { ownerRepository } from "../repositories/gym_owner.repository";
import { ownerOTPRepository } from "../repositories/owner_otp.repository";
import { storageRef } from "../firebase.connection";

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require('multer');
const ownerpicture = multer();
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

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
// OWNER ROUTER
//=============================================================================================//
const owners = express.Router()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
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
   * GET a owners profile picture.
   * @param {string} email employee email.
   * @returns {image} 
   */
   .get('/owners/owner/picture/:email', cors(corsOptions), async(req: any, res: any)=>{
    const query = req.params.email;
    const owner = await ownerRepository.findByEmail(query);
    if (owner != null){
      res.json(owner.profile_picture);
    } else{
      res.json({'message':'Invalid email!'})
    }
  })
  //=========================================================================================================//
  /**
   * POST - Insert that a owner owns a gym.
   * @param {string} gid gym ID of the gym.
   * @param {string} email email of the owner.
   * @returns message confirming the insertion.
   */
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
  .post("/owners/owner", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      if (query.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      {
        let result = await ownerRepository.saveOwner(query.email,query.name,query.surname,query.number,query.username,query.password);
        res.json({'success':true});
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
   * POST - create OTP for owner.
   * @param {string} email email of owner.
   * @returns message indicating creation
   */
   .post('/owners/owner/OTP', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      if (query.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      {
        let owner = await ownerRepository.findByEmail(query.email);
        if(owner != null && owner.email == query.email)
        {
          let result = await ownerOTPRepository.deleteOwnerOTP(query.email);
          const newOTP = createID2(6);
          result = await ownerOTPRepository.saveOwnerOTP(query.email,newOTP);
          const emailerOptions = {
            from: process.env.EMAIL,
            to: owner.email,
            subject: "GYMKING Owner OTP",
            text: 'Hello there, '
            +owner.name+' '+owner.surname+
            '!\nThis is an email notifying you of the creation of an OTP for your account.\n'+
            'Your OTP is: '+newOTP+'\n'+
            'This OTP will only be valid for 5 minutes!\n'+
            'If this was not you please ignore this email!'
          }
          if (query.email != 'owner@example.com'){
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
          res.json({ 'success': false ,'message':'Owner does not exist!' });
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
   * POST - Get an owner's information.
   * @param {string} email owner's email.
   * @param {string} password owner's password.
   * @returns owner information.
   */
   .post('/owners/owner/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      const bcrypt = require('bcryptjs')
      let query = req.body;
      const owner = await ownerRepository.findByEmail(query.email);
      if (owner != null && bcrypt.compareSync(query.password, owner.password)) {
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
   * PUT update a owner user profile picture.
   * @param {string} email The email of the owner.
   * @param {string} password The password the owner (NOT ecrypted).
   * @param {file} profilepicture the picture.
   * @returns message informing successful update.
   */
   .put('/owners/owner/picture', ownerpicture.single('profilepicture'), cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const file = req.file;
      const bcrypt = require('bcryptjs')
      const owner = await ownerRepository.findByEmail(query.email);
      let oldFileName = '';
      if (owner.profile_picture != null && owner.profile_picture.includes('/')){
        oldFileName = owner.profile_picture.split('/');
        if (oldFileName.length == 5){
          oldFileName = oldFileName[4];
          oldFileName = oldFileName.replace('%2F','/')
        }
        else{
          oldFileName = 'empty';
        }
      }
      else {
        oldFileName = 'empty';
      }
      if (owner != null && bcrypt.compareSync(query.password, owner.password)) {
        await storageRef.file(oldFileName).delete({ignoreNotFound: true});
        let newFileName = ``;
        if (file.mimetype == 'image/jpeg'){
          newFileName = `owners/${Date.now()}.jpg`;
        }
        else if (file.mimetype == 'image/png') {
          newFileName = `owners/${Date.now()}.png`;
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
          await ownerRepository.updateOwnerProfilePicture(owner.email,storageRef.file(newFileName).publicUrl());
          res.json({'success':true});
        });
        blobStream.end(req.file.buffer);
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
   * PUT update a gym owner.
   * @param {string} email The email of the owner.
   * @param {string} name The name of the owner.
   * @param {string} surname The surname of the owner. 
   * @param {string} number The phone number of the owner. 
   * @param {string} username The username the owner.
   * @param {string} password The password the owner (NOT ecrypted).
   * @returns Returns params of completed insertion.
   */
   .put('/owners/owner/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const bcrypt = require('bcryptjs')
      const owner = await ownerRepository.findByEmail(query.email);
      if (owner != null && bcrypt.compareSync(query.password, owner.password)) {
        const result = await ownerRepository.updateOwner(query.email,query.name,query.surname,query.number,query.username);
        res.json({'success':true});
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
   * put - update a gym.
   * @param {string} gid gym id
   * @param {string} brandname gym name
   * @param {string} address gym address
   * @param {string} lat gym lat coordinates
   * @param {string} long gym long coordinates
   * @param {string} icon gym icon
   * @returns message confirming deletion.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .put("/owner/gym/info", cors(corsOptions), async (req: any, res: any) => {
     try {
       let query = req.body;
       let result = await gymRepository.updateGym(query.gid, query.brandname, query.address, query.lat, query.long, query.icon)
        res.json({'success':true});
     } catch (err) {
       const results = { success: false, results: err };
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
   .put('/owners/owner/password', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      if (query.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      {
        const owner = await ownerRepository.findByEmail(query.email);
        const otp = await ownerOTPRepository.findByEmail(query.email);
        if (otp != null && otp.otp == query.otp && (new Date().getTime() - new Date(otp.otptimestamp).getTime())*0.001/60 < 5) {
          const result = await ownerRepository.updateOwnerPassword(owner.email, query.newpassword);
          const otp = await ownerOTPRepository.deleteOwnerOTP(query.email);
          res.json({ 'success': true });
        }
        else {
          res.json({'message':'Invalid email or OTP!'})
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
   * DELETE - Delete a gym.
   * @param {string} email unique owner email used to delete the gym.
   * @param {string} password owner password.
   * @param {string} gid gym id
   * @returns message confirming deletion.
   */
  .use(bodyParser.urlencoded({extended:true}))
  .use(bodyParser.json())
  .delete("/owner/delete/gym",cors(corsOptions),async(req:any,res:any)=>{
    try{
      let query=req.body;
      const bcrypt=require('bcryptjs')
      const owner = await ownerRepository.findByEmail(query.email)
      if(owner != null && bcrypt.compareSync(query.password,owner.password)) {
        let result;
        result=await badgeRepository.findByGID(query.gid);
        let badges=result;
        badges.forEach(async badge=> {
          result= await badgeOwnedRepository.deleteAllOwnedByBID(badge.b_id)
          result= await badgeClaimRepository.deleteAllClaimsByBID(badge.b_id)
        });
        result= await gymOwnedRepository.deleteAllByGID(query.gid);
        result=await employeeRepository.deleteEmployeeByGID(query.gid);
        result=await badgeRepository.deleteBadgeByGID(query.gid)
        result=await gymRepository.deleteGym(query.gid)
        res.json({'success':true})
      }
      else {
        res.json({'message':'Invalid email or password!'})
      }
    }
    catch (err) 
    {
      const results = { success: false, results: err };
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
   .delete('/owners/delete', cors(corsOptions), async (req: any, res: any) => {
     try {
       let query = req.body;
       const bcrypt = require('bcryptjs')
       const owner = await ownerRepository.findByEmail(query.email);
       let oldFileName = '';
      if (owner != null && owner.profile_picture != null && owner.profile_picture.includes('/')){
        oldFileName = owner.profile_picture.split('/');
        if (oldFileName.length == 5){
          oldFileName = oldFileName[4];
          oldFileName = oldFileName.replace('%2F','/')
        }
        else{
          oldFileName = 'empty';
        }
      }
      else {
        oldFileName = 'empty';
      }
      if (owner != null && bcrypt.compareSync(query.password, owner.password)) {
        await storageRef.file(oldFileName).delete({ignoreNotFound: true});
        let result = await gymOwnedRepository.deleteAllByEmail(owner.email);
        result = await ownerOTPRepository.deleteOwnerOTP(owner.email);
        result = await ownerRepository.deleteOwner(owner.email);
        res.json({ 'success': true });
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
