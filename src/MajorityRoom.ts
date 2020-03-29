import IPlayerSocket from "./sockets/IPlayerSocket";
import ARoom from "./ARoom";

export default class MajorityRoom extends ARoom
{
	private static readonly ROOM_CAPACITY:number = 5;

	constructor()
	{
		super(MajorityRoom.ROOM_CAPACITY);
	}
	
	public addPlayer(player:IPlayerSocket):boolean
	{
		player.on("disconnect", () => {
			
		});
		return (super.addPlayer(player));
	}
};