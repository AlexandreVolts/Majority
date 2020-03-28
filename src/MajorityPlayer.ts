import socketio = require("socket.io");
import AIoPlayerSocket from "./sockets/AIoPlayerSocket";

export default class MajorityPlayer extends AIoPlayerSocket
{
	private static readonly DEFAULT_LIFE_NUMBER:number = 3;
	private lifes:number = MajorityPlayer.DEFAULT_LIFE_NUMBER;
	private score:number = 0;
	
	/**
	 * Create a virtual representation of a majority player.
	 *
	 * @params username:string
	 * @params socket:socketio.Socket = /!\ This parameter is temporary (It breaks abstraction chain)
	 */
	constructor(username:string, socket:socketio.Socket)
	{
		super(username, socket);
	}
}