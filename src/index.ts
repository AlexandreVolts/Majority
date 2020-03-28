import Server from "./Server"

const PORT:number = parseInt(process.env.port || "8080");

new Server(PORT);