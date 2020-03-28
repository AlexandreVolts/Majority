import IPlayerSocket from "./sockets/IPlayerSocket";
import ARoom from "./ARoom";
import MajorityPlayer from "./MajorityPlayer";

export default class MajorityRoom extends ARoom
{
	private static readonly ROOM_CAPACITY:number = 5;

	constructor()
	{
		super(MajorityRoom.ROOM_CAPACITY);
	}

	public addPlayer(player:IPlayerSocket)
	{
		super.addPlayer(player);
		player.on("disconnect", () => {
			this.removePlayer(player);
		});
	}
};