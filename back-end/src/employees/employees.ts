const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
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
const employees = express.Router()
  .options("*", cors(corsOptions))
  .get("/claims/claim", cors(corsOptions), async (req: any, res: any) => {
    try {
      if (req.query.gid != null) {
        let query = req.query.gid;
        const client = await pool.connect();
        let result = await client.query(
          "SELECT * FROM BADGE_CLAIM " +
            "WHERE B_ID IN (SELECT B_ID FROM BADGE " +
            "WHERE G_ID = '" +
            query +
            "')"
        );
        const results = { success: true, results: result ? result.rows : null };
        res.json(results);
        client.release();
      } else if (req.query.bid != null && req.query.email != null) {
        let query = req.query;
        const client = await pool.connect();
        let result = await client.query(
          "SELECT * FROM BADGE_CLAIM " +
            "WHERE B_ID = '" +
            query.bid +
            "' AND email = '" +
            query.email +
            "'"
        );
        const results = { success: true, results: result ? result.rows : null };
        res.json(results);
        client.release();
      }
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  .post("/users/useremp", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
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
          query.password +
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
  .post("/badges/badge", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let ID = createID(3);
      let result = await client.query(
        "INSERT INTO BADGE" +
          "(B_ID,G_ID,BadgeName,BadgeDescription,BadgeChallenge,BadgeIcon,ActivityType) VALUES" +
          "('" +
          ID +
          "','" +
          query.gid +
          "','" +
          query.bn +
          "','" +
          query.bd +
          "','" +
          query.bc +
          "','" +
          query.bi +
          "','" +
          query.at +
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
  .put("/claims/claim", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query(
        "SELECT * FROM BADGE_CLAIM " +
          "WHERE B_ID = '" +
          query.bid +
          "' AND email = '" +
          query.email +
          "'"
      );
      const ret = result.rows[0];
      result = await client.query(
        "DELETE FROM BADGE_CLAIM " +
          "WHERE B_ID = '" +
          query.bid +
          "' AND email = '" +
          query.email +
          "'"
      );
      result = await client.query(
        "SELECT * FROM BADGE_OWNED " +
          "WHERE B_ID = '" +
          ret.b_id +
          "' AND email = '" +
          ret.email +
          "'"
      );
      if (result.rows.length > 0) {
        result = await client.query(
          "UPDATE BADGE_OWNED SET " +
            "count = count+1 WHERE b_id = '" +
            ret.b_id +
            "' AND email = '" +
            ret.email +
            "'"
        );
      } else {
        result = await client.query(
          "INSERT INTO BADGE_OWNED " +
            "(B_ID,email,username,input1,input2,input3) VALUES" +
            "('" +
            ret.b_id +
            "','" +
            ret.email +
            "','" +
            ret.username +
            "','" +
            ret.input1 +
            "','" +
            ret.input2 +
            "','" +
            ret.input3 +
            "')"
        );
      }
      const results = { success: true, results: result ? result.rows : null };
      res.json({ ret, query });
      client.release();
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  .put("/badges/badge", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query(
        "UPDATE BADGE SET badgename='" +
          query.bn +
          "', badgedescription='" +
          query.bd +
          "',badgechallenge= '" +
          query.bc +
          "',badgeicon='" +
          query.bi +
          "',activitytype='" +
          query.at +
          "' WHERE b_id = '" +
          query.bid +
          "' AND g_id = '" +
          query.gid +
          "'"
      );
      const results = { success: true, results: result ? result.rows : null };
      res.json(results);
      client.release();
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  })
  .delete("/badges/badge", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query(
        "DELETE FROM BADGE_CLAIM " + "WHERE B_ID = '" + query.bid + "'"
      );
      result = await client.query(
        "DELETE FROM BADGE_OWNED " + "WHERE B_ID = '" + query.bid + "'"
      );
      result = await client.query(
        "DELETE FROM BADGE " + "WHERE B_ID = '" + query.bid + "'"
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
  .delete("/claims/claim", cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query(
        "DELETE FROM BADGE_CLAIM " +
          "WHERE B_ID = '" +
          query.bid +
          "' AND email = '" +
          query.email +
          "'"
      );
      const results = { success: true, results: result ? result.rows : null };
      res.json({ results, query });
      client.release();
    } catch (err) {
      const results = { success: false, results: err };
      console.error(err);
      res.json(results);
    }
  });
export {employees};
