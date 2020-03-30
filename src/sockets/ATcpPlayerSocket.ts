import net = require("net");
import IPacket from "./IPacket";
import IPlayerData from "./IPlayerData";
import IPlayerSocket from "./IPlayerSocket";

export default abstract class ATcpPlayerSocket implements IPlayerSocket
{
	readonly ID:string = new Date().getTime().toString(16);
	username:string;
	
	constructor(username:string, private socket:net.Socket)
	{
		this.username = username;
	}

	/* /!\ Temporary documentation
	 * There are probably things to change inside this function.
	 * I never used TCP socket on NodeJS, so I dunno bro :(
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
	public getIp():string
	{
		let address = this.socket.address();

		if (typeof address === "string")
			return (address);
		return (address.address);
	}
	public abstract getData():IPlayerData;
}