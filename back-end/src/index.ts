import { GymKingDataSource } from "./datasource"
import {server} from "./server"
import "reflect-metadata";
const PORT = process.env.PORT || 8081
GymKingDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
server.listen(PORT, () => {console.log(`Listening on ${ PORT }`);})
