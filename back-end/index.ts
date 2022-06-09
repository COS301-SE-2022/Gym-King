import { server } from "./utils/utils";
const PORT = process.env.PORT || 8081
server.listen(PORT, () => {console.log(`Listening on ${ PORT }`);})
