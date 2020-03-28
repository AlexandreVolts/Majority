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
		super(app, "room");
		IoServer.io.on("connection", (socket:socketio.Socket) => {
			let player = new MajorityPlayer(socket.id, socket);
			
			player.on("ET:Majority:connection", (data:MajorityPacketTypes.Connection) => {
				if (this.rooms.has(data.roomId)) {
					player.username = data.username;
					this.rooms.get(data.roomId).addPlayer(player);
				}

			});
			player.on("disconnect", () => {

			});
		});
	}

	/**
	 * This method generates an id for each created room.
	 * The id is based on room's size + an optional number in case of the id is already taken by another room.
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
	 * Converts all data from each room object.
	 * Each new created object is a readable type for client.
	 */
	private generateMetadata():MajorityPacketTypes.Room
	{

	}
	
	/**
	 * ```GET {url}/room/{id}```
	 * Get a room.
	 * If request succeed, the id of the created room is returned.
	 */
	protected get = (req:express.Request, res:express.Response):void =>
	{

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
	 * ```DELETE {url}/room/{id}```
	 * Delete a room.
	 * If request succeed, the id of the deleted room is returned.
	 * 
	 * @urlparam id:string = An hexadecimal string representing the room's id.
	 */
	protected delete = (req:express.Request, res:express.Response):void =>
	{
		const ID:string = req.body.id;
		
		if (!ID)
			res.status(400).json({error: "Bad request: There is no id at the end of the request."});
		if (!this.rooms.has(ID))
			res.status(404).json({error: `Room n°${ID} doesn't exists.`});
		this.rooms.delete(ID);
		res.json({id: ID});
	}
};