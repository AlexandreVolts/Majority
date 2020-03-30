import express from "express";
import IController from "./IController";

export default class TemporaryControllerThatShouldBeReplacedByABeautifulWebApp implements IController
{
	private static readonly VIEWS_PATH:string = __dirname + "/../webapp/";
	
	constructor(private app:express.Express)
	{
		
	}
	
	public initRoutes()
	{
		this.app.get("/", (req:express.Request, res:express.Response) => {
			req;
			res.sendFile(TemporaryControllerThatShouldBeReplacedByABeautifulWebApp.VIEWS_PATH + "index.html");
		});
	}
}