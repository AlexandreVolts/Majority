import socketio from "socket.io";
import AIoPlayerSocket from "./sockets/AIoPlayerSocket";
import IPlayerData from "./sockets/IPlayerData";
import MajorityPlayerData from "./MajorityPlayerData";

export default class MajorityPlayer extends AIoPlayerSocket implements MajorityPlayerData
{
	private static readonly DEFAULT_LIFE_NUMBER:number = 3;
	
	lifes:number = MajorityPlayer.DEFAULT_LIFE_NUMBER;
	score:number = 0;
	
	/**
	 * Create a virtual representation of a majority player.
	 *
	 * @params username:string
	 * @params socket:socketio.Socket = /!\ This parameter is temporary (It breaks the abstraction chain)
	 */
	constructor(username:string, socket:socketio.Socket)
	{
		super(username, socket);
	}

	public getData = ():IPlayerData =>
	{
		let output:MajorityPlayerData = {
			username: this.username,
			lifes: this.lifes,
			score: this.score
		};

		return (output);
	}
}