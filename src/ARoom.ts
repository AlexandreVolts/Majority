import IPacket from "./sockets/IPacket";
import IPlayerData from "./sockets/IPlayerData";
import IPlayerSocket from "./sockets/IPlayerSocket";

export default abstract class ARoom
{
	protected players:Map<string, IPlayerSocket> = new Map<string, IPlayerSocket>();

	constructor(protected roomCapacity:number = 10)
	{

	}
	
	/**
	 * Send a messages to all users of a room.
	 *
	 * @params event:string = The event on which all clients will listen to.
	 * @params data:<T extends IPacket> = Data to send to all users.
	 */
	public broadcast<T extends IPacket>(event:string, data:T)
	{
		this.players.forEach((player:IPlayerSocket) => {
			player.send(event, data);
		});
	}
	public addPlayer(player:IPlayerSocket)
	{
		this.players.set(player.getId(), player);
	}
	public removePlayer(player:IPlayerSocket)
	{
		if (this.players.has(player.getId()))
			this.players.delete(player.getId());
	}
	public getPlayersData<T extends IPlayerData>():T[]
	{
		let output:T[] = [];

		this.players.forEach((player:IPlayerSocket) => {
			output.push(player.getData());
		});
		return (output);
	}
};