import express = require("express");
import ARestAPIController from "./ARestAPIController";
import MajorityRoom from "./../MajorityRoom";

export default class RoomController extends ARestAPIController
{
	private rooms:Map<string, MajorityRoom> = new Map<string, MajorityRoom>();
	
	constructor(app:express.Express)
	{
		super(app, "room");
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
	
	protected post = (req:express.Request, res:express.Response):void =>
	{
		const ID:string = this.generateId();

		this.rooms.set(ID, new MajorityRoom());
		res.json({id: ID});
	}
	protected delete = (req:express.Request, res:express.Response):void =>
	{
		
	}
};