import IPacket from "./sockets/IPacket";
import MajorityPlayerData from "./MajorityPlayerData";

namespace MajorityPacketType
{
	export interface Connection extends IPacket
	{
		roomId:string;
		username:string;
	}
	export interface PlayerList extends IPacket
	{
		players:MajorityPlayerData[];
	}
}

export default MajorityPacketType;