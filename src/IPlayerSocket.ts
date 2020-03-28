export default interface IPlayerSocket
{
	receive(data:any|string):void;
	send(data:any|string):void;
}