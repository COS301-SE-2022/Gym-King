const express = require("express");
const path = require("path");
const cors = require("cors");
const { Pool } = require("pg");
const allowedOrigins = ["http://localhost:3000"];
import { server } from "../owners/owners";
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
function createID(length: any) {
  let ID = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 62));
  }
  return ID;
}
server
  .options("*", cors(corsOptions))
  .get("/", cors(corsOptions), async (req: any, res: any) => {
    res.send("GymKing");
  })
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
  .post("/tables/create", cors(corsOptions), async (req: any, res: any) => {
    try {
      const client = await pool.connect();
      let result = await client.query(
        "CREATE TABLE IF NOT EXISTS GYM(" +
          "G_ID VARCHAR(4)," +
          "Gym_BrandName VARCHAR(50)," +
          "Gym_Address VARCHAR(100)," +
          "Gym_Coord_Lat FLOAT(10)," +
          "Gym_Coord_Long FLOAT(10)," +
          "Gym_Icon VARCHAR(65535)," +
          "PRIMARY KEY(G_ID)" +
          ")"
      );
      result = await client.query(
        "CREATE TABLE IF NOT EXISTS GYM_USER(" +
          "email VARCHAR(320)," +
          "Name VARCHAR(100)," +
          "Surname VARCHAR(100)," +
          "Number VARCHAR(10)," +
          "Username VARCHAR(50)," +
          "Password VARCHAR(300)," +
          "PRIMARY KEY(email)" +
          ")"
      );
      result = await client.query(
        "CREATE TABLE IF NOT EXISTS GYM_EMPLOYEE(" +
          "email VARCHAR(320)," +
          "G_ID VARCHAR(4)," +
          "Name VARCHAR(100)," +
          "Surname VARCHAR(100)," +
          "Number VARCHAR(10)," +
          "Username VARCHAR(50)," +
          "Password VARCHAR(300)," +
          "PRIMARY KEY(email)," +
          "FOREIGN KEY (G_ID)" +
          "REFERENCES GYM(G_ID)" +
          ")"
      );
      result = await client.query(
        "CREATE TABLE IF NOT EXISTS BADGE(" +
          "B_ID VARCHAR(3)," +
          "G_ID VARCHAR(4)," +
          "BadgeName VARCHAR(50)," +
          "BadgeDescription VARCHAR(300)," +
          "BadgeChallenge VARCHAR(300)," +
          "BadgeIcon VARCHAR(65535)," +
          "ActivityType VARCHAR(8)," +
          "PRIMARY KEY(B_ID)," +
          "FOREIGN KEY (G_ID)" +
          "REFERENCES GYM(G_ID)" +
          ")"
      );
      result = await client.query(
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
      result = await client.query(
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
      const results = { success: true, results: result };
      res.json(results);
      client.release();
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  .delete("/tables/drop", async (req: any, res: any) => {
    try {
      const client = await pool.connect();
      let result = await client.query("DROP TABLE BADGE_CLAIM");
      result = await client.query("DROP TABLE BADGE_OWNED");
      result = await client.query("DROP TABLE BADGE");
      result = await client.query("DROP TABLE GYM_USER");
      result = await client.query("DROP TABLE GYM_EMPLOYEE");
      result = await client.query("DROP TABLE GYM");
      const results = { success: true, results: result };
      res.json(results);
      client.release();
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
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
  });
export { server };
