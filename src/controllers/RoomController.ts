import express = require("express");
import socketio = require("socket.io");
import ARestAPIController from "./ARestAPIController";
import ARoom from "./../ARoom";
import MajorityPacketTypes from "./../MajorityPacketTypes";
import MajorityPlayer from "./../MajorityPlayer";
import MajorityRoom from "./../MajorityRoom";
import IoServer from "./../IoServer";

export default class RoomController extends ARestAPIController
{
	private rooms:Map<string, ARoom> = new Map<string, ARoom>();
	
	constructor(app:express.Express)
	{
		super(app, "/room");
		IoServer.io.on("connection", (socket:socketio.Socket) => {
			let player = new MajorityPlayer(socket.id, socket);
			
			player.on("ET:Majority:connection", (data:MajorityPacketTypes.Connection) => {
				let room = this.rooms.get(data.roomId);
				
				if (room) {
					player.username = data.username;
					room.addPlayer(player);
				}
			});
		});
	}

	/**
	 * The generated id is based on room's size + an optional number in case of the id is already taken by another room.
	 *
	 * @returns The created room's id, as an hexadecimal string.
	 */
	private generateId():string
	{
		let id:number = this.rooms.size;
		let output:string;

		for (output = id.toString(16).padStart(4, "0"); this.rooms.has(output); id++);
		return (output);
	}
	
	/**
	 * ```GET {url}/room/{id}```
	 * Get a room.
	 * If request succeed, returns a room as Room object.
	 */
	protected get = (req:express.Request, res:express.Response):void =>
	{
		const ID:string = req.params.id;
		let room:ARoom|undefined = this.rooms.get(ID);

		if (!room) {
			res.status(404).json(`Room n°${ID} doesn't exists.`);
			return;
		}
		res.json({id: ID, players: room.getPlayersData()});
	}

	/**
	 * ```GET {url}/room```
	 * Return all rooms as an array of Rooms.
	 */
	protected getAll = (req:express.Request, res:express.Response):void =>
	{
		let output:any[] = [];

		this.rooms.forEach((room:ARoom, key:string) => {
			output.push({id: key, players: room.getPlayersData()});
		});
		res.json(output);
	}
	
	/**
	 * ```POST {url}/room```
	 * Creates a new room.
	 * If request succeed, the id of the created room is returned.
	 */
	protected post = (req:express.Request, res:express.Response):void =>
	{
		const ID:string = this.generateId();

		this.rooms.set(ID, new MajorityRoom());
		res.json({id: ID});
	}

	/**
	 * This method hasn't to be implemented yet.
	 */
	protected put = (req:express.Request, res:express.Response):void =>
	{
		req;
		res.json({});
	}

	/**
	 * This method hasn't to be implemented yet.
	 */
	protected delete = (req:express.Request, res:express.Response):void =>
	{
		req;
		res.json({});
	}
};