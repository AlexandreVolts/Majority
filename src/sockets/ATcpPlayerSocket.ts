import net = require("net");
import IPacket from "./IPacket";
import IPlayerSocket from "./IPlayerSocket";

export default abstract class ATcpPlayerSocket implements IPlayerSocket
{
	private socket:net.Socket = new net.Socket();
	username:string;
	
	constructor(username:string)
	{
		this.username = username;
	}

	/*
	 * There are probably things to change to this function.
	 */
	public on<T extends IPacket>(event:string, callback:(data:T) => void)
	{
		this.socket.on("data", (data:T) => {
			data.command = event;
			callback(data);
		});
	}
	public send<T extends IPacket>(event:string, data:T)
	{
		data.command = event;
		this.socket.write(JSON.stringify(data));
	}
	public destroy()
	{
		this.socket.removeAllListeners();
		this.socket.destroy();
	}
	public getId():string
	{
		return (this.socket.id);
	}
}