import IPlayerSocket from "./sockets/IPlayerSocket";
import IRoom from "./IRoom";
import MajorityPlayer from "./MajorityPlayer";

export default class MajorityRoom implements IRoom
{
	players:Map<string, IPlayerSocket> = new Map<string, IPlayerSocket>();
	
	constructor()
	{

	}

	public addPlayer(player:MajorityPlayer)
	{
		this.players.set(player.getId(), player);
	}
};