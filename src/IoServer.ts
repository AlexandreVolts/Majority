import express = require("express");
import socketio = require("socket.io");
import bodyParser = require("body-parser");
import http = require("http");

export default class IoServer
{
	private static readonly VIEWS_PATH:string = __dirname + "/../webapp/";
	// This variable is a bit an architectural mess, if you have better I take !
	public static io:socketio.Server;
	private readonly PORT:number;
	private app = express();
	private server:http.Server;
	private players:Map<string, socketio.Socket> = new Map<string, socketio.Socket>();

	constructor(port:number)
	{
		this.PORT = port;
		this.server = this.app.listen(this.PORT, this.initialise);
		IoServer.io = socketio(this.server);
	}

	private initialise = (err:string):void =>
	{
		if (err) {
			console.error(err);
			return;
		}
		console.log(`Server is running on port ${this.PORT}.`);
		this.app.use(express.static("webapp"));
		this.app.use(bodyParser.json());
		this.app.get("/", (req:express.Request, res:express.Response) => {
			req;
			res.sendFile(IoServer.VIEWS_PATH + "index.html");
		});
	}
	private onConnection = (socket:socketio.Socket) =>
	{
		this.players.set(socket.id, socket);
		socket.on("disconnect", () => {
			this.onDisconnect(socket);
		});
	}
	private onDisconnect = (socket:socketio.Socket) =>
	{
		this.players.delete(socket.id);
	}
};