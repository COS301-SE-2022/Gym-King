import {server} from "./server"
import "reflect-metadata";
import { GymKingDataSource } from "./datasource";
const PORT = process.env.PORT || 8081
GymKingDataSource.initialize()
.then(() => {
    console.log("Data Source Connection Established!")
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})
server.listen(PORT, () => {console.log(`Listening on ${ PORT }`);})
