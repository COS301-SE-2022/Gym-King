const express = require("express");
const cors = require("cors");

const fs = require('fs');

const { Pool } = require("pg");
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
const pool = (() => {
  if (process.env.TEST == 'true'){
    return new Pool({
      connectionString: process.env.HEROKU_POSTGRESQL_CRIMSON_URL,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    });
  } else {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    });
  }
})();
const utils = express.Router()
  .options("*", cors(corsOptions))
  //=========================================================================================================//
  /**
   * ...
   * @param 
   * @returns 
   */
  .get("/", cors(corsOptions), async (req: any, res: any) => {
    res.send("GymKing");
  })
  //=========================================================================================================//
  /**
   * ...
   * @param 
   * @returns 
   */
  .get("/tables/table", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query.table;
      const client = await pool.connect();
      let result = await client.query("SELECT * from " + query);
      const results = { success: true, results: result ? result.rows : null };
      res.json(results);
      client.release();
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
  .post("/tables/create", cors(corsOptions), async (req: any, res: any) => {
    try {
      const client = await pool.connect();
      await client.query(
        "CREATE TABLE IF NOT EXISTS GYM_BRAND(" +
          "Gym_BrandName VARCHAR(50)," +
          "gym_logo VARCHAR(65535)," +
          "PRIMARY KEY(Gym_BrandName)" +
          ")"
      );
      await client.query(
        "CREATE TABLE IF NOT EXISTS GYM(" +
          "G_ID VARCHAR(4)," +
          "Gym_Name TEXT,"+
          "Gym_BrandName VARCHAR(50)," +
          "Gym_Address VARCHAR(100)," +
          "Gym_Coord_Lat FLOAT(10)," +
          "Gym_Coord_Long FLOAT(10)," +
          "PRIMARY KEY(G_ID)," +
          "FOREIGN KEY (Gym_BrandName)" +
          "REFERENCES GYM_BRAND(Gym_BrandName)" +
          ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS GYM_USER(" +
          "email VARCHAR(320)," +
          "Fullname VARCHAR(150)," +
          "Number VARCHAR(10)," +
          "Username VARCHAR(50)," +
          "Password VARCHAR(300)," +
          "Profile_picture VARCHAR(65535),"+
          "Gym_Membership VARCHAR(50),"+
          "APIKEY VARCHAR(64),"+
          "PushKey VARCHAR(1024),"+
          "notificationToggle BOOLEAN DEFAULT TRUE,"+
          "PRIMARY KEY(email)," +
          "FOREIGN KEY (Gym_Membership)" +
          "REFERENCES GYM_BRAND(Gym_Brandname)" +
          ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS GYM_EMPLOYEE(" +
          "email VARCHAR(320)," +
          "G_ID VARCHAR(4)," +
          "Fullname VARCHAR(150)," +
          "Number VARCHAR(10)," +
          "Username VARCHAR(50)," +
          "Password VARCHAR(300)," +
          "Profile_picture VARCHAR(65535),"+
          "APIKEY VARCHAR(64),"+
          "PRIMARY KEY(email)," +
          "FOREIGN KEY (G_ID)" +
          "REFERENCES GYM(G_ID)" +
          ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS GYM_OWNER(" +
          "email VARCHAR(320)," +
          "Fullname VARCHAR(150)," +
          "Number VARCHAR(10)," +
          "Username VARCHAR(50)," +
          "Password VARCHAR(300)," +
          "Profile_picture VARCHAR(65535),"+
          "APIKEY VARCHAR(64),"+
          "PRIMARY KEY(email)" +
          ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS GYM_OWNED(" +
          "email VARCHAR(320)," +
          "G_ID VARCHAR(4)," +
          "PRIMARY KEY(email,G_ID)," +
          "FOREIGN KEY (G_ID)" +
          "REFERENCES GYM(G_ID)," +
          "FOREIGN KEY (email)" +
          "REFERENCES GYM_OWNER(email)" +
          ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS BADGE(" +
          "B_ID VARCHAR(3)," +
          "G_ID VARCHAR(4)," +
          "BadgeName VARCHAR(50)," +
          "BadgeDescription VARCHAR(300)," +
          "BadgeChallenge VARCHAR(300)," +
          "BadgeIcon VARCHAR(65535)," +
          "Requirement1 VARCHAR(100)," +
          "Requirement2 VARCHAR(100)," +
          "Requirement3 VARCHAR(100)," +
          "ActivityType VARCHAR(8)," +
          "tags TEXT,"+ 
          "PRIMARY KEY(B_ID)," +
          "FOREIGN KEY (G_ID)" +
          "REFERENCES GYM(G_ID)" +
          ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS BADGE_OWNED(" +
          "B_ID VARCHAR(3)," +
          "email VARCHAR(320)," +
          "username VARCHAR(50)," +
          "Count SMALLINT DEFAULT 1," +
          "input1 VARCHAR(50)," +
          "input2 VARCHAR(50)," +
          "input3 VARCHAR(50)," +
          "Date DATE DEFAULT NOW()," +
          "PRIMARY KEY(B_ID,email)," +
          "FOREIGN KEY (B_ID) REFERENCES BADGE(B_ID)," +
          "FOREIGN KEY (email) REFERENCES GYM_USER(email)" +
          ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS BADGE_CLAIM(" +
          "B_ID VARCHAR(3)," +
          "email VARCHAR(320)," +
          "username VARCHAR(50)," +
          "input1 VARCHAR(50)," +
          "input2 VARCHAR(50)," +
          "input3 VARCHAR(50)," +
          "Proof VARCHAR(65535)," +
          "Date DATE DEFAULT NOW()," +
          "PRIMARY KEY(B_ID,email)," +
          "FOREIGN KEY (B_ID) REFERENCES BADGE(B_ID)," +
          "FOREIGN KEY (email) REFERENCES GYM_USER(email)" +
          ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS USER_OTP(" +
          "email VARCHAR(320)," +
          "otp VARCHAR(50)," +
          "otptimestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP," +
          "PRIMARY KEY(email)," +
          "FOREIGN KEY (email) REFERENCES GYM_USER(email)" +
          ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS EMPLOYEE_OTP(" +
          "email VARCHAR(320)," +
          "otp VARCHAR(50)," +
          "otptimestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP," +
          "PRIMARY KEY(email)," +
          "FOREIGN KEY (email) REFERENCES GYM_EMPLOYEE(email)" +
        ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS OWNER_OTP(" +
          "email VARCHAR(320)," +
          "otp VARCHAR(50)," +
          "otptimestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP," +
          "PRIMARY KEY(email)," +
          "FOREIGN KEY (email) REFERENCES GYM_OWNER(email)" +
          ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS FRIEND(" +
        "fromUser VARCHAR(320)," +
        "toUser VARCHAR(320)," +
        "isPending BOOLEAN,"+
        "PRIMARY KEY(fromUser,toUser)," +
        "FOREIGN KEY (fromUser) REFERENCES GYM_USER(email)," +
        "FOREIGN KEY (toUser) REFERENCES GYM_USER(email)" +
      ")"
      );
       await client.query(
        "CREATE TABLE IF NOT EXISTS SUBSCRIPTION(" +
        "fromUser VARCHAR(320)," +
        "toGym VARCHAR(4)," +
        "PRIMARY KEY(fromUser,toGym)," +
        "FOREIGN KEY (fromUser) REFERENCES GYM_USER(email)," +
        "FOREIGN KEY (toGym) REFERENCES GYM(g_id)" +
      ")"
      );
      const results = { success: true};
      res.json(results);
      client.release();
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
  // .delete("/tables/drop", async (req: any, res: any) => {
  //   try {
  //     // const client = await pool.connect();
  //     //  await client.query("DROP TABLE IF EXISTS BADGE_CLAIM");
  //     //  await client.query("DROP TABLE IF EXISTS USER_OTP");
  //     //  await client.query("DROP TABLE IF EXISTS EMPLOYEE_OTP");
  //     //  await client.query("DROP TABLE IF EXISTS OWNER_OTP");
  //     //  await client.query("DROP TABLE IF EXISTS FRIEND");
  //     //  await client.query("DROP TABLE IF EXISTS REQUEST_EMPLOYEE");
  //     //  await client.query("DROP TABLE IF EXISTS SUBSCRIPTION");
  //     //  await client.query("DROP TABLE IF EXISTS USER_PROFILE_PICTURE");
  //     //  await client.query("DROP TABLE IF EXISTS EMPLOYEE_PROFILE_PICTURE");
  //     //  await client.query("DROP TABLE IF EXISTS OWNER_PROFILE_PICTURE");
  //     //  await client.query("DROP TABLE IF EXISTS BADGE_OWNED");
  //     //  await client.query("DROP TABLE IF EXISTS BADGE");
  //     //  await client.query("DROP TABLE IF EXISTS GYM_OWNED");
  //     //  await client.query("DROP TABLE IF EXISTS GYM_USER");
  //     //  await client.query("DROP TABLE IF EXISTS GYM_EMPLOYEE");
  //     //  await client.query("DROP TABLE IF EXISTS GYM_OWNER");
  //     //  await client.query("DROP TABLE IF EXISTS GYM")
  //     //  await client.query("DROP TABLE IF EXISTS GYM_BRAND");
  //     // const results = { success: true, results: result };
  //     res.json({'message':'not implemented!'});
  //     // client.release();
  //   } catch (err) {
  //     const results = { success: false, results: err };
  //     console.error(err);
  //     res.json(results);
  //   }
  // })
  //=========================================================================================================//
  /**
   * ...
   * @param 
   * @returns 
   */
  .delete("/tables/clear", async (req: any, res: any) => {
    try {
      const client = await pool.connect();
      let query = req.query;
      let result = await client.query("DELETE FROM " + query.table);
      const results = { success: true, results: result };
      res.json(results);
      client.release();
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  //=========================================================================================================//
  /**
   * GET to get badge image by its ID
   * @param {string} id The id of the badge image
   * @returns {JPEG file}
   */
  .get("/badgeicon", cors(corsOptions), async (req: any, res: any) => {
    if(req.query.id){


      const file = './src/assets/badges/'+req.query.id+'.png';
      fs.access(file, fs.F_OK, (err: any) => {
        if (err) {
          
          const results = { success: false, results: "404 Badge icon not found" };
          res.json(results);
          return
        }
        res.download(file); 
      })
    }
    else{
      const results = { success: false, results: "400 bad request" };
      res.json(results);
    }
  })
  //=========================================================================================================//
  ;
export {utils};
