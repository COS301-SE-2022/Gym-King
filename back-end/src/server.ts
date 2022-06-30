const express = require('express');
let server = express()
import {users} from "./users/users";
import {employees} from "./employees/employees";
import {owners} from "./owners/owners";
import {utils} from "./utils/utils";
server.use("/",users)
server.use("/",employees)
server.use("/",owners)
server.use("/",utils)
export {server}