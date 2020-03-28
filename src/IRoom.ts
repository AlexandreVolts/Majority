import IPlayerSocket from "./IPlayerSocket";

export default interface IRoom
{
	players:Map<string, IPlayerSocket>;

	addPlayer(player:IPlayerSocket):void;
};