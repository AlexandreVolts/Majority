import IPacket from "./sockets/IPacket";

namespace MajorityPacketType
{
	export interface Connection extends IPacket
	{
		roomId:string;
		username:string;
	}
}

export default MajorityPacketType;