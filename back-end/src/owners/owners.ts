import { badgeRepository } from "../repositories/badge.repository";
import { badgeClaimRepository } from "../repositories/badge_claim.repository";
import { badgeOwnedRepository } from "../repositories/badge_owned.repository";
import { gymRepository } from "../repositories/gym.repository";
import { employeeRepository } from "../repositories/gym_employee.repository";
import { gymOwnedRepository } from "../repositories/gym_owned.repository";
import { ownerRepository } from "../repositories/gym_owner.repository";
import { ownerOTPRepository } from "../repositories/owner_otp.repository";
import { firebase_admin } from "../firebase.connection";
import { gymBrandRepository } from "../repositories/gym_brand.repository";

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require('multer');
const ownerpicture = multer();
const brandlogo = multer();
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
// OWNER ROUTER
//=============================================================================================//
const owners = express.Router()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .options("*", cors(corsOptions))
  //=========================================================================================================//
  /**
   * POST - get all employees who fall under an owner of gym.
   * @param {string} email email of the owner.
   * @param {string} apikey api key of the owner.
   * @returns List of all employees who work for a gym owned by owner.
   */
   .post("/owners/employees/", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let owner = await ownerRepository.findByEmail(query.email);
      if (owner != null && owner.apikey == query.apikey){
        let result = await ownerRepository.findEmployeesByOwnerEmail(query.email);
        res.json(result);
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
   * POST - gets all gyms owned by a owner.
   * @param {string} email email of the owner.
   * @param {string} apikey api key of the owner.
   * @returns List of all gyms that the owner owns.
   */
  .post("/gyms/owned/getGyms", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let owner = await ownerRepository.findByEmail(query.email);
      if (owner != null && owner.apikey == query.apikey){
        let result = await gymOwnedRepository.findGymsByEmail(query.email);
        res.json(result);
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
   * GET a owners profile picture.
   * @param {string} username owner username.
   * @returns {image} 
   */
   .get('/owners/owner/picture/:username', cors(corsOptions), async(req: any, res: any)=>{
    const query = req.params.username;
    const owner = await ownerRepository.findByUsername(query);
    if (owner != null){
      res.json(owner.profile_picture);
    } else{
      res.json({'message':'Invalid username!'})
    }
  })
  //=========================================================================================================//
  /**
   * POST - Insert that a owner owns a gym.
   * @param {string} gid gym ID of the gym.
   * @param {string} email email of the owner.
   * @param {string} apikey apikey of the owner.
   * @returns message confirming the insertion.
   */
  .post("/gyms/owned", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let owner = await ownerRepository.findByEmail(query.email);
      if (owner != null && owner.apikey == query.apikey){
        let result = await gymOwnedRepository.saveOwned(query.gid,query.email);
        console.log(result);
        res.json(result);
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
   * POST - Insert that a gym into database.
   * @param {string} email email of the owner.
   * @param {string} apikey apikey of the owner.
   * @param {string} gymName gym brand name.
   * @param {string} gymBrandName gym brand name.
   * @param {string} gymAddress gym address.
   * @param {number} gymCoordLong Longitude coord of gym.
   * @param {number} gymCoordLat Latitude coord of gym.
   * @returns message confirming the insertion.
   */
  .post("/gyms/gym", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let owner = await ownerRepository.findByEmail(query.email);
      if (owner != null && owner.apikey == query.apikey){
        let ID = createID(4);
        let result = await gymRepository.saveGym(ID,query.gymName,query.gymBrandName,query.gymAddress,query.gymCoordLat,query.gymCoordLong);
        res.json(result);
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
   * POST - Insert that a gym brand into database.
   * @param {string} brandname gym brand name.
   * @returns message confirming the insertion.
   */
   .post("/brands/brand", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      let result = await gymBrandRepository.saveGymBrand(query.brandname);
      res.json({"success":true});
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * POST - Insert a gym owner into database.
   * @param {string} email owner email.
   * @param {string} fullname owner full name.
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
        let result = await ownerRepository.saveOwner(query.email,query.fullname,query.number,query.username,query.password);
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
            +owner.fullname+'!'+
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
   * @param {string} apikey owner's api key.
   * @returns owner information.
   */
   .post('/owners/owner/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      const owner = await ownerRepository.findByEmail(query.email);
      if(owner != null && owner.apikey == query.apikey){
        res.json(owner)
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
   * PUT update a owner user profile picture.
   * @param {string} email The email of the owner.
   * @param {string} apikey The api key the owner.
   * @param {file} profilepicture the picture.
   * @returns message informing successful update.
   */
   .put('/owners/owner/picture', ownerpicture.single('profilepicture'), cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const file = req.file;
      const owner = await ownerRepository.findByEmail(query.email);
      let oldFileName = '';
      if (owner.profile_picture != null && owner.profile_picture.includes('/')){
        oldFileName = owner.profile_picture.split('/');
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
      if(owner != null && owner.apikey == query.apikey){
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
   * PUT update a brand logo picture.
   * @param {string} email The email of the owner.
   * @param {string} apikey The api key of the owner.
   * @param {string} brandname The name of the brand.
   * @param {file} logo the picture.
   * @returns message informing successful update.
   */
   .put('/brands/brand/logo', brandlogo.single('logo'), cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const file = req.file;
      const owner = await ownerRepository.findByEmail(query.email);
      const brand = await gymBrandRepository.findByBrandname(query.brandname);
      let oldFileName = '';
      if (brand != null && brand.gym_brandname == query.brandname){
        if (brand.gym_logo != null && brand.gym_logo.includes('/')){
          oldFileName = brand.gym_logo.split('/');
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
        if(owner != null && owner.apikey == query.apikey){
          await storageRef.file(oldFileName).delete({ignoreNotFound: true});
          let newFileName = ``;
          if (file.mimetype == 'image/jpeg'){
            newFileName = `brands/${Date.now()}.jpg`;
          }
          else if (file.mimetype == 'image/png') {
            newFileName = `brands/${Date.now()}.png`;
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
            await gymBrandRepository.updateGymBrandLogo(brand.gym_brandname,storageRef.file(newFileName).publicUrl());
            res.json({'success':true});
          });
          blobStream.end(req.file.buffer);
        }
        else {
          res.json({'message':'Invalid email or apikey!'})
        }
      } else {
        res.json({'message':'Brand does not exist!'})
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
   * @param {string} fullname The full name of the owner.
   * @param {string} number The phone number of the owner. 
   * @param {string} username The username the owner.
   * @param {string} apikey The api key of the owner.
   * @returns Returns params of completed insertion.
   */
   .put('/owners/owner/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const owner = await ownerRepository.findByEmail(query.email);
      if(owner != null && owner.apikey == query.apikey){
        const result = await ownerRepository.updateOwner(query.email,query.fullname,query.number,query.username);
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
   * put - update a gym.
   * @param {string} email The email of the owner.
   * @param {string} apikey The api key of the owner.
   * @param {string} gid gym id
   * @param {string} gymName gym brand name.
   * @param {string} gymBrandName gym brand name.
   * @param {string} gymAddress gym address.
   * @param {number} gymCoordLong Longitude coord of gym.
   * @param {number} gymCoordLat Latitude coord of gym.
   * @returns message confirming update.
   */
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(bodyParser.raw())
   .put("/gyms/gym/info", cors(corsOptions), async (req: any, res: any) => {
     try {
        let query = req.body;
        const owner = await ownerRepository.findByEmail(query.email);
        if(owner != null && owner.apikey == query.apikey){
          let result = await gymRepository.updateGym(query.gid, query.gymName, query.gymBrandName, query.gymAddress,query.gymCoordLat, query.gymCoordLong)
          res.json({'success':true});
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
   * @param {string} apikey owner's api key.
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
      if(owner != null && owner.apikey == query.apikey){
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
        res.json({'message':'Invalid email or apikey!'})
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
   * @param {string} apikey owner's api key.
   * @returns message confirming deletion.
   */
   .delete('/owners/delete', cors(corsOptions), async (req: any, res: any) => {
     try {
       let query = req.body;
       const owner = await ownerRepository.findByEmail(query.email);
       let oldFileName = '';
      if (owner != null && owner.profile_picture != null && owner.profile_picture.includes('/')){
        oldFileName = owner.profile_picture.split('/');
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
      if(owner != null && owner.apikey == query.apikey){
        await storageRef.file(oldFileName).delete({ignoreNotFound: true});
        let result = await gymOwnedRepository.deleteAllByEmail(owner.email);
        result = await ownerOTPRepository.deleteOwnerOTP(owner.email);
        result = await ownerRepository.deleteOwner(owner.email);
        res.json({ 'success': true });
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
export {owners};
