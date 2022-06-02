import { server } from "./gymkingheroku";
const PORT = process.env.PORT || 8081
server.listen(PORT, () => {console.log(`Listening on ${ PORT }`);})