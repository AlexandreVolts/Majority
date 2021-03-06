import IPacket from "./IPacket";
import IPlayerData from "./IPlayerData";

export default interface IPlayerSocket
{
	username:string;
	readonly ID:string;
	
	/**
	 * Set a callback to handle data received from an event.
	 * Format of received data: 
	 * ```{command: "Command name", param1: "value1", param2: ...}```
	 *
	 * @params event:string
	 * @params callback:(data:<T extends IPacket>) = Describe what the program must do with data (passed as parameter)
	 */
	on<T extends IPacket>(event:string, callback:(data:T) => void):void;
	
	/**
	 * Receive data from a server-side socket.
	 * Format of data to send: 
	 * ```{command: "Command name", param1: "value1", param2: ...}```
	 *
	 * @params event:string
	 * @params data:<T extends IPacket>
	 */
	send<T extends IPacket>(event:string, data:T):void;

	/**
	 * It is a good practice to destroy socket (especially for TCP).
	 * So this function disable all listeners and destroy the socket if needed.
	 */
	destroy():void;

	getIp():string;

	getData():IPlayerData;
}