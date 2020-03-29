import IPacket from "./IPacket";
import IPlayerData from "./IPlayerData";

export default interface IPlayerSocket
{
	username:string;
	
	/**
	 * Receive data from a client-side socket.
	 * Format: ```{command: "Command name", param1: "value1", param2: ...}```
	 *
	 * @params event:string
	 * @params callback:(data:<T extends IPacket>) = Describe what the program must do with data (passed as parameter)
	 */
	on<T extends IPacket>(event:string, callback:(data:T) => void):void;
	
	/**
	 * Receive data from a server-side socket.
	 * Format: ```{command: "Command name", param1: "value1", param2: ...}```
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

	/**
	 * Returns the id of the socket.
	 * It is possible to implement multiple ways for id generations.
	 */
	getId():string;

	getIp():string;

	getData():IPlayerData;
}