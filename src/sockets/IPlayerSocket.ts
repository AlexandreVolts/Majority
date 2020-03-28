import IPacket from "./IPacket";

export default interface IPlayerSocket
{
	username:string;
	
	/**
	 * Receive data from a client-side socket.
	 * Format: ```{command: "Command name", param1: "value1", param2: ...}```
	 *
	 * @params event:string
	 * @params callback:Function = Describe what the program must do with data (passed as parameter)
	 */
	on<T extends IPacket>(event:string, callback:(data:T) => void):void;
	
	/**
	 * Receive data from a server-side socket.
	 * Format: ```{command: "Command name", param1: "value1", param2: ...}```
	 *
	 * @params event:string
	 * @params data:IPacket
	 */
	send<T extends IPacket>(event:string, data:T):void;
	getId():string;
}