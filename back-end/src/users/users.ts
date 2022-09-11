import { badgeRepository } from "../repositories/badge.repository";
import { badgeClaimRepository } from "../repositories/badge_claim.repository";
import { badgeOwnedRepository } from "../repositories/badge_owned.repository";
import { gymRepository } from "../repositories/gym.repository";
import { employeeRepository } from "../repositories/gym_employee.repository";
import { ownerRepository } from "../repositories/gym_owner.repository";
import { userRepository } from "../repositories/gym_user.repository";
import { userOTPRepository } from "../repositories/user_otp.repository";
import { storageRef } from "../firebase.connection";

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const userpicture = multer();
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
//=========================================================================================================//
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
// USER API
//=============================================================================================//
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
      callback(new Error('Origin not allowed by CORS'));
    }
  },
};

//=============================================================================================//
// USER ROUTER
//=============================================================================================//
const users = express.Router()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
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
   * GET - returns all badges that a user earned
   * @param {string} email input of user ID
   * @returns A list of badges user earned
   */
   .post('/user/badges',cors(corsOptions),async(req: any, res: any)=>
   {
     try
     {
       let query= req.body.email;
       const results= await badgeOwnedRepository.findByEmail(query)
       res.json(results)
     }
     catch(err)
     {
       const results = { 'success': false, 'results': err };
       console.error(err);
       res.json(results);
     }
   })
  //=========================================================================================================//
  /**
   * GET - returns all badge claims of a user.
   * @param {string} email email of gym_user.
   * @returns list of all claims the user has made.
   */
   .get('/users/claims/:email', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.params.email;
      const result = await badgeClaimRepository.findByEmail(query);
      res.json(result);
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * GET - returns all badges owned of a user.
   * @param {string} email email of gym_user.
   * @returns list of all badges owned by user.
   */
   .get('/users/owned/:email', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.params.email;
      const result = await badgeOwnedRepository.findByEmail(query);
      res.json(result);
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
   * GET to return all owned badges from gym users who own gyms badges.
   * @param {string} gid gym ID.
   * @returns List of all badges, with usersnames and amount of times they earned that badge.
   */
  .get('/leaderboard/score/:gid', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.params.gid;
      const result = await badgeRepository.getLeaderboardByGID(query);
      res.json(result)
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * GET to get badge model by its name for iOS.
   * @param {string} rank rank of badge. g b or s.
   * @param {string} emblem emblem name of badge.
   * @returns {USDZ file}
   */
  .get('/Model/iOS/', cors(corsOptions), async(req: any, res: any)=>{
    const query = req.query;
    const file = './src/assets/models/IOS/'+query.rank+'_'+query.emblem+'.usdz';
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
   * GET to get badge model by its name for Android.
   * @param {string} rank rank of badge. g b or s.
   * @param {string} emblem emblem name of badge.
   * @returns {GLB file}
   */
  .get('/Model/Android/', cors(corsOptions), async(req: any, res: any)=>{
      const query = req.query
      const file = './src/assets/models/ANDROID/'+query.rank+'_'+query.emblem+'.glb';
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
   * GET a users profile picture.
   * @param {string} email User email.
   * @returns {image} 
   */
   .get('/users/user/picture/:email', cors(corsOptions), async(req: any, res: any)=>{
    const query = req.params.email;
    const user = await userRepository.findByEmail(query);
    if (user != null){
      res.json(user.profile_picture);
    } else{
      res.json({'message':'Invalid email!'})
    }
  })
  //=========================================================================================================//
  /**
   * POST save a users claim for a badge to database.
   * @param {string} bid The badge ID of the badge.
   * @param {string} email The email of the user who claims they completed it.
   * @param {string} password The password of the user.
   * @param {string} input1 The first input 
   * @param {string} input2 The second input 
   * @param {string} input3 The third input 
   * @param {string} proof image of proof.
   * @returns Returns params of completed insertion.
   */
  .post('/claims/claim', userpicture.single('proof') , cors(corsOptions), async (req: any, res: any) => {
    try {
      const bcrypt = require('bcryptjs')
      let query = req.body;
      let file = req.file;
      const user = await userRepository.findByEmail(query.email);
      if(bcrypt.compareSync(query.password, user.password)){
        let newFileName = ``;
        if (file.mimetype == 'image/jpeg'){
          newFileName = `claims/${Date.now()}.jpg`;
        }
        else if (file.mimetype == 'image/png') {
          newFileName = `claims/${Date.now()}.png`;
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
          const claimURL = await storageRef.file(newFileName).publicUrl();
          await badgeClaimRepository.saveClaim(query.bid, user.email, user.username, query.input1, query.input2, query.input3, claimURL)
          res.json({'success':true});
        });
        blobStream.end(req.file.buffer);
      }
      else {
        res.json({'message':'Invalid email or password!'});
      }
      
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * POST user login.
   * @param {string} email email of the user.
   * @param {string} password Password of the user.
   * @param {string} usertype Type of user.
   * @returns A message saying success true.
   */
  .post('/users/login', cors(corsOptions), async (req: any, res: any) => {
    try {
      const bcrypt = require('bcryptjs');
      let query = req.body;
      if (query.email != null && query.password != null && query.usertype != null) {
        let uT = query.usertype;
        if(query.usertype !== "gym_owner" && query.usertype !== "gym_employee"){
          uT="gym_user";
        }
        let uE=query.email;
        let uP=query.password;
        let result:any;
        if (uT == "gym_employee") {
          result = await employeeRepository.findByEmail(uE);
        }
        else if (uT == "gym_owner") {
          result = await ownerRepository.findByEmail(uE);
        }
        else {
          result = await userRepository.findByEmail(uE);
        }
        if(result == null) {
          res.status(404); 
          res.json( { 'success': false, 'results':'invalid email or password'} );
        }
        else {
          if(result.length==0) {
            res.status(404);
            res.json( { 'success': false, 'results':'invalid email or password'} );
          }
          else{
            let hashPass = result.password;
            if(!bcrypt.compareSync(uP, hashPass)) {
              res.status(400);
              res.json( { 'success': false, 'results':"invalid password" } );
            }else{
              const results = { 'success': true,'profile_picture': result.profile_picture };
              res.json( results );
            }
          }
        }
      }else {
        res.status(400);
        res.json(  { 'success': false, 'results':'missing email or password'} );
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
  .post('/users/user', cors(corsOptions), async (req: any, res: any) => {
    try {
      if (req.body.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      {
        const result = await userRepository.saveUser(req.body.email,req.body.name,req.body.surname,req.body.number,req.body.username,req.body.password);
        res.json({'success':true})
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
   * POST - returns all gyms within a certain radius of the user
   * @param {string} latCoord latitude of user
   * @param {string} longCoord longitude of user
   * @param {string} radius circle radius in KM to check for gyms
   * @returns a list of gyms and their locations
   */
  .post('/gyms/aroundme', cors(corsOptions), async (req: any, res: any) => {
    try {
      if (req.body.latCoord != null || req.body.longCoord != null) {
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

  .get('/gyms/getAllGyms', cors(corsOptions), async (req: any, res: any) => {
    try {
        // SQL statement to get all gyms
        var gyms = await gymRepository.findAll();
        gyms.forEach(element => {
          element.key = element.g_id;
        });
        const results = { 'success': true, 'results': gyms };
        res.json(results);
      
    } catch (err) {
      const results = { 'success': false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * POST - create OTP for user.
   * @param {string} email email of user.
   * @returns message indicating creation
   */
   .post('/users/user/OTP', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      if (query.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      {
        let user = await userRepository.findByEmail(query.email);
        if(user != null && user.email == query.email)
        {
          let result = await userOTPRepository.deleteUserOTP(query.email);
          const newOTP = createID2(6);
          result = await userOTPRepository.saveUserOTP(query.email,newOTP);
          const emailerOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "GYMKING User OTP",
            text: 'Hello there, '
            +user.name+' '+user.surname+
            '!\nThis is an email notifying you of the creation of an OTP for your account.\n'+
            'Your OTP is: '+newOTP+'\n'+
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
          res.json({ 'success': false ,'message':'User does not exist!' });
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
   * POST - Get users information.
   * @param {string} email user's email.
   * @param {string} password user's password.
   * @returns Users information.
   */
   .post('/users/user/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      const bcrypt = require('bcryptjs')
      let query = req.body;
      const user = await userRepository.findByEmail(query.email);
      if (user != null && bcrypt.compareSync(query.password, user.password)) {
        res.json(user)
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
   * PUT update a gym user.
   * @param {string} email The email of the user.
   * @param {string} name The name of the user.
   * @param {string} surname The surname of the user. 
   * @param {string} number The phone number of the user. 
   * @param {string} username The username the user.
   * @param {string} password The password the user (NOT ecrypted).
   * @returns Returns params of completed insertion.
   */
   .put('/users/user/info', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const bcrypt = require('bcryptjs')
      const user = await userRepository.findByEmail(query.email);
      if (user != null && bcrypt.compareSync(query.password, user.password)) {
        const result = await userRepository.updateUser(query.email,query.name,query.surname,query.number,query.username);
        res.json({'success': true});
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
   * PUT update a gym user profile picture.
   * @param {string} email The email of the user.
   * @param {string} password The password the user (NOT ecrypted).
   * @param {file} profilepicture the picture.
   * @returns message informing successful update.
   */
   .put('/users/user/picture', userpicture.single('profilepicture'), cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const file = req.file;
      const bcrypt = require('bcryptjs')
      const user = await userRepository.findByEmail(query.email);
      let oldFileName = '';
      if (user.profile_picture != null && user.profile_picture.includes('/')){
        oldFileName = user.profile_picture.split('/');
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
      if (bcrypt.compareSync(query.password, user.password)) {
        await storageRef.file(oldFileName).delete({ignoreNotFound: true});
        let newFileName = ``;
        if (file.mimetype == 'image/jpeg'){
          newFileName = `users/${Date.now()}.jpg`;
        }
        else if (file.mimetype == 'image/png') {
          newFileName = `users/${Date.now()}.png`;
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
          await userRepository.updateUserProfilePicture(user.email,storageRef.file(newFileName).publicUrl());
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
   * PUT update a user password.
   * @param {string} email The email of the user. 
   * @param {string} otp OTP given by user.
   * @param {string} newpassword New password.
   * @returns message informing successful update or not.
   */
   .put('/users/user/password', cors(corsOptions), async (req: any, res: any) => {
    try {
      const query = req.body;
      const user = await userRepository.findByEmail(query.email);
      const otp = await userOTPRepository.findByEmail(query.email);
      if (otp != null && otp.otp == query.otp) {
        const result = await userRepository.updateUserPassword(user.email, query.newpassword);
        const otp = await userOTPRepository.deleteUserOTP(query.email);
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
   * DELETE - Delete a user.
   * @param {string} email unique email used to delete the user.
   * @param {string} password user password.
   * @returns message confirming deletion.
   */
  .delete('/users/delete', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.body;
      const bcrypt = require('bcryptjs')
      const user = await userRepository.findByEmail(query.email);
      let oldFileName = '';
      if (user != null && user.profile_picture != null && user.profile_picture != 'NONE' && user.profile_picture.includes('/')){
        oldFileName = user.profile_picture.split('/');
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
      if (user != null && bcrypt.compareSync(query.password, user.password)) {
        await storageRef.file(oldFileName).delete({ignoreNotFound: true});
        let result = await badgeOwnedRepository.deleteAllOwnedByEmail(user.email);
        result = await badgeClaimRepository.deleteAllClaimsByEmail(user.email);
        result = await userOTPRepository.deleteUserOTP(user.email);
        result = await userRepository.deleteUser(user.email);
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
export {users}
