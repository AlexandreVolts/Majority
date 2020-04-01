export default interface IController
{
	/**
	 * This method must be implemented to link callbacks to their HTTP request.
	 */
	initRoutes():void;
}