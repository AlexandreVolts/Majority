import IoServer from "./IoServer"

const PORT:number = parseInt(process.env.port || "8080");

new IoServer(PORT);