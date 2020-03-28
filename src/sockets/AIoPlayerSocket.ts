import socketio = require("socket.io");
import IPacket from "./IPacket";
import IPlayerSocket from "./IPlayerSocket";

export default abstract class AIoPlayerSocket implements IPlayerSocket
{
	username:string;
	
	constructor(username:string, private socket:socketio.Socket)
	{
		this.username = username;
	}

	public on<T extends IPacket>(event:string, callback:(data:T) => void)
	{
		this.socket.on(event, (data:T) => {
			data.command = event;
			callback(data)
		});
	}
	public send<T extends IPacket>(event:string, data:T)
	{
		data.command = event;
		this.socket.emit(event, data);
	}
	public getId():string
	{
		return (this.socket.id);
	}
}