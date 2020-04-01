import express from "express";
import socketio from "socket.io";
import bodyParser from "body-parser";
import http from "http";
import IController from "./controllers/IController";
import RoomController from "./controllers/RoomController";
import TemporaryControllerThatWillBeABeautifulApp from "./controllers/TemporaryControllerThatWillBeABeautifulApp";

export default class IoServer
{
	// This variable is a bit an architectural mess, if you have better I take !
	public static io:socketio.Server;
	private app = express();
	private server:http.Server;

	constructor(private readonly PORT:number)
	{
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
		this.app.use(bodyParser.urlencoded({extended: true}));
		this.app.use(bodyParser.json());
		this.initRoutes();
	}
	private initRoutes = () =>
	{
		const ROUTES:IController[] = [
			new TemporaryControllerThatWillBeABeautifulApp(this.app),
			new RoomController(this.app)
		];
		
		for (let i= ROUTES.length - 1; i >= 0; i--)
			ROUTES[i].initRoutes();
	}
};