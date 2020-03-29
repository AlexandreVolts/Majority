import IPacket from "./sockets/IPacket";
import IPlayerData from "./sockets/IPlayerData";
import IPlayerSocket from "./sockets/IPlayerSocket";

export default abstract class ARoom
{
	protected players:Map<string, IPlayerSocket> = new Map<string, IPlayerSocket>();

	constructor(protected roomCapacity:number = 2)
	{

	}
	
	private isPlayerAlreadyIn(player:IPlayerSocket):boolean
	{
		let output = this.players.has(player.getId());
		
		if (output)
			return (true);
		this.players.forEach((p:IPlayerSocket) => {
			if (p.getIp() == player.getIp())
				output = true;
		});
		return (output);
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

	/**
	 * Add a player to the room. The player will be refused the room is filled.
	 * If player is already inside the room, its old socket is destroyed and replaced by the new.
	 * Returns true if the player was successfully added, false otherwise.player
	 *
	 * @params player:IPlayerSocket
	 * @returns A boolean indicates whether or not the player has been successfully added.
	 */
	public addPlayer(player:IPlayerSocket):boolean
	{
		this.removePlayer(player);
		if (this.players.size >= this.roomCapacity)
			return (false);
		this.players.set(player.getId(), player);
		return (true);
	}

	/**
	 * Remove a player from the room.
	 * Returns true if the player was successfully removed, false otherwise.
	 *
	 * @params player:IPlayerSocket
	 * @returns A boolean indicates whether or not the player has been successfully removed.
	 */
	public removePlayer(player:IPlayerSocket):boolean
	{
		let p:IPlayerSocket|undefined = this.players.get(player.getId());

		if (!p)
			return (false);
		if (this.isPlayerAlreadyIn(p)) {
			p.destroy();
			this.players.delete(p.getId());
		}
		return (true);
	}
	public getPlayersData():IPlayerData[]
	{
		let output:IPlayerData[] = [];

		this.players.forEach((player:IPlayerSocket) => {
			output.push(player.getData());
		});
		return (output);
	}
};