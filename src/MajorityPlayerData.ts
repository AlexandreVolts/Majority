import IPlayerData from "./sockets/IPlayerData";

export default interface MajorityPlayerData extends IPlayerData
{
	lifes:number;
	score:number;
};