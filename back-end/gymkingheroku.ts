const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
async function hashIt(password: any){
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
}
if (!process.env.DATABASE_URL){
  process.env.DATABASE_URL = "postgres://iaywkbttuwppmv:9ef916f869b5dbac0d5a1b0e48502104ac24e7260359da26602d9fc22094afc5@ec2-52-212-228-71.eu-west-1.compute.amazonaws.com:5432/d93uc45ua9re52";
}
let p1:any;
let p2:any;
const PORT = process.env.PORT || 8081
const allowedOrigins = [
  'http://localhost:3000'
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
const pool = (() => {
  if (process.env.NODE_ENV !== 'production') {
      return new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false
          }
      });
  } else {
      return new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
              rejectUnauthorized: false
            }
      });
  } })
();
function createID(length: any) {
  let ID = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < length; i++ ) {
    ID += characters.charAt(Math.floor(Math.random()*62));
  }
  return ID;
}
express()
  .options('*', cors(corsOptions))
  .get('/', cors(corsOptions), async (req: any, res: any) => {
    const client = await pool.connect();
    let result = await client.query(
    "SELECT * FROM BADGE_OWNED "+
    "WHERE B_ID = 'wTs' AND email = 'u20519517@tuks.co.za'");
    res.json(result);
  })
  .get('/tables/table', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query.table;
      const client = await pool.connect();
      let result = await client.query("SELECT * from "+query);
      const results = { success: true, 'results': (result) ? result.rows : null};
      res.json( results );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .get('/badges/badge', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query.bid;
      const client = await pool.connect();
      let result = await client.query("SELECT * from BADGE where B_ID = '"+query+"'");
      const results = { success: true, 'results': (result) ? result.rows : null};
      res.json( results );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .get('/claims/claim', cors(corsOptions), async (req: any, res: any) => {
    try {
      if (req.query.gid != null){
        let query = req.query.gid;
        const client = await pool.connect();
        let result = await client.query(
          "SELECT * FROM BADGE_CLAIM "+
          "WHERE B_ID IN (SELECT B_ID FROM BADGE "+
          "WHERE G_ID = '"+query+"')");
        const results = { success: true, 'results': (result) ? result.rows : null};
        res.json( results );
        client.release();
      } else if (req.query.bid != null && req.query.email != null) {
        let query = req.query;
        const client = await pool.connect();
        let result = await client.query(
          "SELECT * FROM BADGE_CLAIM "+
          "WHERE B_ID = '"+query.bid+"' AND email = '"+query.email+"'");
        const results = { success: true, 'results': (result) ? result.rows : null};
        res.json( results );
        client.release();
      }
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .post('/gyms/gym', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let ID = createID(4);
      let result = await client.query("INSERT INTO GYM"+
      "(G_ID,Gym_BrandName,Gym_Address,Gym_Coord_Long,Gym_Coord_Lat,Gym_Icon) VALUES"+
      "('"+ID+"','"+query.gbn+"','"+query.ga+"','"+query.gclo+"','"+query.gcla+"','"+query.gi+"')");
      const results = { success: true, 'results': (result) ? result.rows : null};
      query.gid = ID;
      res.json( query );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .post('/users/user', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query("INSERT INTO GYM_USER"+
      "(email,name,surname,number,username,password) VALUES"+
      "('"+query.email+"','"+query.name+"','"+query.surname+"','"+query.number+"','"+query.username+"','"+query.password+"')");
      const results = { success: true, 'results': (result) ? result.rows : null};
      res.json( {results,query} );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .post('/users/useremp', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query("INSERT INTO GYM_EMPLOYEE"+
      "(email,g_id,name,surname,number,username,password) VALUES"+
      "('"+query.email+"','"+query.gid+"','"+query.name+"','"+query.surname+"','"+query.number+"','"+query.username+"','"+query.password+"')");
      const results = { success: true, 'results': (result) ? result.rows : null};
      res.json( {results,query} );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .post('/claims/claim', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query("INSERT INTO BADGE_CLAIM"+
      "(B_ID,email,username,input1,input2,input3,proof) VALUES"+
      "('"+query.bid+"','"+query.email+"','"+query.username+"','"+query.input1+"','"+query.input2+"','"+query.input3+"','"+query.proof+"')");
      const results = { success: true, 'results': (result) ? result.rows : null};
      res.json( {results,query} );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .post('/badges/badge', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let ID = createID(3);
      let result = await client.query("INSERT INTO BADGE"+
      "(B_ID,G_ID,BadgeName,BadgeDescription,BadgeChallenge,BadgeIcon,ActivityType) VALUES"+
      "('"+ID+"','"+query.gid+"','"+query.bn+"','"+query.bd+"','"+query.bc+"','"+query.bi+"','"+query.at+"')");
      const results = { success: true, 'results': (result) ? result.rows : null};
      res.json( {results,query} );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .post('/tables/create', cors(corsOptions), async (req: any, res: any) => {
    try {
      const client = await pool.connect();
      let result = await client.query("CREATE TABLE IF NOT EXISTS GYM("+   
        "G_ID VARCHAR(4),"+    
        "Gym_BrandName VARCHAR(50),"+    
        "Gym_Address VARCHAR(100),"+
        "Gym_Coord_Lat FLOAT(10),"+
        "Gym_Coord_Long FLOAT(10),"+
        "Gym_Icon VARCHAR(65535),"+    
        "PRIMARY KEY(G_ID)"+    
      ")");
      result = await client.query("CREATE TABLE IF NOT EXISTS GYM_USER("+   
        "email VARCHAR(320),"+    
        "Name VARCHAR(100),"+    
        "Surname VARCHAR(100),"+
        "Number VARCHAR(10),"+
        "Username VARCHAR(50),"+
        "Password VARCHAR(300),"+    
        "PRIMARY KEY(email)"+    
      ")");
      result = await client.query("CREATE TABLE IF NOT EXISTS GYM_EMPLOYEE("+   
        "email VARCHAR(320),"+
        "G_ID VARCHAR(4),"+    
        "Name VARCHAR(100),"+    
        "Surname VARCHAR(100),"+
        "Number VARCHAR(10),"+
        "Username VARCHAR(50),"+
        "Password VARCHAR(300),"+
        "PRIMARY KEY(email),"+
        "FOREIGN KEY (G_ID)"+
        "REFERENCES GYM(G_ID)"+    
      ")");
      result = await client.query("CREATE TABLE IF NOT EXISTS BADGE("+   
        "B_ID VARCHAR(3),"+
        "G_ID VARCHAR(4),"+
        "BadgeName VARCHAR(50),"+    
        "BadgeDescription VARCHAR(300),"+
        "BadgeChallenge VARCHAR(300),"+
        "BadgeIcon VARCHAR(65535),"+
        "ActivityType VARCHAR(8),"+    
        "PRIMARY KEY(B_ID),"+
        "FOREIGN KEY (G_ID)"+
        "REFERENCES GYM(G_ID)"+    
      ")");
      result = await client.query("CREATE TABLE IF NOT EXISTS BADGE_OWNED("+   
        "B_ID VARCHAR(3),"+
        "email VARCHAR(320),"+ 
        "username VARCHAR(50),"+      
        "Count SMALLINT DEFAULT 1,"+    
        "input1 VARCHAR(50),"+
        "input2 VARCHAR(50),"+
        "input3 VARCHAR(50),"+
        "Date DATE DEFAULT NOW(),"+
        "PRIMARY KEY(B_ID,email),"+
        "FOREIGN KEY (B_ID) REFERENCES BADGE(B_ID),"+
        "FOREIGN KEY (email) REFERENCES GYM_USER(email)"+  
      ")");
      result = await client.query("CREATE TABLE IF NOT EXISTS BADGE_CLAIM("+   
        "B_ID VARCHAR(3),"+
        "email VARCHAR(320),"+ 
        "username VARCHAR(50),"+       
        "input1 VARCHAR(50),"+
        "input2 VARCHAR(50),"+
        "input3 VARCHAR(50),"+
        "Proof VARCHAR(65535),"+
        "Date DATE DEFAULT NOW(),"+    
        "PRIMARY KEY(B_ID,email),"+
        "FOREIGN KEY (B_ID) REFERENCES BADGE(B_ID),"+
        "FOREIGN KEY (email) REFERENCES GYM_USER(email)"+  
      ")");
      const results = { success: true };
      res.json( results );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  }).put('/claims/claim', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query(
      "SELECT * FROM BADGE_CLAIM "+
      "WHERE B_ID = '"+query.bid+"' AND email = '"+query.email+"'");
      const ret = result.rows[0];
      result = await client.query(
      "DELETE FROM BADGE_CLAIM "+
      "WHERE B_ID = '"+query.bid+"' AND email = '"+query.email+"'");
      result = await client.query(
      "SELECT * FROM BADGE_OWNED "+
      "WHERE B_ID = '"+ret.b_id+"' AND email = '"+ret.email+"'");
      if (result.rows.length > 0) {
        result = await client.query("UPDATE BADGE_OWNED SET "+
        "count = count+1 WHERE b_id = '"+ret.b_id+"' AND email = '"+ret.email+"'");
      }
      else {
        result = await client.query("INSERT INTO BADGE_OWNED "+
        "(B_ID,email,username,input1,input2,input3) VALUES"+
        "('"+ret.b_id+"','"+ret.email+"','"+ret.username+"','"+ret.input1+"','"+ret.input2+"','"+ret.input3+"')");
      }
      const results = { success: true, 'results': (result) ? result.rows : null};
      res.json( {ret,query} );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .delete('/badges/badge', cors(corsOptions), async (req: any, res: any) => {
    try {
      let query = req.query;
      const client = await pool.connect();
      let result = await client.query(
      "DELETE FROM BADGE_CLAIM "+
      "WHERE B_ID = '"+query.bid+"'");
      result = await client.query(
      "DELETE FROM BADGE_OWNED "+
      "WHERE B_ID = '"+query.bid+"'");
      result = await client.query(
      "DELETE FROM BADGE "+
      "WHERE B_ID = '"+query.bid+"'");
      const results = { success: true, 'results': (result) ? result.rows : null};
      res.json( {results,query} );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .delete('/tables/drop', async (req: any, res: any) => {
    try {
      const client = await pool.connect();
      let result = await client.query('DROP TABLE BADGE_CLAIM');
      result = await client.query('DROP TABLE BADGE_OWNED');
      result = await client.query('DROP TABLE BADGE');
      result = await client.query('DROP TABLE GYM_USER');
      result = await client.query('DROP TABLE GYM_EMPLOYEE');
      result = await client.query('DROP TABLE GYM');
      const results = { success: true, 'results': result };
      res.json( results );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .delete('/tables/clear', async (req: any, res: any) => {
    try {
      const client = await pool.connect();
      let query = req.query;
      let result = await client.query("DELETE FROM "+query.table);
      const results = { success: true, 'results': result };
      res.json( results );
      client.release();
    } catch (err) {
      const results = { success: false, 'results': err };
      console.error(err);
      res.json(results);
    }
  })
  .listen(PORT, () => {console.log(`Listening on ${ PORT }`);})
