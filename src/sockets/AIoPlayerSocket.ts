import socketio = require("socket.io");
import IPacket from "./IPacket";
import IPlayerData from "./IPlayerData";
import IPlayerSocket from "./IPlayerSocket";

export default abstract class AIoPlayerSocket implements IPlayerSocket
{
	username:string;
	readonly ID:string;
	
	constructor(username:string, private socket:socketio.Socket)
	{
		this.username = username;
		this.ID = this.socket.id;
	}

	public on<T extends IPacket>(event:string, callback:(data:T) => void)
	{
		this.socket.on(event, (data:T) => {
			data.command = event;
			callback(data);
		});
	}
	public send<T extends IPacket>(event:string, data:T)
	{
		data.command = event;
		this.socket.emit(event, data);
	}
	public destroy():void
	{
		this.socket.removeAllListeners();
	}
	public getIp():string
	{
		return (this.socket.handshake.address);
	}
	public abstract getData():IPlayerData;
}